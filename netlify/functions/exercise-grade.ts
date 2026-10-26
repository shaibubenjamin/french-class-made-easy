import type { Config } from "@netlify/functions";
import { z } from "zod";
import { requireUser } from "../lib/auth.ts";
import { db, must } from "../lib/db.ts";
import { dictationItem, gradeByRules } from "../lib/grading.ts";
import { handle, HttpError, json, readBody } from "../lib/http.ts";
import { loadApprovedLesson, recordActivity } from "../lib/lessons.ts";
import { localParts } from "../lib/time.ts";

const Body = z.object({
  lesson_id: z.string().uuid(),
  exercise_ref: z.string().min(1).max(20),
  answer: z.string().trim().min(1).max(500),
  /** For translations the rules can't settle: the learner's own verdict after comparing. */
  self_assessed: z.boolean().optional(),
});

// POST /api/exercise/grade — rule-based grading (US-3.5). Free translations
// that don't match a model answer are self-checked by the learner.
export default handle(async (req) => {
  const user = await requireUser(req);
  const body = await readBody(req, Body);
  const lesson = await loadApprovedLesson(body.lesson_id);

  const exercise = lesson.content.exercises.find((e) => e.id === body.exercise_ref);
  const question = lesson.content.text.questions.find((q) => q.id === body.exercise_ref);
  const dictation = dictationItem(lesson.content, body.exercise_ref);
  const item = exercise ?? question ?? dictation;
  if (!item) throw new HttpError(404, "Exercise not found");

  const rules = gradeByRules(item, body.answer);
  const feedback = {
    explanation: item.explanation,
    correct_answer: item.answer,
    accent_warning: rules.accentWarning ?? false,
    self_check: rules.correct === null,
  };

  // Show the model answer first; record once the learner has judged their own answer.
  if (rules.correct === null && body.self_assessed === undefined) {
    return json({ is_correct: null, needs_self_check: true, ...feedback, error_tags: [] });
  }

  const isCorrect = rules.correct ?? body.self_assessed ?? false;
  const errorTags = !isCorrect && exercise ? [exercise.tag] : [];
  const today = localParts(user.timezone).date;

  must(
    await db().from("exercise_attempts").insert({
      user_id: user.id,
      lesson_id: lesson.id,
      exercise_ref: body.exercise_ref,
      skill: dictation ? "listening" : (exercise?.skill ?? "reading"),
      answer: body.answer,
      is_correct: isCorrect,
      ai_feedback: feedback,
      error_tags: errorTags,
      local_date: today,
    }),
  );
  // Make sure a progress row exists so the lesson shows as started.
  must(
    await db()
      .from("lesson_progress")
      .upsert({ user_id: user.id, lesson_id: lesson.id }, { onConflict: "user_id,lesson_id", ignoreDuplicates: true }),
  );
  await recordActivity(user.id, today);

  return json({ is_correct: isCorrect, needs_self_check: false, ...feedback, error_tags: errorTags });
});

export const config: Config = { path: "/api/exercise/grade", method: "POST" };

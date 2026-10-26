import type { Config } from "@netlify/functions";
import { z } from "zod";
import { requireLevel, requireUser } from "../lib/auth.ts";
import { enforceDailyLimit, gradeFreeText } from "../lib/claude.ts";
import { db, must } from "../lib/db.ts";
import { gradeByRules } from "../lib/grading.ts";
import { handle, HttpError, json, readBody } from "../lib/http.ts";
import { loadApprovedLesson, recordActivity } from "../lib/lessons.ts";
import { localParts } from "../lib/time.ts";

const Body = z.object({
  lesson_id: z.string().uuid(),
  exercise_ref: z.string().min(1).max(20),
  answer: z.string().trim().min(1).max(500),
});

// POST /api/exercise/grade — rules first, AI for free-text translations (US-3.5).
export default handle(async (req) => {
  const user = await requireUser(req);
  const level = requireLevel(user);
  const body = await readBody(req, Body);
  const lesson = await loadApprovedLesson(body.lesson_id);

  const exercise = lesson.content.exercises.find((e) => e.id === body.exercise_ref);
  const question = lesson.content.text.questions.find((q) => q.id === body.exercise_ref);
  const item = exercise ?? question;
  if (!item) throw new HttpError(404, "Exercise not found");

  const rules = gradeByRules(item, body.answer);
  let isCorrect = rules.correct;
  let explanation = item.explanation;
  let corrected = item.answer;
  let errorTags: string[] = [];
  let usedAi = false;

  if (isCorrect === null && exercise) {
    await enforceDailyLimit(user.id, "grade-answer");
    const ai = await gradeFreeText({
      userId: user.id,
      level,
      prompt: exercise.prompt,
      reference: exercise.answer,
      accepted: exercise.accepted,
      answer: body.answer,
    });
    isCorrect = ai.is_correct;
    explanation = ai.explanation;
    corrected = ai.corrected;
    errorTags = ai.error_tags;
    usedAi = true;
  }
  if (isCorrect === false && exercise && errorTags.length === 0) errorTags = [exercise.tag];

  const feedback = {
    explanation,
    correct_answer: corrected,
    accent_warning: rules.accentWarning ?? false,
    ai: usedAi,
  };
  const today = localParts(user.timezone).date;

  must(
    await db().from("exercise_attempts").insert({
      user_id: user.id,
      lesson_id: lesson.id,
      exercise_ref: body.exercise_ref,
      skill: exercise?.skill ?? "reading",
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

  return json({ is_correct: isCorrect, ...feedback, error_tags: errorTags });
});

export const config: Config = { path: "/api/exercise/grade", method: "POST" };

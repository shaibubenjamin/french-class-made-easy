import type { Config } from "@netlify/functions";
import { z } from "zod";
import { requireUser } from "../lib/auth.ts";
import { db, must } from "../lib/db.ts";
import { handle, HttpError, json, readBody } from "../lib/http.ts";
import { isSettled, nextLevel, recommendLevel, skillBreakdown } from "../lib/placement.ts";
import {
  loadAnswers,
  pickQuestion,
  publicQuestion,
  type AttemptRow,
  type QuestionRow,
} from "../lib/placement-db.ts";

const Body = z.object({
  attempt_id: z.string().uuid(),
  question_id: z.number().int(),
  answer: z.number().int().min(0).max(9),
});

// POST /api/placement/answer — grade the current question and return the next
// one, or the result once the estimate has settled (FR-6, FR-8).
export default handle(async (req) => {
  const user = await requireUser(req);
  const body = await readBody(req, Body);

  const attempt = must(
    await db()
      .from("placement_attempts")
      .select("*")
      .eq("id", body.attempt_id)
      .eq("user_id", user.id)
      .maybeSingle(),
  ) as AttemptRow | null;
  if (!attempt) throw new HttpError(404, "Quiz not found");
  if (attempt.finished_at) throw new HttpError(409, "This quiz is already finished");
  // Learners can't go back (US-2.2): only the current question is accepted.
  if (attempt.current_question_id !== body.question_id) throw new HttpError(409, "That question was already answered");

  const question = must(
    await db().from("questions").select("*").eq("id", body.question_id).single(),
  ) as QuestionRow;
  const correct = body.answer === question.answer;
  const previous = await loadAnswers(attempt.id);

  must(
    await db().from("placement_answers").insert({
      attempt_id: attempt.id,
      question_id: question.id,
      answer: body.answer,
      is_correct: correct,
      order: previous.length + 1,
    }),
  );

  const answers = [...previous, { question_id: question.id, level: question.level, skill: question.skill, correct }];

  if (isSettled(answers)) {
    const level = recommendLevel(answers);
    const skills = skillBreakdown(answers);
    must(
      await db()
        .from("placement_attempts")
        .update({
          finished_at: new Date().toISOString(),
          recommended_level: level,
          skill_scores: skills,
          current_question_id: null,
        })
        .eq("id", attempt.id),
    );
    return json({ done: true, result: { level, skills, answered: answers.length } });
  }

  const level = nextLevel(question.level, correct);
  const next = await pickQuestion(level, answers.length, answers.map((a) => a.question_id));
  must(
    await db()
      .from("placement_attempts")
      .update({ current_level: level, current_question_id: next.id })
      .eq("id", attempt.id),
  );
  return json({ done: false, attempt_id: attempt.id, ...publicQuestion(next, answers.length) });
});

export const config: Config = { path: "/api/placement/answer", method: "POST" };

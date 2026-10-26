import type { Config } from "@netlify/functions";
import { z } from "zod";
import { requireUser } from "../lib/auth.ts";
import { db, must } from "../lib/db.ts";
import { handle, json, readBody } from "../lib/http.ts";
import { loadApprovedLesson, recordActivity } from "../lib/lessons.ts";
import { localParts } from "../lib/time.ts";

const Body = z.object({
  lesson_id: z.string().uuid(),
  text: z.string().trim().min(3).max(3000),
});

// POST /api/writing/submit — saves the learner's text and returns the model
// answer and checklist so they can compare (no AI).
export default handle(async (req) => {
  const user = await requireUser(req);
  const body = await readBody(req, Body);
  const lesson = await loadApprovedLesson(body.lesson_id);
  const result = { model: lesson.content.writing_model, checklist: lesson.content.writing_checklist };

  const today = localParts(user.timezone).date;
  must(
    await db().from("exercise_attempts").insert({
      user_id: user.id,
      lesson_id: lesson.id,
      exercise_ref: "writing",
      skill: "writing",
      answer: body.text,
      is_correct: null,
      ai_feedback: result,
      error_tags: [],
      local_date: today,
    }),
  );
  await recordActivity(user.id, today);
  return json(result);
});

export const config: Config = { path: "/api/writing/submit", method: "POST" };

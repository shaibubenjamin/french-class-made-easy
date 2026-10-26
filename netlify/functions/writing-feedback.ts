import type { Config } from "@netlify/functions";
import { z } from "zod";
import { requireLevel, requireUser } from "../lib/auth.ts";
import { enforceDailyLimit, writingFeedback } from "../lib/claude.ts";
import { db, must } from "../lib/db.ts";
import { handle, json, readBody } from "../lib/http.ts";
import { loadApprovedLesson, recordActivity } from "../lib/lessons.ts";
import { localParts } from "../lib/time.ts";

const Body = z.object({
  lesson_id: z.string().uuid(),
  text: z.string().trim().min(3).max(3000),
});

// POST /api/writing/feedback — AI corrections on the lesson's writing task (FR-25, US-5.1).
export default handle(async (req) => {
  const user = await requireUser(req);
  const level = requireLevel(user);
  const body = await readBody(req, Body);
  const lesson = await loadApprovedLesson(body.lesson_id);

  await enforceDailyLimit(user.id, "writing-feedback");
  const feedback = await writingFeedback({
    userId: user.id,
    level,
    prompt: lesson.content.writing_prompt,
    text: body.text,
  });

  const today = localParts(user.timezone).date;
  must(
    await db().from("exercise_attempts").insert({
      user_id: user.id,
      lesson_id: lesson.id,
      exercise_ref: "writing",
      skill: "writing",
      answer: body.text,
      is_correct: feedback.corrections.length === 0,
      ai_feedback: feedback,
      error_tags: [...new Set(feedback.corrections.map((c) => c.tag))],
      local_date: today,
    }),
  );
  await recordActivity(user.id, today);

  return json(feedback);
});

export const config: Config = { path: "/api/writing/feedback", method: "POST" };

import type { Config } from "@netlify/functions";
import { z } from "zod";
import { requireUser } from "../lib/auth.ts";
import { db, must } from "../lib/db.ts";
import { handle, json, readBody } from "../lib/http.ts";
import { loadApprovedLesson, recordActivity } from "../lib/lessons.ts";
import { localParts } from "../lib/time.ts";
import { PASS_MARK } from "../../shared/progression.ts";

const Body = z.object({
  lesson_id: z.string().uuid(),
  ref: z.enum(["read1", "read2", "free"]),
  transcript: z.string().max(4000),
  /** Read-aloud accuracy or share of target expressions used (computed in the browser). */
  score: z.number().int().min(0).max(100).nullable(),
  seconds: z.number().min(0).max(600),
});

// POST /api/speaking/submit — records a speaking attempt (audio stays on the device).
export default handle(async (req) => {
  const user = await requireUser(req);
  const body = await readBody(req, Body);
  const lesson = await loadApprovedLesson(body.lesson_id);
  const today = localParts(user.timezone).date;
  must(
    await db().from("exercise_attempts").insert({
      user_id: user.id,
      lesson_id: lesson.id,
      exercise_ref: `speak-${body.ref}`,
      skill: "speaking",
      answer: body.transcript || "(recording without transcript)",
      is_correct: body.score === null ? null : body.score >= PASS_MARK,
      ai_feedback: { score: body.score, seconds: body.seconds },
      error_tags: [],
      local_date: today,
    }),
  );
  await recordActivity(user.id, today);
  return json({ saved: true });
});

export const config: Config = { path: "/api/speaking/submit", method: "POST" };

import type { Config, Context } from "@netlify/functions";
import { z } from "zod";
import { requireUser } from "../lib/auth.ts";
import { db, must } from "../lib/db.ts";
import { handle, json, readBody } from "../lib/http.ts";
import { loadApprovedLesson, recordActivity } from "../lib/lessons.ts";
import { localParts } from "../lib/time.ts";

const Body = z.object({
  step: z.enum(["vocabulary", "grammar", "listen", "practice", "speak", "write", "done", "text", "exercises", "writing"]),
  complete: z.boolean().optional(),
});

// PUT /api/lessons/:id/progress — save where the learner is (US-3.3) and,
// on completion, compute the score from their latest answers.
export default handle(async (req, context: Context) => {
  const user = await requireUser(req);
  const lesson = await loadApprovedLesson(context.params.id);
  const { step, complete } = await readBody(req, Body);

  const existing = must(
    await db()
      .from("lesson_progress")
      .select("*")
      .eq("user_id", user.id)
      .eq("lesson_id", lesson.id)
      .maybeSingle(),
  ) as { completed_at: string | null; score: number | null } | null;

  const row: Record<string, unknown> = { user_id: user.id, lesson_id: lesson.id, state: { step } };
  let firstCompletion = false;

  if (complete) {
    const attempts = must(
      await db()
        .from("exercise_attempts")
        .select("exercise_ref, is_correct, created_at")
        .eq("user_id", user.id)
        .eq("lesson_id", lesson.id)
        .order("created_at"),
    ) as { exercise_ref: string; is_correct: boolean | null }[];
    const latest = new Map(attempts.map((a) => [a.exercise_ref, a.is_correct]));
    const refs = [...lesson.content.exercises.map((e) => e.id), ...lesson.content.text.questions.map((q) => q.id)];
    const correct = refs.filter((r) => latest.get(r) === true).length;
    row.score = refs.length ? Math.round((correct / refs.length) * 100) : 0;
    row.completed_at = existing?.completed_at ?? new Date().toISOString();
    firstCompletion = !existing?.completed_at;
    await recordActivity(user.id, localParts(user.timezone).date);
  }

  must(await db().from("lesson_progress").upsert(row, { onConflict: "user_id,lesson_id" }));
  return json({ step, score: row.score ?? existing?.score ?? null, first_completion: firstCompletion });
});

export const config: Config = { path: "/api/lessons/:id/progress", method: "PUT" };

import type { Config } from "@netlify/functions";
import { requireUser } from "../lib/auth.ts";
import { db, must } from "../lib/db.ts";
import { handle, HttpError, json } from "../lib/http.ts";
import { nextRetakeDate, START_LEVEL } from "../lib/placement.ts";
import { loadAnswers, pickQuestion, publicQuestion, type AttemptRow } from "../lib/placement-db.ts";

// POST /api/placement/start — create an attempt (or resume an open one) and
// return the current question. FR-10: one finished quiz per 7 days.
export default handle(async (req) => {
  const user = await requireUser(req);

  const attempts = must(
    await db()
      .from("placement_attempts")
      .select("*")
      .eq("user_id", user.id)
      .order("started_at", { ascending: false })
      .limit(5),
  ) as AttemptRow[];

  const lastFinished = attempts.find((a) => a.finished_at);
  const retakeAt = nextRetakeDate(lastFinished?.finished_at ?? null);
  if (retakeAt) {
    throw new HttpError(429, "You can retake the placement quiz once every 7 days.", {
      next_available: retakeAt.toISOString(),
    });
  }

  // Resume an unfinished attempt from the last 24 hours (answers can't be changed).
  const open = attempts.find(
    (a) => !a.finished_at && Date.now() - Date.parse(a.started_at) < 86_400_000 && a.current_question_id,
  );
  if (open) {
    const answers = await loadAnswers(open.id);
    const q = must(await db().from("questions").select("*").eq("id", open.current_question_id!).single());
    return json({ attempt_id: open.id, ...publicQuestion(q, answers.length) });
  }

  const question = await pickQuestion(START_LEVEL, 0, []);
  const attempt = must(
    await db()
      .from("placement_attempts")
      .insert({ user_id: user.id, current_level: START_LEVEL, current_question_id: question.id })
      .select("id")
      .single(),
  ) as { id: string };
  return json({ attempt_id: attempt.id, ...publicQuestion(question, 0) });
});

export const config: Config = { path: "/api/placement/start", method: "POST" };

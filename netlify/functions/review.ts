import type { Config } from "@netlify/functions";
import { requireLevel, requireUser } from "../lib/auth.ts";
import { handle, json } from "../lib/http.ts";
import { currentLesson } from "../lib/lessons.ts";
import { buildReview } from "../lib/review.ts";
import { localParts } from "../lib/time.ts";

// GET /api/review — the in-app version of the evening review (US-5.2).
export default handle(async (req) => {
  const user = await requireUser(req);
  const level = requireLevel(user);
  const today = localParts(user.timezone).date;
  const lesson = await currentLesson(user.id, level);
  return json(await buildReview(user.id, today, lesson?.lesson.content ?? null));
});

export const config: Config = { path: "/api/review", method: "GET" };

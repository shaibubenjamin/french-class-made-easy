import type { Config } from "@netlify/functions";
import { requireLevel, requireUser } from "../lib/auth.ts";
import { handle, HttpError, json } from "../lib/http.ts";
import { currentLesson } from "../lib/lessons.ts";
import { lessonView } from "../lib/lesson-view.ts";

// GET /api/lesson/today — the learner's next lesson in their level's course.
export default handle(async (req) => {
  const user = await requireUser(req);
  const level = requireLevel(user);
  const current = await currentLesson(user.id, level);
  if (!current) throw new HttpError(404, "No lessons are available for your level yet.");
  return json({
    ...(await lessonView(current.lesson, user.id)),
    position: current.position,
    total: current.total,
    all_done: current.allDone,
  });
});

export const config: Config = { path: "/api/lesson/today", method: "GET" };

import type { Config } from "@netlify/functions";
import { requireLevel, requireUser } from "../lib/auth.ts";
import { handle, HttpError, json } from "../lib/http.ts";
import { lessonForDay } from "../lib/lessons.ts";
import { lessonView } from "../lib/lesson-view.ts";
import { localParts } from "../lib/time.ts";

// GET /api/lesson/today — today's lesson for the user's level (FR-15).
export default handle(async (req) => {
  const user = await requireUser(req);
  const level = requireLevel(user);
  const today = localParts(user.timezone).date;
  const found = await lessonForDay(level, today);
  if (!found) throw new HttpError(404, "Today's lesson isn't ready yet. Please check back soon.");
  return json({ ...(await lessonView(found.lesson, user.id)), is_today: found.isToday });
});

export const config: Config = { path: "/api/lesson/today", method: "GET" };

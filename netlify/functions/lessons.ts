import type { Config, Context } from "@netlify/functions";
import { requireLevel, requireUser } from "../lib/auth.ts";
import { db, must } from "../lib/db.ts";
import { handle, json } from "../lib/http.ts";
import { loadApprovedLesson } from "../lib/lessons.ts";
import { lessonView } from "../lib/lesson-view.ts";
import { addDays, localParts } from "../lib/time.ts";

// GET /api/lessons      — the past 30 days of lessons for the user's level (FR-16)
// GET /api/lessons/:id  — one lesson, with the user's saved progress
export default handle(async (req, context: Context) => {
  const user = await requireUser(req);

  if (context.params.id) {
    const row = await loadApprovedLesson(context.params.id);
    return json(await lessonView(row, user.id));
  }

  const level = requireLevel(user);
  const today = localParts(user.timezone).date;
  const lessons = must(
    await db()
      .from("lessons")
      .select("id, date, theme, level")
      .eq("level", level)
      .eq("status", "approved")
      .lte("date", today)
      .gte("date", addDays(today, -30))
      .order("date", { ascending: false }),
  ) as { id: string; date: string; theme: string; level: string }[];

  const progress = lessons.length
    ? (must(
        await db()
          .from("lesson_progress")
          .select("lesson_id, completed_at, score")
          .eq("user_id", user.id)
          .in(
            "lesson_id",
            lessons.map((l) => l.id),
          ),
      ) as { lesson_id: string; completed_at: string | null; score: number | null }[])
    : [];
  const byId = new Map(progress.map((p) => [p.lesson_id, p]));

  return json({
    lessons: lessons.map((l) => ({
      ...l,
      completed: Boolean(byId.get(l.id)?.completed_at),
      started: byId.has(l.id),
      score: byId.get(l.id)?.score ?? null,
    })),
  });
});

export const config: Config = { path: ["/api/lessons", "/api/lessons/:id"], method: "GET" };

import { db, must } from "./db.ts";
import { HttpError } from "./http.ts";
import { applyActivity, type StreakState } from "./streak.ts";
import type { LessonContent } from "../../shared/lesson-schema.ts";
import type { Level } from "../../shared/levels.ts";

export interface LessonRow {
  id: string;
  level: Level;
  seq: number;
  theme: string;
  content: LessonContent;
  status: "draft" | "approved";
  model: string | null;
  reviewed_by: string | null;
  updated_at: string;
}

/** The ordered course for a level (built-in curriculum, see data/curriculum). */
export async function courseFor(level: Level): Promise<LessonRow[]> {
  return must(
    await db()
      .from("lessons")
      .select("*")
      .eq("level", level)
      .eq("status", "approved")
      .not("seq", "is", null)
      .order("seq"),
  ) as LessonRow[];
}

export async function completions(userId: string, lessonIds: string[]) {
  if (!lessonIds.length) return new Map<string, { completed_at: string | null; score: number | null }>();
  const rows = must(
    await db()
      .from("lesson_progress")
      .select("lesson_id, completed_at, score")
      .eq("user_id", userId)
      .in("lesson_id", lessonIds),
  ) as { lesson_id: string; completed_at: string | null; score: number | null }[];
  return new Map(rows.map((r) => [r.lesson_id, r]));
}

/**
 * The learner's current lesson: the first one not yet completed, in course
 * order. Once the whole level is done, the least recently completed lesson
 * comes round again for review.
 */
export async function currentLesson(userId: string, level: Level) {
  const course = await courseFor(level);
  if (!course.length) return null;
  const done = await completions(userId, course.map((l) => l.id));
  const completedCount = course.filter((l) => done.get(l.id)?.completed_at).length;

  let index = course.findIndex((l) => !done.get(l.id)?.completed_at);
  const allDone = index === -1;
  if (allDone) {
    index = course.reduce(
      (oldest, l, i) =>
        (done.get(l.id)?.completed_at ?? "") < (done.get(course[oldest].id)?.completed_at ?? "") ? i : oldest,
      0,
    );
  }
  return { lesson: course[index], position: index + 1, total: course.length, completedCount, allDone };
}

export async function loadApprovedLesson(id: string): Promise<LessonRow> {
  const row = must(
    await db().from("lessons").select("*").eq("id", id).eq("status", "approved").maybeSingle(),
  ) as LessonRow | null;
  if (!row) throw new HttpError(404, "Lesson not found");
  return row;
}

/** Marks the user as having practised on their local date and updates the streak. */
export async function recordActivity(userId: string, localDate: string) {
  const current = must(
    await db().from("streaks").select("*").eq("user_id", userId).maybeSingle(),
  ) as StreakState | null;
  const base: StreakState = current ?? {
    current: 0,
    longest: 0,
    last_active_date: null,
    freezes_left: 1,
    freeze_week: null,
  };
  const next = applyActivity(base, localDate);
  must(await db().from("streaks").upsert({ user_id: userId, ...next }));
  return next;
}

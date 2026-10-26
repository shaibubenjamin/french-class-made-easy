import { db, must } from "./db.ts";
import { HttpError } from "./http.ts";
import { addDays } from "./time.ts";
import { applyActivity, type StreakState } from "./streak.ts";
import { generateLesson, MODELS } from "./claude.ts";
import type { LessonContent } from "../../shared/lesson-schema.ts";
import type { Level } from "../../shared/levels.ts";

export interface LessonRow {
  id: string;
  level: Level;
  date: string;
  theme: string;
  content: LessonContent;
  status: "draft" | "approved";
  model: string | null;
  reviewed_by: string | null;
  updated_at: string;
}

/**
 * Today's approved lesson for a level. If it isn't approved yet (C1–C2 wait for
 * a human), falls back to the most recent approved lesson.
 */
export async function lessonForDay(level: Level, localDate: string) {
  const rows = must(
    await db()
      .from("lessons")
      .select("*")
      .eq("level", level)
      .eq("status", "approved")
      .lte("date", localDate)
      .gte("date", addDays(localDate, -30))
      .order("date", { ascending: false })
      .limit(1),
  ) as LessonRow[];
  const lesson = rows[0];
  return lesson ? { lesson, isToday: lesson.date === localDate } : null;
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

/** Generates (or regenerates) the lesson for one level and date, with retries. */
export async function generateAndStore(level: Level, date: string, opts: { force?: boolean; attempts?: number } = {}) {
  const existing = must(
    await db().from("lessons").select("id, status").eq("level", level).eq("date", date).maybeSingle(),
  ) as { id: string; status: string } | null;
  if (existing && !opts.force) return { skipped: true as const };

  const recent = must(
    await db()
      .from("lessons")
      .select("theme")
      .eq("level", level)
      .gte("date", addDays(date, -21))
      .neq("date", date),
  ) as { theme: string }[];

  let lastError: unknown;
  for (let attempt = 1; attempt <= (opts.attempts ?? 3); attempt++) {
    try {
      const content = await generateLesson(level, date, recent.map((r) => r.theme));
      must(
        await db().from("lessons").upsert(
          {
            level,
            date,
            theme: content.theme,
            content,
            status: "draft",
            model: MODELS.lesson,
            reviewed_by: null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "level,date" },
        ),
      );
      return { skipped: false as const, theme: content.theme };
    } catch (err) {
      lastError = err;
      console.error(`Lesson ${level} ${date} attempt ${attempt} failed`, err);
    }
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

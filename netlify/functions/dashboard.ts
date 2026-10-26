import type { Config } from "@netlify/functions";
import { requireLevel, requireUser } from "../lib/auth.ts";
import { db, must } from "../lib/db.ts";
import { handle, json } from "../lib/http.ts";
import { currentLesson } from "../lib/lessons.ts";
import { getLevelStatus } from "../lib/level-status.ts";
import { nextLevel } from "../../shared/progression.ts";
import { streakStatus, MAX_MISSED_DAYS, type StreakState } from "../lib/streak.ts";
import { addDays } from "../lib/time.ts";
import { localParts } from "../lib/time.ts";
import { SKILLS } from "../../shared/levels.ts";

// GET /api/dashboard — current lesson, course progress, streak and skill chart (US-3.4).
export default handle(async (req) => {
  const user = await requireUser(req);
  const level = requireLevel(user);
  const today = localParts(user.timezone).date;

  const [found, streakRes, completedRes, attemptsRes, levelStatus, daysRes] = await Promise.all([
    currentLesson(user.id, level),
    db().from("streaks").select("*").eq("user_id", user.id).single(),
    db()
      .from("lesson_progress")
      .select("lesson_id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .not("completed_at", "is", null),
    db()
      .from("exercise_attempts")
      .select("skill, is_correct")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(500),
    getLevelStatus(user.id, level),
    // Days with any practice, for the calendar (about six months back).
    db()
      .from("exercise_attempts")
      .select("local_date")
      .eq("user_id", user.id)
      .gte("local_date", addDays(today, -190))
      .order("local_date", { ascending: false })
      .limit(5000),
  ]);
  const practiceDays = [...new Set((must(daysRes) as { local_date: string }[]).map((d) => d.local_date))];

  let todayCard = null;
  if (found) {
    const progress = must(
      await db()
        .from("lesson_progress")
        .select("completed_at, score, state")
        .eq("user_id", user.id)
        .eq("lesson_id", found.lesson.id)
        .maybeSingle(),
    ) as { completed_at: string | null; score: number | null; state: { step?: string } } | null;
    todayCard = {
      id: found.lesson.id,
      theme: found.lesson.theme,
      position: found.position,
      total: found.total,
      completed_in_level: found.completedCount,
      all_done: found.allDone,
      grammar_topic: found.lesson.content.grammar.topic,
      started: Boolean(progress),
      completed: Boolean(progress?.completed_at),
      score: progress?.score ?? null,
      step: progress?.state?.step ?? null,
    };
  }

  const attempts = must(attemptsRes) as { skill: string | null; is_correct: boolean | null }[];
  const skills = SKILLS.map((skill) => {
    const list = attempts.filter((a) => a.skill === skill && a.is_correct !== null);
    const correct = list.filter((a) => a.is_correct).length;
    return { skill, attempts: list.length, accuracy: list.length ? Math.round((correct / list.length) * 100) : null };
  });

  const streak = must(streakRes) as StreakState;
  const status = streakStatus(streak, today);
  return json({
    level,
    today: todayCard,
    streak: {
      current: status.current,
      longest: streak.longest,
      risk: status.risk,
      missed_days: status.missed,
      max_missed_days: MAX_MISSED_DAYS,
      practised_today: streak.last_active_date === today,
    },
    today_date: today,
    practice_days: practiceDays,
    lessons_completed: completedRes.count ?? 0,
    level_status: { ...levelStatus, next_level: nextLevel(level) },
    skills,
  });
});

export const config: Config = { path: "/api/dashboard", method: "GET" };

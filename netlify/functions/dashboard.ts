import type { Config } from "@netlify/functions";
import { requireLevel, requireUser } from "../lib/auth.ts";
import { db, must } from "../lib/db.ts";
import { handle, json } from "../lib/http.ts";
import { currentLesson } from "../lib/lessons.ts";
import { displayStreak, type StreakState } from "../lib/streak.ts";
import { localParts } from "../lib/time.ts";
import { SKILLS } from "../../shared/levels.ts";

// GET /api/dashboard — current lesson, course progress, streak and skill chart (US-3.4).
export default handle(async (req) => {
  const user = await requireUser(req);
  const level = requireLevel(user);
  const today = localParts(user.timezone).date;

  const [found, streakRes, completedRes, attemptsRes] = await Promise.all([
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
  ]);

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
  return json({
    level,
    today: todayCard,
    streak: {
      current: displayStreak(streak, today),
      longest: streak.longest,
      freezes_left: streak.freezes_left,
      practised_today: streak.last_active_date === today,
    },
    lessons_completed: completedRes.count ?? 0,
    skills,
  });
});

export const config: Config = { path: "/api/dashboard", method: "GET" };

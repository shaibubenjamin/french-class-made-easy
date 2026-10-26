import { daysBetween, mondayOf } from "./time.ts";

export interface StreakState {
  current: number;
  longest: number;
  last_active_date: string | null;
  freezes_left: number;
  freeze_week: string | null;
}

/** Records practice on `today` (the user's local date). FR-28: one freeze per week. */
export function applyActivity(s: StreakState, today: string): StreakState {
  const next = { ...s };
  const week = mondayOf(today);
  if (next.freeze_week !== week) {
    next.freeze_week = week;
    next.freezes_left = 1;
  }
  if (next.last_active_date === today) return next;

  const gap = next.last_active_date ? daysBetween(next.last_active_date, today) : Infinity;
  if (gap === 1) {
    next.current += 1;
  } else if (gap === 2 && next.freezes_left > 0) {
    next.freezes_left -= 1; // the freeze covers the one missed day
    next.current += 1;
  } else {
    next.current = 1;
  }
  next.longest = Math.max(next.longest, next.current);
  next.last_active_date = today;
  return next;
}

/** Streak to display: 0 once it has lapsed beyond what a freeze could cover. */
export function displayStreak(s: StreakState, today: string): number {
  if (!s.last_active_date) return 0;
  const gap = daysBetween(s.last_active_date, today);
  if (gap <= 1) return s.current;
  if (gap === 2 && s.freezes_left > 0) return s.current;
  return 0;
}

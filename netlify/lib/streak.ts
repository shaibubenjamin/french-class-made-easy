import { daysBetween } from "./time.ts";

export interface StreakState {
  current: number;
  longest: number;
  last_active_date: string | null;
  freezes_left: number;
  freeze_week: string | null;
}

/**
 * Streak rules: practising on consecutive days adds a day. Missing one or two
 * days in a row keeps the streak (with a warning to practise). Missing three
 * days in a row resets it to zero.
 */
export const MAX_MISSED_DAYS = 2;

/** Days missed since the last practice, as of `today` (0 if practised today or yesterday). */
export function missedDays(lastActive: string | null, today: string): number {
  if (!lastActive) return 0;
  return Math.max(0, daysBetween(lastActive, today) - 1);
}

/** Records practice on `today` (the user's local date). */
export function applyActivity(s: StreakState, today: string): StreakState {
  const next = { ...s };
  if (next.last_active_date === today) return next;
  const alive = next.last_active_date !== null && missedDays(next.last_active_date, today) <= MAX_MISSED_DAYS;
  next.current = alive ? next.current + 1 : 1;
  next.longest = Math.max(next.longest, next.current);
  next.last_active_date = today;
  return next;
}

export type StreakRisk = "safe" | "practise-today" | "last-chance" | "lost";

/** Streak to display today, and how urgent practising is. */
export function streakStatus(s: StreakState, today: string): { current: number; risk: StreakRisk; missed: number } {
  if (!s.last_active_date || s.current === 0) return { current: 0, risk: "safe", missed: 0 };
  const missed = missedDays(s.last_active_date, today);
  if (missed > MAX_MISSED_DAYS) return { current: 0, risk: "lost", missed };
  if (s.last_active_date === today) return { current: s.current, risk: "safe", missed: 0 };
  // Not practised yet today. After 2 missed days, today is the last chance.
  return { current: s.current, risk: missed >= MAX_MISSED_DAYS ? "last-chance" : "practise-today", missed };
}

export function displayStreak(s: StreakState, today: string): number {
  return streakStatus(s, today).current;
}

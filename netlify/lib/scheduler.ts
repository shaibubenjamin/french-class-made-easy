import type { LocalParts } from "./time.ts";

export type EmailType = "morning" | "afternoon" | "evening" | "weekly";

export interface EmailPrefs {
  morning: boolean;
  morning_hour: number;
  afternoon: boolean;
  afternoon_hour: number;
  evening: boolean;
  evening_hour: number;
  weekly: boolean;
  unsubscribed_all: boolean;
  suppressed_reason: string | null;
}

export const MAX_EMAILS_PER_DAY = 3; // FR-24
export const WEEKLY_SUMMARY = { weekday: 0, hour: 17 }; // Sunday 17:00 local time

/**
 * Which emails are due for a user in this hourly run (FR-17 to FR-24).
 * When capping, priority is morning > weekly > evening > afternoon.
 */
export function dueEmails(input: {
  prefs: EmailPrefs;
  local: LocalParts;
  sentToday: Set<string>;
  practisedToday: boolean;
}): EmailType[] {
  const { prefs, local, sentToday, practisedToday } = input;
  if (prefs.unsubscribed_all || prefs.suppressed_reason) return [];

  const due: EmailType[] = [];
  if (prefs.morning && local.hour === prefs.morning_hour) due.push("morning");
  if (prefs.weekly && local.weekday === WEEKLY_SUMMARY.weekday && local.hour === WEEKLY_SUMMARY.hour) {
    due.push("weekly");
  }
  if (prefs.evening && local.hour === prefs.evening_hour) due.push("evening");
  if (prefs.afternoon && local.hour === prefs.afternoon_hour && !practisedToday) due.push("afternoon");

  const fresh = due.filter((t) => !sentToday.has(t));
  const remaining = Math.max(0, MAX_EMAILS_PER_DAY - sentToday.size);
  return fresh.slice(0, remaining);
}

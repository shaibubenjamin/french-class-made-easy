import type { Config } from "@netlify/functions";
import { z } from "zod";
import { requireUser } from "../lib/auth.ts";
import { db, must } from "../lib/db.ts";
import { handle, HttpError, json, readBody } from "../lib/http.ts";
import { displayStreak, type StreakState } from "../lib/streak.ts";
import { isValidTimeZone, localParts } from "../lib/time.ts";

const hour = z.number().int().min(0).max(23);

const ProfileUpdate = z.object({
  name: z.string().trim().min(1).max(60).optional(),
  timezone: z.string().refine(isValidTimeZone, "Unknown timezone").optional(),
  goal: z.string().max(200).optional(),
  daily_minutes: z.union([z.literal(5), z.literal(10), z.literal(20)]).optional(),
  onboarded: z.boolean().optional(),
  email_consent: z.boolean().optional(),
  email_hours: z.object({ morning: hour, afternoon: hour, evening: hour }).partial().optional(),
});

// GET /api/me — profile, email preferences and streak for the signed-in user.
// PUT /api/me — update profile fields (onboarding + settings, US-1.3).
export default handle(async (req) => {
  const profile = await requireUser(req);

  if (req.method === "PUT") {
    const body = await readBody(req, ProfileUpdate);
    const { email_consent, email_hours, ...fields } = body;
    const update: Record<string, unknown> = { ...fields };
    // FR-3: the magic link already proved the address; consent completes the opt-in.
    if (email_consent === true && !profile.email_opt_in_at) update.email_opt_in_at = new Date().toISOString();
    if (email_consent === false) update.email_opt_in_at = null;
    if (Object.keys(update).length) must(await db().from("profiles").update(update).eq("id", profile.id));
    if (email_hours) {
      const prefs: Record<string, number> = {};
      if (email_hours.morning !== undefined) prefs.morning_hour = email_hours.morning;
      if (email_hours.afternoon !== undefined) prefs.afternoon_hour = email_hours.afternoon;
      if (email_hours.evening !== undefined) prefs.evening_hour = email_hours.evening;
      must(await db().from("email_preferences").update(prefs).eq("user_id", profile.id));
    }
  } else if (req.method !== "GET") {
    throw new HttpError(405, "Method not allowed");
  }

  const [fresh, prefs, streak] = await Promise.all([
    db().from("profiles").select("*").eq("id", profile.id).single(),
    db().from("email_preferences").select("*").eq("user_id", profile.id).single(),
    db().from("streaks").select("*").eq("user_id", profile.id).single(),
  ]);
  const p = must(fresh);
  const today = localParts(p.timezone).date;
  const s = must(streak) as StreakState;
  return json({
    profile: p,
    preferences: must(prefs),
    streak: { current: displayStreak(s, today), longest: s.longest, freezes_left: s.freezes_left },
    today,
  });
});

export const config: Config = { path: "/api/me", method: ["GET", "PUT"] };

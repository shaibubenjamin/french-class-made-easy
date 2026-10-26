import { db, must } from "./db.ts";
import { HttpError } from "./http.ts";
import type { Level } from "../../shared/levels.ts";

export interface Profile {
  id: string;
  email: string;
  name: string | null;
  timezone: string;
  goal: string | null;
  daily_minutes: number;
  current_level: Level | null;
  level_source: "quiz" | "self" | null;
  onboarded: boolean;
  email_opt_in_at: string | null;
  is_admin: boolean;
  created_at: string;
}

export async function requireUser(req: Request): Promise<Profile> {
  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) throw new HttpError(401, "Please sign in");
  const { data, error } = await db().auth.getUser(token);
  if (error || !data.user) throw new HttpError(401, "Your session has expired. Please sign in again.");
  const profile = must(
    await db().from("profiles").select("*").eq("id", data.user.id).maybeSingle(),
  ) as Profile | null;
  if (!profile) throw new HttpError(401, "Profile not found");
  return profile;
}

export async function requireAdmin(req: Request): Promise<Profile> {
  const profile = await requireUser(req);
  if (!profile.is_admin) throw new HttpError(403, "Admins only");
  return profile;
}

export function requireLevel(profile: Profile): Level {
  if (!profile.current_level) throw new HttpError(409, "Choose your level first");
  return profile.current_level;
}

/** Shared-secret check for background functions triggered by scheduled ones. */
export function requireInternal(req: Request) {
  const secret = process.env.INTERNAL_SECRET;
  if (!secret || req.headers.get("x-internal-secret") !== secret) throw new HttpError(401, "Unauthorized");
}

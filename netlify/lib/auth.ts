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

// Verified token → user id, kept while the function instance is warm. A token
// can't change owner, so this never goes stale; entries expire with the token.
const verified = new Map<string, { userId: string; exp: number }>();

async function userIdFromToken(token: string): Promise<string> {
  const now = Date.now() / 1000;
  const hit = verified.get(token);
  if (hit && hit.exp > now) return hit.userId;
  // getClaims verifies the JWT signature locally (cached JWKS) instead of a round trip to Auth.
  const { data, error } = await db().auth.getClaims(token);
  const sub = data?.claims?.sub;
  if (error || !sub) throw new HttpError(401, "Your session has expired. Please sign in again.");
  if (verified.size > 500) verified.clear();
  verified.set(token, { userId: sub, exp: Math.min(Number(data.claims.exp) || now + 60, now + 600) });
  return sub;
}

export async function requireUser(req: Request): Promise<Profile> {
  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) throw new HttpError(401, "Please sign in");
  const userId = await userIdFromToken(token);
  const profile = must(
    await db().from("profiles").select("*").eq("id", userId).maybeSingle(),
  ) as Profile | null;
  if (!profile) throw new HttpError(401, "Profile not found");
  // Optional allowlist (comma-separated) for a private deployment.
  const allowed = (process.env.ALLOWED_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (allowed.length && !allowed.includes(profile.email.toLowerCase())) {
    throw new HttpError(403, "This account doesn't have access to this class.");
  }
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

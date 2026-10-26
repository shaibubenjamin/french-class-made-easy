import type { Config } from "@netlify/functions";
import { json } from "../lib/http.ts";

const REQUIRED = {
  database: ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"],
  ai: ["ANTHROPIC_API_KEY"],
  email: ["RESEND_API_KEY", "EMAIL_FROM", "UNSUBSCRIBE_SECRET"],
  jobs: ["INTERNAL_SECRET"],
} as const;

// GET /api/health — which server settings are configured (names only, never values).
export default async () => {
  const missing: Record<string, string[]> = {};
  for (const [area, names] of Object.entries(REQUIRED)) {
    const absent = names.filter((n) => !process.env[n]);
    if (absent.length) missing[area] = absent;
  }
  return json({ ok: Object.keys(missing).length === 0, missing });
};

export const config: Config = { path: "/api/health", method: "GET" };

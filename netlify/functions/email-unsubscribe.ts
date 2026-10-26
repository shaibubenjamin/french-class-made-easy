import type { Config } from "@netlify/functions";
import { db, must } from "../lib/db.ts";
import { handle, HttpError, json } from "../lib/http.ts";
import { verifyUnsubscribeToken } from "../lib/tokens.ts";

// POST /api/email/unsubscribe?u=<user id>&t=<signed token>
// Handles RFC 8058 one-click requests from mail clients (body
// "List-Unsubscribe=One-Click") and the button on the /unsubscribe page.
export default handle(async (req) => {
  const url = new URL(req.url);
  let userId = url.searchParams.get("u");
  let token = url.searchParams.get("t");

  if ((!userId || !token) && req.headers.get("content-type")?.includes("application/json")) {
    const body = (await req.json().catch(() => ({}))) as { u?: string; t?: string };
    userId = body.u ?? null;
    token = body.t ?? null;
  }
  if (!userId || !token || !verifyUnsubscribeToken(userId, token)) {
    throw new HttpError(400, "This unsubscribe link is invalid.");
  }

  must(
    await db()
      .from("email_preferences")
      .update({ unsubscribed_all: true, updated_at: new Date().toISOString() })
      .eq("user_id", userId),
  );
  return json({ unsubscribed: true });
});

export const config: Config = { path: "/api/email/unsubscribe", method: "POST" };

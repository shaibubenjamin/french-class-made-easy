import type { Config } from "@netlify/functions";
import { z } from "zod";
import { requireUser } from "../lib/auth.ts";
import { db, must } from "../lib/db.ts";
import { handle, json, readBody } from "../lib/http.ts";

const hour = z.number().int().min(0).max(23);
const Body = z
  .object({
    morning: z.boolean(),
    morning_hour: hour,
    afternoon: z.boolean(),
    afternoon_hour: hour,
    evening: z.boolean(),
    evening_hour: hour,
    weekly: z.boolean(),
    unsubscribed_all: z.boolean(),
  })
  .partial();

// GET/PUT /api/preferences/email — which emails and when (US-4.3).
export default handle(async (req) => {
  const user = await requireUser(req);
  if (req.method === "PUT") {
    const update = await readBody(req, Body);
    must(
      await db()
        .from("email_preferences")
        .update({ ...update, updated_at: new Date().toISOString() })
        .eq("user_id", user.id),
    );
  }
  const prefs = must(await db().from("email_preferences").select("*").eq("user_id", user.id).single());
  return json({ ...prefs, opted_in: Boolean(user.email_opt_in_at) });
});

export const config: Config = { path: "/api/preferences/email", method: ["GET", "PUT"] };

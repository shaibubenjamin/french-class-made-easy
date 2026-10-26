import type { Config } from "@netlify/functions";
import { z } from "zod";
import { requireUser } from "../lib/auth.ts";
import { db, must } from "../lib/db.ts";
import { accountDeletedEmail, sendOne } from "../lib/email.ts";
import { handle, HttpError, json, readBody } from "../lib/http.ts";

const USER_TABLES = [
  ["email_preferences", "user_id"],
  ["streaks", "user_id"],
  ["placement_attempts", "user_id"],
  ["lesson_progress", "user_id"],
  ["exercise_attempts", "user_id"],
  ["email_log", "user_id"],
  ["ai_usage", "user_id"],
] as const;

// GET  /api/account/export — JSON download of everything we hold (US-1.4)
// POST /api/account/delete — delete all rows + the auth user, then confirm by email
export default handle(async (req) => {
  const user = await requireUser(req);
  const url = new URL(req.url);

  if (req.method === "GET" && url.pathname.endsWith("/export")) {
    const data: Record<string, unknown> = { profile: user };
    for (const [table, column] of USER_TABLES) {
      data[table] = must(await db().from(table).select("*").eq(column, user.id));
    }
    const attemptIds = (data.placement_attempts as { id: string }[]).map((a) => a.id);
    data.placement_answers = attemptIds.length
      ? must(await db().from("placement_answers").select("*").in("attempt_id", attemptIds))
      : [];
    return new Response(JSON.stringify({ exported_at: new Date().toISOString(), ...data }, null, 2), {
      headers: {
        "content-type": "application/json",
        "content-disposition": `attachment; filename="parlons-export-${user.id}.json"`,
        "cache-control": "no-store",
      },
    });
  }

  if (req.method === "POST" && url.pathname.endsWith("/delete")) {
    const { confirm } = await readBody(req, z.object({ confirm: z.literal("DELETE") }));
    if (confirm !== "DELETE") throw new HttpError(400, "Confirmation required");
    // ai_usage keeps cost history but loses the link to the user (on delete set null);
    // every other user table cascades from profiles → auth.users.
    const { error } = await db().auth.admin.deleteUser(user.id);
    if (error) throw new Error(error.message);
    try {
      await sendOne(accountDeletedEmail(user.email));
    } catch (err) {
      console.error("Deletion confirmation email failed", err);
    }
    return json({ deleted: true });
  }

  throw new HttpError(404, "Not found");
});

export const config: Config = { path: ["/api/account/export", "/api/account/delete"], method: ["GET", "POST"] };

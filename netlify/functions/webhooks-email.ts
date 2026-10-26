import type { Config } from "@netlify/functions";
import { db, must } from "../lib/db.ts";
import { env } from "../lib/env.ts";
import { handle, HttpError, json } from "../lib/http.ts";
import { verifySvixSignature } from "../lib/tokens.ts";

interface ResendEvent {
  type: string; // email.sent | email.delivered | email.bounced | email.complained | email.opened | email.clicked …
  created_at: string;
  data: { email_id?: string; to?: string[]; bounce?: { type?: string } };
}

// POST /api/webhooks/email — Resend events (US-4.4). Bounces and complaints
// suppress the address permanently (FR-23); opens/clicks feed the metrics.
export default handle(async (req) => {
  const body = await req.text();
  const ok = verifySvixSignature({
    secret: env("RESEND_WEBHOOK_SECRET"),
    id: req.headers.get("svix-id") ?? "",
    timestamp: req.headers.get("svix-timestamp") ?? "",
    signatureHeader: req.headers.get("svix-signature") ?? "",
    body,
  });
  if (!ok) throw new HttpError(401, "Invalid signature");

  const event = JSON.parse(body) as ResendEvent;
  const providerId = event.data.email_id;
  if (!providerId) return json({ ignored: true });

  const log = must(
    await db().from("email_log").select("id, user_id, status").eq("provider_id", providerId).maybeSingle(),
  ) as { id: string; user_id: string | null; status: string } | null;
  if (!log) return json({ ignored: true });

  const at = event.created_at ?? new Date().toISOString();
  switch (event.type) {
    case "email.opened":
      must(await db().from("email_log").update({ opened_at: at }).eq("id", log.id).is("opened_at", null));
      if (log.status === "sent") await db().from("email_log").update({ status: "opened" }).eq("id", log.id);
      break;
    case "email.clicked":
      must(await db().from("email_log").update({ clicked_at: at, status: "clicked" }).eq("id", log.id));
      break;
    case "email.bounced":
    case "email.complained": {
      const status = event.type === "email.bounced" ? "bounced" : "complained";
      // Soft/transient bounces don't suppress; hard bounces and complaints do.
      const transient = status === "bounced" && /transient|soft/i.test(event.data.bounce?.type ?? "");
      must(await db().from("email_log").update({ status }).eq("id", log.id));
      if (log.user_id && !transient) {
        must(
          await db()
            .from("email_preferences")
            .update({ suppressed_reason: status, updated_at: new Date().toISOString() })
            .eq("user_id", log.user_id),
        );
      }
      break;
    }
  }
  return json({ received: true });
});

export const config: Config = { path: "/api/webhooks/email", method: "POST" };

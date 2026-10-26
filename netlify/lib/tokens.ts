import { createHmac, timingSafeEqual } from "node:crypto";
import { env } from "./env.ts";

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

/** Signed token for one-click unsubscribe links (FR-22). */
export function unsubscribeToken(userId: string, secret = env("UNSUBSCRIBE_SECRET")): string {
  return createHmac("sha256", secret).update(`unsubscribe:${userId}`).digest("base64url");
}

export function verifyUnsubscribeToken(userId: string, token: string, secret = env("UNSUBSCRIBE_SECRET")) {
  return safeEqual(unsubscribeToken(userId, secret), token);
}

/**
 * Verifies a Resend (Svix) webhook signature. `secret` is the whsec_… value;
 * `signatureHeader` may hold several space-separated "v1,<base64>" entries.
 */
export function verifySvixSignature(opts: {
  secret: string;
  id: string;
  timestamp: string;
  signatureHeader: string;
  body: string;
  now?: number;
  toleranceSeconds?: number;
}): boolean {
  const { secret, id, timestamp, signatureHeader, body } = opts;
  const now = opts.now ?? Math.floor(Date.now() / 1000);
  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(now - ts) > (opts.toleranceSeconds ?? 300)) return false;
  const key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const expected = createHmac("sha256", key).update(`${id}.${timestamp}.${body}`).digest("base64");
  return signatureHeader
    .split(" ")
    .map((part) => part.split(",")[1] ?? "")
    .some((sig) => safeEqual(sig, expected));
}

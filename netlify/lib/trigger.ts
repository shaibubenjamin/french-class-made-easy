import { appUrl, env } from "./env.ts";

/**
 * Scheduled functions have a short time limit, so they only kick off
 * background functions (up to 15 minutes) for the heavy work (PRD §9).
 */
export async function triggerBackground(name: string, body: unknown = {}) {
  const res = await fetch(`${appUrl()}/.netlify/functions/${name}`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-internal-secret": env("INTERNAL_SECRET") },
    body: JSON.stringify(body),
  });
  // Background functions answer 202 immediately.
  if (!res.ok) throw new Error(`Failed to trigger ${name}: ${res.status}`);
}

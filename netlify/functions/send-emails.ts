import type { Config } from "@netlify/functions";
import { triggerBackground } from "../lib/trigger.ts";

// Hourly (FR-21): hand off to the background sender, which picks the users
// whose local hour matches their chosen email times.
export default async () => {
  await triggerBackground("send-emails-background", { at: new Date().toISOString() });
  return new Response("triggered");
};

export const config: Config = { schedule: "@hourly" };

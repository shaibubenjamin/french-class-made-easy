import type { Config } from "@netlify/functions";
import { triggerBackground } from "../lib/trigger.ts";

// Daily at 02:00 UTC (US-3.1): hand off to the background generator.
export default async () => {
  await triggerBackground("generate-lessons-background");
  return new Response("triggered");
};

export const config: Config = { schedule: "0 2 * * *" };

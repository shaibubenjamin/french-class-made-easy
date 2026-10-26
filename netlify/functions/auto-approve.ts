import type { Config } from "@netlify/functions";
import { db, must } from "../lib/db.ts";
import { addDays, utcToday } from "../lib/time.ts";

// Daily at 06:00 UTC (FR-13, US-3.2): unreviewed A1–B2 drafts for today and
// tomorrow are approved automatically. C1–C2 always need a human.
export default async () => {
  const rows = must(
    await db()
      .from("lessons")
      .update({ status: "approved", updated_at: new Date().toISOString() })
      .eq("status", "draft")
      .in("level", ["A1", "A2", "B1", "B2"])
      .lte("date", addDays(utcToday(), 1))
      .select("level, date"),
  ) as { level: string; date: string }[];
  console.log(`Auto-approved ${rows.length} lessons`, rows);
  return new Response(`approved ${rows.length}`);
};

export const config: Config = { schedule: "0 6 * * *" };

import { z } from "zod";
import { requireInternal } from "../lib/auth.ts";
import { sendOne } from "../lib/email.ts";
import { handle, json, readBody } from "../lib/http.ts";
import { generateAndStore } from "../lib/lessons.ts";
import { addDays, utcToday } from "../lib/time.ts";
import { LEVELS } from "../../shared/levels.ts";

const Body = z.object({
  levels: z.array(z.enum(LEVELS)).optional(),
  dates: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
  force: z.boolean().optional(),
});

// Background function (15-minute limit). By default fills in any missing
// lessons for today and tomorrow (UTC), so a failed night self-heals and
// learners ahead of UTC already have tomorrow's lesson.
export default handle(async (req) => {
  requireInternal(req);
  const body = await readBody(req, Body);
  const today = utcToday();
  const dates = body.dates ?? [today, addDays(today, 1)];
  const levels = body.levels ?? [...LEVELS];

  const failures: string[] = [];
  const results: string[] = [];
  for (const date of dates) {
    // Levels run in parallel; each retries up to 3 times internally.
    const outcomes = await Promise.allSettled(
      levels.map((level) => generateAndStore(level, date, { force: body.force })),
    );
    outcomes.forEach((o, i) => {
      const label = `${levels[i]} ${date}`;
      if (o.status === "rejected") failures.push(`${label}: ${String(o.reason?.message ?? o.reason)}`);
      else results.push(`${label}: ${o.value.skipped ? "exists" : `generated "${o.value.theme}"`}`);
    });
  }

  console.log(results.join("\n"));
  if (failures.length) {
    console.error("Lesson generation failures:\n" + failures.join("\n"));
    const alertTo = process.env.ALERT_EMAIL;
    if (alertTo) {
      const text = `Lesson generation failed after retries:\n\n${failures.join("\n")}`;
      await sendOne({ to: alertTo, subject: "[Parlons] Lesson generation failed", text, html: `<pre>${text}</pre>` }).catch(
        (err) => console.error("Alert email failed", err),
      );
    }
  }
  return json({ results, failures });
});

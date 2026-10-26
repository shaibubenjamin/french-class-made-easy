import { z } from "zod";
import { requireInternal } from "../lib/auth.ts";
import { db, must, one } from "../lib/db.ts";
import {
  afternoonEmail,
  BATCH_SIZE,
  eveningEmail,
  morningEmail,
  sendBatch,
  weeklyEmail,
  type OutgoingEmail,
} from "../lib/email.ts";
import { handle, json, readBody } from "../lib/http.ts";
import { currentLesson } from "../lib/lessons.ts";
import { buildReview } from "../lib/review.ts";
import { dueEmails, type EmailPrefs, type EmailType } from "../lib/scheduler.ts";
import { displayStreak, type StreakState } from "../lib/streak.ts";
import { localParts, type LocalParts } from "../lib/time.ts";
import type { LessonContent } from "../../shared/lesson-schema.ts";
import type { Level } from "../../shared/levels.ts";

interface Candidate {
  id: string;
  email: string;
  name: string | null;
  level: Level;
  prefs: EmailPrefs;
  streak: StreakState;
  local: LocalParts;
}

const PAGE = 1000;

// Background function (US-4.2): runs hourly, sends each due email at most once
// per user per local day (email_log unique key), in batches of 100.
export default handle(async (req) => {
  requireInternal(req);
  const { at } = await readBody(req, z.object({ at: z.string().optional() }));
  const now = at ? new Date(at) : new Date();

  // 1. Users who opted in (FR-3) and could have something due this hour.
  const candidates: (Candidate & { due: EmailType[] })[] = [];
  for (let from = 0; ; from += PAGE) {
    const page = must(
      await db()
        .from("profiles")
        .select("id, email, name, timezone, current_level, email_preferences(*), streaks(*)")
        .not("email_opt_in_at", "is", null)
        .not("current_level", "is", null)
        .eq("onboarded", true)
        .order("id")
        .range(from, from + PAGE - 1),
    ) as unknown as {
      id: string;
      email: string;
      name: string | null;
      timezone: string;
      current_level: Level;
      email_preferences: EmailPrefs | EmailPrefs[];
      streaks: StreakState | StreakState[];
    }[];

    for (const u of page) {
      const prefs = one(u.email_preferences);
      const streak = one(u.streaks);
      if (!prefs || !streak) continue;
      const local = localParts(u.timezone, now);
      const due = dueEmails({
        prefs,
        local,
        sentToday: new Set(),
        practisedToday: streak.last_active_date === local.date,
      });
      if (due.length) {
        candidates.push({ id: u.id, email: u.email, name: u.name, level: u.current_level, prefs, streak, local, due });
      }
    }
    if (page.length < PAGE) break;
  }

  // 2. Re-check against what each user already received today (FR-24 cap).
  const sent = new Map<string, Set<string>>();
  for (let i = 0; i < candidates.length; i += 200) {
    const chunk = candidates.slice(i, i + 200);
    const rows = must(
      await db()
        .from("email_log")
        .select("user_id, type, local_date")
        .in(
          "user_id",
          chunk.map((c) => c.id),
        )
        .in("local_date", [...new Set(chunk.map((c) => c.local.date))]),
    ) as { user_id: string; type: string; local_date: string }[];
    for (const r of rows) {
      const c = chunk.find((x) => x.id === r.user_id);
      if (c && c.local.date === r.local_date) {
        if (!sent.has(r.user_id)) sent.set(r.user_id, new Set());
        sent.get(r.user_id)!.add(r.type);
      }
    }
  }

  // 3. Build the content.
  // Each learner's next lesson in their course.
  const lessonFor = async (userId: string, level: Level) => (await currentLesson(userId, level))?.lesson.content ?? null;

  const outgoing: { userId: string; type: EmailType; localDate: string; email: OutgoingEmail }[] = [];
  for (const c of candidates) {
    const due = dueEmails({
      prefs: c.prefs,
      local: c.local,
      sentToday: sent.get(c.id) ?? new Set(),
      practisedToday: c.streak.last_active_date === c.local.date,
    });
    for (const type of due) {
      const base = { userId: c.id, to: c.email, name: c.name };
      let email: OutgoingEmail | null = null;
      if (type === "morning") {
        const lesson = await lessonFor(c.id, c.level);
        if (lesson) email = morningEmail({ ...base, lesson });
      } else if (type === "afternoon") {
        const lesson = await lessonFor(c.id, c.level);
        email = afternoonEmail({ ...base, streak: displayStreak(c.streak, c.local.date), theme: lesson?.theme });
      } else if (type === "evening") {
        const review = await buildReview(c.id, c.local.date, await lessonFor(c.id, c.level));
        if (review.items.length) email = eveningEmail({ ...base, ...review });
      } else if (type === "weekly") {
        email = weeklyEmail({ ...base, streak: displayStreak(c.streak, c.local.date), ...(await weekStats(c.id, now)) });
      }
      if (email) outgoing.push({ userId: c.id, type, localDate: c.local.date, email });
    }
  }

  // 4. Claim each email in email_log first: the unique key makes reruns idempotent.
  let sentCount = 0;
  let failed = 0;
  for (let i = 0; i < outgoing.length; i += BATCH_SIZE) {
    const batch = outgoing.slice(i, i + BATCH_SIZE);
    const claimed = must(
      await db()
        .from("email_log")
        .upsert(
          batch.map((o) => ({ user_id: o.userId, type: o.type, local_date: o.localDate, status: "queued" })),
          { onConflict: "user_id,type,local_date", ignoreDuplicates: true },
        )
        .select("id, user_id, type"),
    ) as { id: string; user_id: string; type: string }[];

    const toSend = claimed
      .map((row) => ({ row, item: batch.find((o) => o.userId === row.user_id && o.type === row.type)! }))
      .filter((x) => x.item);
    if (!toSend.length) continue;

    try {
      const ids = await sendBatch(toSend.map((x) => x.item.email));
      const sentAt = new Date().toISOString();
      await Promise.all(
        toSend.map(({ row }, j) =>
          db()
            .from("email_log")
            .update({ status: "sent", provider_id: ids[j], sent_at: sentAt })
            .eq("id", row.id),
        ),
      );
      sentCount += toSend.length;
    } catch (err) {
      console.error("Batch send failed", err);
      failed += toSend.length;
      await db()
        .from("email_log")
        .update({ status: "failed" })
        .in(
          "id",
          toSend.map((x) => x.row.id),
        );
    }
  }

  const summary = { candidates: candidates.length, built: outgoing.length, sent: sentCount, failed };
  console.log("send-emails", summary);
  return json(summary);
});

async function weekStats(userId: string, now: Date) {
  const since = new Date(now.getTime() - 7 * 86_400_000).toISOString();
  const rows = must(
    await db()
      .from("lesson_progress")
      .select("lesson_id, lessons(content)")
      .eq("user_id", userId)
      .gte("completed_at", since),
  ) as unknown as { lessons: { content: LessonContent } | { content: LessonContent }[] | null }[];
  const words = rows.reduce((n, r) => n + (one(r.lessons)?.content.vocabulary.length ?? 0), 0);
  return { lessonsCompleted: rows.length, wordsLearned: words };
}

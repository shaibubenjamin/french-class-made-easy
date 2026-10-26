import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { gradeByRules, normalize } from "../netlify/lib/grading.ts";
import { applyActivity, displayStreak, streakStatus, type StreakState } from "../netlify/lib/streak.ts";
import { dueEmails, type EmailPrefs } from "../netlify/lib/scheduler.ts";
import { addDays, localParts } from "../netlify/lib/time.ts";
import { unsubscribeToken, verifySvixSignature, verifyUnsubscribeToken } from "../netlify/lib/tokens.ts";
import { QUESTION_BANK } from "../data/question-bank.ts";
import { LEVELS } from "../shared/levels.ts";
import { validateLessonShape, redactLesson, type LessonContent } from "../shared/lesson-schema.ts";

describe("grading", () => {
  it("normalises quotes, case, spacing and final punctuation", () => {
    expect(normalize("  L’homme  est là ! ")).toBe("l'homme est là");
  });

  it("grades mcq by exact option", () => {
    expect(gradeByRules({ type: "mcq", answer: "suis", accepted: [] }, "suis").correct).toBe(true);
    expect(gradeByRules({ type: "mcq", answer: "suis", accepted: [] }, "es").correct).toBe(false);
  });

  it("accepts alternatives and flags accent slips", () => {
    const ex = { type: "fill_blank" as const, answer: "été", accepted: ["etait"] };
    expect(gradeByRules(ex, "Été").correct).toBe(true);
    expect(gradeByRules(ex, "ete")).toEqual({ correct: true, accentWarning: true });
    expect(gradeByRules(ex, "avoir").correct).toBe(false);
  });

  it("joins reordered tokens around apostrophes", () => {
    const ex = { type: "reorder" as const, answer: "Je suis allé à l'école.", accepted: [] };
    expect(gradeByRules(ex, "Je suis allé à l' école .").correct).toBe(true);
  });

  it("defers non-matching translations to the AI", () => {
    const ex = { type: "translation" as const, answer: "Il pleut.", accepted: [] };
    expect(gradeByRules(ex, "il pleut").correct).toBe(true);
    expect(gradeByRules(ex, "Il tombe des cordes").correct).toBeNull();
  });
});

describe("streaks", () => {
  const fresh: StreakState = { current: 0, longest: 0, last_active_date: null, freezes_left: 1, freeze_week: null };

  it("counts consecutive days and ignores repeats", () => {
    let s = applyActivity(fresh, "2026-10-20");
    s = applyActivity(s, "2026-10-20");
    s = applyActivity(s, "2026-10-21");
    expect(s.current).toBe(2);
    expect(s.longest).toBe(2);
  });

  it("keeps the streak after 1 or 2 missed days", () => {
    let s = applyActivity(fresh, "2026-10-20");
    s = applyActivity(s, "2026-10-22"); // missed 1 day
    expect(s.current).toBe(2);
    s = applyActivity(s, "2026-10-25"); // missed 2 days in a row
    expect(s.current).toBe(3);
  });

  it("resets after 3 missed days in a row", () => {
    let s = applyActivity(fresh, "2026-10-20");
    s = applyActivity(s, "2026-10-21");
    s = applyActivity(s, "2026-10-25"); // missed 22, 23, 24
    expect(s.current).toBe(1);
    expect(s.longest).toBe(2);
  });

  it("warns before the streak is lost", () => {
    const s = { ...fresh, current: 10, longest: 10, last_active_date: "2026-10-20" };
    expect(streakStatus(s, "2026-10-20")).toMatchObject({ current: 10, risk: "safe" });
    expect(streakStatus(s, "2026-10-21")).toMatchObject({ current: 10, risk: "practise-today", missed: 0 });
    expect(streakStatus(s, "2026-10-22")).toMatchObject({ current: 10, risk: "practise-today", missed: 1 });
    expect(streakStatus(s, "2026-10-23")).toMatchObject({ current: 10, risk: "last-chance", missed: 2 });
    expect(streakStatus(s, "2026-10-24")).toMatchObject({ current: 0, risk: "lost" });
    expect(displayStreak(s, "2026-10-24")).toBe(0);
  });
});

describe("email scheduling", () => {
  const prefs: EmailPrefs = {
    morning: true,
    morning_hour: 8,
    afternoon: true,
    afternoon_hour: 13,
    evening: true,
    evening_hour: 19,
    weekly: true,
    unsubscribed_all: false,
    suppressed_reason: null,
  };
  const at = (hour: number, weekday = 2) => ({ date: "2026-10-27", hour, weekday });

  it("sends at the user's local hour", () => {
    expect(dueEmails({ prefs, local: at(8), sentToday: new Set(), practisedToday: false })).toEqual(["morning"]);
    expect(dueEmails({ prefs, local: at(9), sentToday: new Set(), practisedToday: false })).toEqual([]);
  });

  it("skips the afternoon nudge after practice", () => {
    expect(dueEmails({ prefs, local: at(13), sentToday: new Set(), practisedToday: true })).toEqual([]);
    expect(dueEmails({ prefs, local: at(13), sentToday: new Set(), practisedToday: false })).toEqual(["afternoon"]);
  });

  it("is idempotent and caps at 3 per day", () => {
    expect(dueEmails({ prefs, local: at(8), sentToday: new Set(["morning"]), practisedToday: false })).toEqual([]);
    const sent = new Set(["morning", "afternoon", "weekly"]);
    expect(dueEmails({ prefs, local: at(19), sentToday: sent, practisedToday: false })).toEqual([]);
  });

  it("respects unsubscribe and suppression", () => {
    expect(dueEmails({ prefs: { ...prefs, unsubscribed_all: true }, local: at(8), sentToday: new Set(), practisedToday: false })).toEqual([]);
    expect(dueEmails({ prefs: { ...prefs, suppressed_reason: "bounced" }, local: at(8), sentToday: new Set(), practisedToday: false })).toEqual([]);
  });

  it("works out local time across timezones", () => {
    const instant = new Date("2026-10-27T07:30:00Z");
    expect(localParts("Africa/Lagos", instant)).toMatchObject({ date: "2026-10-27", hour: 8 });
    expect(localParts("America/Toronto", instant)).toMatchObject({ date: "2026-10-27", hour: 3 });
    expect(localParts("Pacific/Kiritimati", instant)).toMatchObject({ date: "2026-10-27", hour: 21 });
    expect(localParts("Not/AZone", instant).hour).toBe(7);
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
  });
});

describe("tokens", () => {
  it("signs and verifies unsubscribe tokens", () => {
    const t = unsubscribeToken("user-1", "secret");
    expect(verifyUnsubscribeToken("user-1", t, "secret")).toBe(true);
    expect(verifyUnsubscribeToken("user-2", t, "secret")).toBe(false);
  });

  it("verifies Svix webhook signatures", () => {
    const secretBytes = Buffer.from("test-secret-bytes");
    const secret = `whsec_${secretBytes.toString("base64")}`;
    const body = '{"type":"email.bounced"}';
    const sig = createHmac("sha256", secretBytes).update(`msg_1.1700000000.${body}`).digest("base64");
    const base = { secret, id: "msg_1", timestamp: "1700000000", body, now: 1700000010 };
    expect(verifySvixSignature({ ...base, signatureHeader: `v1,bogus v1,${sig}` })).toBe(true);
    expect(verifySvixSignature({ ...base, signatureHeader: "v1,bogus" })).toBe(false);
    expect(verifySvixSignature({ ...base, now: 1700009999, signatureHeader: `v1,${sig}` })).toBe(false);
  });
});

describe("question bank", () => {
  it("has ≥120 items and ≥20 per level across all three skills", () => {
    expect(QUESTION_BANK.length).toBeGreaterThanOrEqual(120);
    for (const level of LEVELS) {
      const items = QUESTION_BANK.filter((q) => q.level === level);
      expect(items.length).toBeGreaterThanOrEqual(20);
      for (const skill of ["grammar", "vocabulary", "reading"]) {
        expect(items.filter((q) => q.skill === skill).length).toBeGreaterThanOrEqual(6);
      }
    }
  });

  it("has unique options with the correct answer not repeated", () => {
    for (const q of QUESTION_BANK) {
      expect(new Set([q.correct, ...q.wrong]).size).toBe(4);
    }
  });
});

describe("lesson validation", () => {
  const lesson: LessonContent = {
    level: "B1",
    seq: 1,
    theme: "Au travail",
    vocabulary: Array.from({ length: 8 }, (_, i) => ({ fr: `mot${i}`, en: `word${i}`, example: "…" })),
    grammar: { topic: "imparfait", explanation: "…", examples: ["Il pleuvait.", "Je dormais."] },
    text: {
      title: "Titre",
      body: "Texte",
      questions: [
        { id: "tq1", question: "?", options: ["a", "b"], answer: "a", explanation: "" },
        { id: "tq2", question: "?", options: ["a", "b"], answer: "b", explanation: "" },
      ],
    },
    exercises: [
      { id: "ex1", type: "mcq", skill: "grammar", prompt: "p", options: ["x", "y"], answer: "x", accepted: [], explanation: "", tag: "t" },
      { id: "ex2", type: "fill_blank", skill: "grammar", prompt: "Je ___", options: [], answer: "suis", accepted: [], explanation: "", tag: "t" },
      { id: "ex3", type: "reorder", skill: "grammar", prompt: "", options: ["suis", "je", "là"], answer: "je suis là", accepted: [], explanation: "", tag: "t" },
      { id: "ex4", type: "translation", skill: "vocabulary", prompt: "I am here", options: [], answer: "Je suis là", accepted: [], explanation: "", tag: "t" },
      { id: "ex5", type: "mcq", skill: "vocabulary", prompt: "p", options: ["x", "y"], answer: "y", accepted: [], explanation: "", tag: "t" },
    ],
    writing_prompt: "Décrivez…",
    writing_model: "Modèle.",
    writing_checklist: ["point 1"],
    speaking: { prompt: "Parlez-nous de vous.", keywords: ["je suis", "j'habite"] },
    email_snippet: { word_of_day: { fr: "a", en: "b", example: "c" }, mini_question: { prompt: "?", options: ["a", "b"], answer: "a" } },
  };

  it("accepts a well-formed lesson", () => {
    expect(validateLessonShape(lesson)).toEqual([]);
  });

  it("rejects bad counts and answers", () => {
    const bad = { ...lesson, vocabulary: lesson.vocabulary.slice(0, 3), exercises: [{ ...lesson.exercises[0], answer: "z" }] };
    const problems = validateLessonShape(bad);
    expect(problems.some((p) => p.includes("vocabulary"))).toBe(true);
    expect(problems.some((p) => p.includes("not one of the options"))).toBe(true);
  });

  it("strips answers before sending to the browser", () => {
    const json = JSON.stringify(redactLesson(lesson));
    expect(json).not.toContain('"answer"');
    expect(json).not.toContain("email_snippet");
    expect(json).not.toContain("writing_model");
  });
});

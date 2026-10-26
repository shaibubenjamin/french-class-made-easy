import { Resend, type CreateBatchOptions } from "resend";
import { appUrl, env } from "./env.ts";
import { unsubscribeToken } from "./tokens.ts";
import type { LessonContent } from "../../shared/lesson-schema.ts";

let client: Resend | undefined;
export const resend = () => (client ??= new Resend(env("RESEND_API_KEY")));

export const BATCH_SIZE = 100; // PRD §8: batched, 100 per API call

export interface OutgoingEmail {
  to: string;
  subject: string;
  html: string;
  text: string;
  userId?: string; // adds unsubscribe headers when present
}

/** RFC 8058 one-click unsubscribe headers (FR-22). */
export function unsubscribeHeaders(userId: string) {
  const url = unsubscribeUrl(userId, true);
  return {
    "List-Unsubscribe": `<${url}>`,
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
  };
}

export function unsubscribeUrl(userId: string, api = false) {
  const q = `u=${encodeURIComponent(userId)}&t=${encodeURIComponent(unsubscribeToken(userId))}`;
  return api ? `${appUrl()}/api/email/unsubscribe?${q}` : `${appUrl()}/unsubscribe?${q}`;
}

function toResend(email: OutgoingEmail): CreateBatchOptions[number] {
  return {
    from: env("EMAIL_FROM"),
    to: [email.to],
    subject: email.subject,
    html: email.html,
    text: email.text,
    headers: email.userId ? unsubscribeHeaders(email.userId) : undefined,
  };
}

export async function sendOne(email: OutgoingEmail): Promise<string | null> {
  const { data, error } = await resend().emails.send(toResend(email));
  if (error) throw new Error(`Resend: ${error.message}`);
  return data?.id ?? null;
}

/** Sends up to 100 emails in one call; returns provider ids in input order. */
export async function sendBatch(emails: OutgoingEmail[]): Promise<(string | null)[]> {
  if (emails.length === 0) return [];
  if (emails.length > BATCH_SIZE) throw new Error("Batch too large");
  const { data, error } = await resend().batch.send(emails.map(toResend));
  if (error) throw new Error(`Resend batch: ${error.message}`);
  return emails.map((_, i) => data?.data?.[i]?.id ?? null);
}

// ---------------------------------------------------------------------------
// Templates. Table-based layout with inline styles so it renders in Gmail,
// Outlook and mobile clients; every email also has a plain-text part.
// ---------------------------------------------------------------------------

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function link(path: string, campaign: string) {
  const sep = path.includes("?") ? "&" : "?";
  return `${appUrl()}${path}${sep}utm_source=email&utm_medium=email&utm_campaign=${campaign}`;
}

function layout(opts: { preheader: string; body: string; userId: string }) {
  const prefs = `${appUrl()}/settings`;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Parlons</title></head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:Georgia,'Times New Roman',serif;color:#1f2a44">
<span style="display:none;max-height:0;overflow:hidden">${esc(opts.preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ec"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px">
<tr><td style="padding:24px 28px 8px;font-size:22px;font-weight:bold;color:#1f2a44">Parlons<span style="color:#c8553d">.</span></td></tr>
<tr><td style="padding:8px 28px 24px;font-size:16px;line-height:1.55">${opts.body}</td></tr>
</table>
<p style="max-width:560px;font-family:Arial,sans-serif;font-size:12px;color:#6b7280;line-height:1.5;margin:16px auto 0">
You're receiving this because you signed up for Parlons. <a href="${prefs}" style="color:#6b7280">Email preferences</a> ·
<a href="${unsubscribeUrl(opts.userId)}" style="color:#6b7280">Unsubscribe</a>${
    process.env.COMPANY_ADDRESS ? `<br>${esc(process.env.COMPANY_ADDRESS)}` : ""
  }</p>
</td></tr></table></body></html>`;
}

function button(href: string, label: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:20px 0"><tr><td style="background:#c8553d;border-radius:8px">
<a href="${href}" style="display:inline-block;padding:12px 22px;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none">${esc(label)}</a>
</td></tr></table>`;
}

function footerText(userId: string) {
  return `\n\n—\nEmail preferences: ${appUrl()}/settings\nUnsubscribe: ${unsubscribeUrl(userId)}`;
}

const hello = (name: string | null) => (name ? `Bonjour ${name} !` : "Bonjour !");

export function morningEmail(opts: { userId: string; to: string; name: string | null; lesson: LessonContent }) {
  const { word_of_day: w, mini_question: q } = opts.lesson.email_snippet;
  const cta = link("/lesson/today", "morning");
  const letters = ["A", "B", "C", "D"];
  const options = q.options.map((o, i) => `${letters[i]}. ${o}`);
  return {
    to: opts.to,
    userId: opts.userId,
    subject: `Le mot du jour : ${w.fr}`,
    html: layout({
      userId: opts.userId,
      preheader: `${w.fr} — ${w.en}. Today's ${opts.lesson.level} lesson: ${opts.lesson.theme}`,
      body: `<p>${esc(hello(opts.name))}</p>
<p style="margin:0;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#6b7280">Word of the day</p>
<p style="margin:4px 0 0;font-size:26px;font-weight:bold">${esc(w.fr)}</p>
<p style="margin:2px 0 8px;color:#4b5563">${esc(w.en)}</p>
<p style="margin:0 0 20px;font-style:italic">« ${esc(w.example)} »</p>
<p style="margin:0;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#6b7280">Quick question</p>
<p style="margin:4px 0">${esc(q.prompt)}</p>
<p style="margin:0;color:#374151">${options.map(esc).join("<br>")}</p>
<p style="margin:8px 0 0;font-size:13px;color:#6b7280">Answer: <span style="color:#ffffff;background:#ffffff">${esc(q.answer)}</span> (highlight to reveal)</p>
<p style="margin:20px 0 0">Today's lesson: <strong>${esc(opts.lesson.theme)}</strong></p>
${button(cta, "Start today's lesson")}`,
    }),
    text: `${hello(opts.name)}

WORD OF THE DAY
${w.fr} — ${w.en}
« ${w.example} »

QUICK QUESTION
${q.prompt}
${options.join("\n")}
(Answer: ${q.answer})

Today's lesson: ${opts.lesson.theme}
Start: ${cta}${footerText(opts.userId)}`,
  };
}

export function afternoonEmail(opts: { userId: string; to: string; name: string | null; streak: number; theme?: string }) {
  const cta = link("/lesson/today", "afternoon");
  const streakLine =
    opts.streak > 0
      ? `Your ${opts.streak}-day streak is waiting for today's practice.`
      : "A few minutes today is all it takes to start a streak.";
  return {
    to: opts.to,
    userId: opts.userId,
    subject: "5 minutes de français ?",
    html: layout({
      userId: opts.userId,
      preheader: streakLine,
      body: `<p>${esc(hello(opts.name))}</p><p>${esc(streakLine)}</p>${
        opts.theme ? `<p>Today's theme: <strong>${esc(opts.theme)}</strong></p>` : ""
      }${button(cta, "Practise now")}`,
    }),
    text: `${hello(opts.name)}\n\n${streakLine}\n${opts.theme ? `Today's theme: ${opts.theme}\n` : ""}\nPractise now: ${cta}${footerText(opts.userId)}`,
  };
}

export interface ReviewItem {
  prompt: string;
  answer: string;
  explanation?: string;
}

export function eveningEmail(opts: {
  userId: string;
  to: string;
  name: string | null;
  items: ReviewItem[];
  fromMistakes: boolean;
}) {
  const cta = link("/review", "evening");
  const intro = opts.fromMistakes
    ? "Here are three things from today worth one more look."
    : "No mistakes today — bravo! Here's a quick vocabulary review.";
  const html = opts.items
    .map(
      (it, i) => `<p style="margin:16px 0 4px"><strong>${i + 1}.</strong> ${esc(it.prompt)}</p>
<p style="margin:0;color:#166534">→ ${esc(it.answer)}</p>${
        it.explanation ? `<p style="margin:2px 0 0;font-size:14px;color:#6b7280">${esc(it.explanation)}</p>` : ""
      }`,
    )
    .join("");
  const text = opts.items
    .map((it, i) => `${i + 1}. ${it.prompt}\n   → ${it.answer}${it.explanation ? `\n   ${it.explanation}` : ""}`)
    .join("\n\n");
  return {
    to: opts.to,
    userId: opts.userId,
    subject: "Révision du soir",
    html: layout({
      userId: opts.userId,
      preheader: intro,
      body: `<p>${esc(hello(opts.name))}</p><p>${esc(intro)}</p>${html}${button(cta, "Review in the app")}`,
    }),
    text: `${hello(opts.name)}\n\n${intro}\n\n${text}\n\nReview in the app: ${cta}${footerText(opts.userId)}`,
  };
}

export function weeklyEmail(opts: {
  userId: string;
  to: string;
  name: string | null;
  streak: number;
  lessonsCompleted: number;
  wordsLearned: number;
}) {
  const cta = link("/dashboard", "weekly");
  const stats: [string, number][] = [
    ["Day streak", opts.streak],
    ["Lessons this week", opts.lessonsCompleted],
    ["Words learned", opts.wordsLearned],
  ];
  const cells = stats
    .map(
      ([label, n]) =>
        `<td align="center" style="padding:12px;background:#f4f1ec;border-radius:8px"><div style="font-size:28px;font-weight:bold">${n}</div><div style="font-family:Arial,sans-serif;font-size:12px;color:#6b7280">${label}</div></td>`,
    )
    .join('<td width="8"></td>');
  return {
    to: opts.to,
    userId: opts.userId,
    subject: "Votre semaine en français",
    html: layout({
      userId: opts.userId,
      preheader: `${opts.lessonsCompleted} lessons and ${opts.wordsLearned} words this week.`,
      body: `<p>${esc(hello(opts.name))}</p><p>Here's your week:</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>${cells}</tr></table>
${button(cta, "See your progress")}`,
    }),
    text: `${hello(opts.name)}\n\nYour week:\n${stats.map(([l, n]) => `- ${l}: ${n}`).join("\n")}\n\nSee your progress: ${cta}${footerText(opts.userId)}`,
  };
}

export function accountDeletedEmail(to: string): Omit<OutgoingEmail, "userId"> {
  const body = "Your Parlons account and all your learning data have been deleted. Au revoir, et bonne continuation !";
  return {
    to,
    subject: "Your Parlons account has been deleted",
    html: `<p style="font-family:Georgia,serif;font-size:16px;color:#1f2a44">${esc(body)}</p>`,
    text: body,
  };
}

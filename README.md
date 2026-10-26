# Parlons — AI French learning (A1 → C2)

This repository implements the MVP described in `PRD.md`: magic-link sign-in, an adaptive placement quiz, one AI-generated lesson per level per day with an admin review queue, auto-graded exercises, AI writing feedback, and emails sent at each user's local time.

**Stack:** React + Vite SPA · Netlify Functions (API + scheduled/background jobs) · Supabase (Auth + Postgres with RLS) · Claude API (`claude-sonnet-5-5` for lessons and writing feedback, `claude-haiku-5-5` for grading) · Resend (email) · PostHog (optional analytics).

## Project layout

```
src/                     React app (pages/, components/, lib/)
shared/                  Code shared by the browser and the functions (levels, lesson schema)
netlify/functions/       One file per endpoint or job (each declares its own /api/* path)
netlify/lib/             Server helpers: auth, Claude, email, placement, grading, streaks, scheduler
supabase/migrations/     0001 schema · 0002 RLS + admin metrics · 0003 placement question bank (generated)
data/question-bank.ts    126 placement questions (source for migration 0003)
tests/                   Vitest unit tests for the pure logic
```

## Setup

### 1. Supabase
1. Create a project, then run the three files in `supabase/migrations/` in order. You can use the SQL editor or `supabase db push`.
2. Go to **Auth → URL configuration**. Set the Site URL to your Netlify URL, and add `https://<your-site>/auth/callback` and `http://localhost:8888/auth/callback` to the redirect URLs.
3. Go to **Auth → SMTP**. Point it at Resend so magic links arrive quickly and come from your domain.
4. Sign in once, then make yourself an admin:
   `update profiles set is_admin = true where email = 'you@example.com';`

### 2. Resend
1. Verify your sending domain and set up SPF, DKIM and DMARC (PRD §8).
2. Turn on open and click tracking for the domain.
3. Add a webhook to `https://<your-site>/api/webhooks/email` for the events `email.bounced`, `email.complained`, `email.opened` and `email.clicked`. Copy its signing secret into `RESEND_WEBHOOK_SECRET`.

### 3. Netlify
1. Connect the repository. The build settings are already in `netlify.toml`.
2. Add every variable from `.env.example` to the site's environment variables. Server secrets must **not** have a `VITE_` prefix.
3. The schedules are declared in code:
   - `generate-lessons`: 02:00 UTC
   - `auto-approve`: 06:00 UTC
   - `send-emails`: hourly

   Each scheduled job hands the heavy work to a background function, protected by `INTERNAL_SECRET`.

### 4. Local development
```bash
cp .env.example .env          # fill in your values
npm install
npx netlify-cli dev           # SPA + functions on http://localhost:8888
npm test                      # unit tests
npm run lint                  # ESLint + TypeScript
```
To get your first lessons without waiting for 02:00 UTC, open **Admin → Generate missing lessons**. A1–B2 drafts still need approving: approve them in the queue, or wait for the 06:00 UTC auto-approval.

If you edit `data/question-bank.ts`, regenerate the seed migration with `npm run seed:questions`.

## How key requirements are met

| Requirement | Where |
|---|---|
| Adaptive quiz (FR-5–FR-10) | `netlify/lib/placement.ts`. It starts at A2, moves up or down after each answer, and stops at 15–20 questions once the last six answers fall within two adjacent levels. The 7-day retake limit is enforced in `placement-start.ts`. |
| Lesson generation (FR-11–FR-13) | `generate-lessons-background.ts` generates today's and tomorrow's lessons, validating Claude's structured output with Zod plus business rules. It retries 3× and emails `ALERT_EMAIL` on failure. Usage is logged to `ai_usage`. |
| Grading (FR-14) | Rules first (`grading.ts`: accents, apostrophes, accepted alternatives). Only translations the rules can't decide go to Haiku. |
| Emails (FR-17–FR-24) | `send-emails-background.ts` + `scheduler.ts`. It uses each user's local hour and claims a row in `email_log` (unique per user, type and local day) before sending, so reruns never send duplicates. Emails go out in batches of 100, with at most 3 per day. RFC 8058 one-click unsubscribe headers are included. Bounces and complaints suppress the address. |
| Privacy (FR-4) | `account.ts` handles JSON export and full deletion (the cascade runs from `auth.users`) and sends a confirmation email. RLS is enabled on every table, and answers never reach the browser (`redactLesson`). |
| Cost controls | Lessons are shared per level, Haiku does the grading, and each user has daily AI caps (`DAILY_LIMITS` in `claude.ts`). The admin metrics page shows AI cost per day. |

## Not built yet (later PRD releases or open questions)
- v2: SM-2 spaced repetition (`vocab_cards`) and badges. Streak freezes and the evening review are already in place.
- v3: AI conversation partner, pronunciation, level-up test, Stripe premium.
- Listening clips in the quiz: the `audio_url` column exists, but there are no clips yet. An English/French interface toggle for C1+ is also not built.
- The question bank and the privacy page should be reviewed by a French speaker and a lawyer before launch.
- Claude refusal fallbacks are not enabled. A refused generation fails, is retried, and then triggers an alert.

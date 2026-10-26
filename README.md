# Parlons — French from A1 to C2

A private French course. Learners take an adaptive placement quiz (or pick a level), then work through a **built-in course of 72 lessons** (12 per CEFR level). Each lesson has vocabulary, one grammar point, a reading text with questions, five exercises and a writing task. There's no AI and no AI key to manage: closed exercises are marked automatically, and translations and writing are checked against model answers.

**Stack:** React + Vite SPA · Netlify Functions · Supabase (Auth + Postgres with Row-Level Security) · Resend for optional reminder emails · PostHog for optional analytics.

Live site: https://french-class-made-easy.netlify.app

## Project layout

```
data/curriculum/         The course: a1.ts … c2.ts (12 lessons each) + build.ts helpers
data/question-bank.ts    126 placement questions
src/                     React app (pages/, components/, lib/)
shared/                  Code shared by the browser and functions (levels, lesson schema + validation)
netlify/functions/       One file per endpoint / job (each declares its own /api/* path)
netlify/lib/             Server helpers: auth, lessons, grading, placement, streaks, email scheduler
supabase/migrations/     0001 schema · 0002 RLS + metrics · 0003 quiz questions · 0004–0005 course (generated)
tests/                   Vitest: logic, placement, and validation of every lesson
```

## How the course works

- **Next lesson:** the learner's first unfinished lesson at their level. Once the whole level is done, the least recently completed lesson comes back for review.
- **All lessons:** any lesson can be opened at any time from this page.
- **Marking:**
  - Multiple choice, fill-in-the-blank and word order are marked automatically. Accents and apostrophes are handled sensibly.
  - Translations that don't match the model answer exactly show it to the learner, who marks their own answer right or wrong.
  - Writing shows a model text and a checklist.
- **Review:** mistakes feed the **Review** page. Streak rules are under "Progress rules" below.

### Listening & speaking (free, no AI)
- **Listening:** every word, example and text can be played with the browser's built-in French voice (normal or slow). Each lesson also has two dictations and YouTube search links for its grammar point and theme.
- **Speaking:**
  - **Read aloud:** the browser's speech recognition transcribes what you say. Your score is the share of the sentence's words it recognised, with missed words highlighted.
  - **"Parlez-nous de…":** an open question. The transcript is checked for the lesson's target expressions, and you listen back and self-check against a short checklist.
  - Recordings stay on your device; only the transcript and score are saved.
  - Automatic transcription works in Chrome, Edge and Android. Safari support varies; recording and self-check work everywhere.

### Progress rules
- **Lesson score:** the share of practice and reading questions answered correctly. You can redo a lesson to raise it.
- **Moving up:** you can move up a level only after completing all 12 lessons with an **average of 80% or more**. You can't jump ahead to a higher level manually; the placement quiz can still place you higher.
- **Streak:** practise daily. Missing 1–2 days in a row keeps the streak (with a warning to practise today). Missing 3 days in a row resets it to 0.
- **Calendar:** the dashboard calendar marks every day you practised.

### Editing or adding lessons
1. Edit `data/curriculum/<level>.ts`. Each lesson uses the `mcq`, `blank`, `reorder` and `translate` helpers.
2. Run `npm test`. The tests check every lesson: counts, that each answer is one of its options, that each exercise accepts its own answer, and that word-order puzzles are actually shuffled.
3. Run `npm run seed:lessons` to regenerate `0005_seed_curriculum.sql`. Run that file on Supabase; it updates lessons in place and keeps learner progress.

Small fixes can also be made directly in the app under **Admin → Course editor**.

## Accounts

Sign-in uses email + password, and there is no public sign-up. Accounts are created by the admin, and `ALLOWED_EMAILS` on Netlify (comma-separated) limits who can use the API.

## Setup from scratch

1. **Supabase:** run the files in `supabase/migrations/` in order.
2. **Netlify:**
   - Connect the repository.
   - Set the variables from `.env.example`. Server secrets must not have a `VITE_` prefix.
   - `SUPABASE_SERVICE_ROLE_KEY` is the project's **secret** key, from Project Settings → API Keys.
3. **Local development:**
   ```bash
   cp .env.example .env   # fill in values
   npm install
   npx netlify-cli dev    # app + API on http://localhost:8888
   npm test && npm run lint
   ```

**Optional reminder emails:** add `RESEND_API_KEY` (and verify a sending domain in Resend). The hourly job sends them at each learner's local time, with at most 3 per day and one-click unsubscribe.

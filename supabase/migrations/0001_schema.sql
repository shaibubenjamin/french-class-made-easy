-- Parlons — core schema (PRD §10)

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Profiles & preferences
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  name text,
  timezone text not null default 'UTC',
  goal text,
  daily_minutes smallint not null default 10 check (daily_minutes in (5, 10, 20)),
  current_level text check (current_level in ('A1','A2','B1','B2','C1','C2')),
  level_source text check (level_source in ('quiz','self')),
  onboarded boolean not null default false,
  -- Double opt-in (FR-3): set once the user has clicked a magic link (which
  -- proves address ownership) AND ticked the consent box during onboarding.
  email_opt_in_at timestamptz,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.email_preferences (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  morning boolean not null default true,
  morning_hour smallint not null default 8 check (morning_hour between 0 and 23),
  afternoon boolean not null default false,
  afternoon_hour smallint not null default 13 check (afternoon_hour between 0 and 23),
  evening boolean not null default false,
  evening_hour smallint not null default 19 check (evening_hour between 0 and 23),
  weekly boolean not null default true,
  unsubscribed_all boolean not null default false,
  -- Set by bounce / complaint webhooks (FR-23). Never cleared automatically.
  suppressed_reason text,
  updated_at timestamptz not null default now()
);

create table public.streaks (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  current integer not null default 0,
  longest integer not null default 0,
  last_active_date date,
  freezes_left smallint not null default 1,
  freeze_week date -- Monday of the ISO week the freeze allowance belongs to
);

-- Create the profile, preferences and streak rows when a user signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email);
  insert into public.email_preferences (user_id) values (new.id);
  insert into public.streaks (user_id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Placement
-- ---------------------------------------------------------------------------
create table public.questions (
  id serial primary key,
  level text not null check (level in ('A1','A2','B1','B2','C1','C2')),
  skill text not null check (skill in ('grammar','vocabulary','reading','listening')),
  type text not null default 'mcq',
  prompt text not null,
  passage text,
  options jsonb not null,
  answer smallint not null,
  explanation text,
  audio_url text
);
create index questions_level_skill on public.questions (level, skill);

create table public.placement_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  recommended_level text,
  skill_scores jsonb,
  current_question_id integer references public.questions (id),
  current_level text not null default 'A2'
);
create index placement_attempts_user on public.placement_attempts (user_id, started_at desc);

create table public.placement_answers (
  attempt_id uuid not null references public.placement_attempts (id) on delete cascade,
  question_id integer not null references public.questions (id),
  answer smallint not null,
  is_correct boolean not null,
  "order" smallint not null,
  primary key (attempt_id, "order")
);

-- ---------------------------------------------------------------------------
-- Lessons
-- ---------------------------------------------------------------------------
create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  level text not null check (level in ('A1','A2','B1','B2','C1','C2')),
  date date not null,
  theme text not null,
  content jsonb not null,
  status text not null default 'draft' check (status in ('draft','approved')),
  model text,
  reviewed_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (level, date)
);

create table public.lesson_progress (
  user_id uuid not null references public.profiles (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  score numeric(5, 2),
  state jsonb not null default '{}'::jsonb, -- current step, saved so learners can resume
  primary key (user_id, lesson_id)
);

create table public.exercise_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  exercise_ref text not null,
  skill text,
  answer text not null,
  is_correct boolean,
  ai_feedback jsonb,
  error_tags text[] not null default '{}',
  local_date date not null,
  created_at timestamptz not null default now()
);
create index exercise_attempts_user_date on public.exercise_attempts (user_id, local_date);

-- ---------------------------------------------------------------------------
-- Email
-- ---------------------------------------------------------------------------
create table public.email_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id) on delete cascade,
  type text not null check (type in ('morning','afternoon','evening','weekly','account')),
  local_date date not null,
  sent_at timestamptz,
  provider_id text,
  status text not null default 'queued'
    check (status in ('queued','sent','failed','bounced','complained','opened','clicked')),
  opened_at timestamptz,
  clicked_at timestamptz,
  created_at timestamptz not null default now(),
  -- Idempotency (US-4.2): one email of each type per user per local day.
  unique (user_id, type, local_date)
);
create index email_log_provider on public.email_log (provider_id);

-- ---------------------------------------------------------------------------
-- AI usage / cost tracking
-- ---------------------------------------------------------------------------
create table public.ai_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id) on delete set null,
  function text not null,
  model text not null,
  input_tokens integer not null default 0,
  output_tokens integer not null default 0,
  cost_usd numeric(10, 6) not null default 0,
  created_at timestamptz not null default now()
);
create index ai_usage_created on public.ai_usage (created_at);
create index ai_usage_user_created on public.ai_usage (user_id, created_at);

-- Row-Level Security (PRD §8). All writes go through Netlify Functions using
-- the service-role key, which bypasses RLS. Signed-in users may only read
-- their own rows; nobody can read the question bank (it contains answers).

alter table public.profiles            enable row level security;
alter table public.email_preferences   enable row level security;
alter table public.streaks             enable row level security;
alter table public.questions           enable row level security;
alter table public.placement_attempts  enable row level security;
alter table public.placement_answers   enable row level security;
alter table public.lessons             enable row level security;
alter table public.lesson_progress     enable row level security;
alter table public.exercise_attempts   enable row level security;
alter table public.email_log           enable row level security;
alter table public.ai_usage            enable row level security;

create policy "own profile"        on public.profiles           for select using (id = auth.uid());
create policy "own preferences"    on public.email_preferences  for select using (user_id = auth.uid());
create policy "own streak"         on public.streaks            for select using (user_id = auth.uid());
create policy "own attempts"       on public.placement_attempts for select using (user_id = auth.uid());
create policy "own answers"        on public.placement_answers  for select using (
  exists (select 1 from public.placement_attempts a where a.id = attempt_id and a.user_id = auth.uid())
);
create policy "own progress"       on public.lesson_progress    for select using (user_id = auth.uid());
create policy "own exercise rows"  on public.exercise_attempts  for select using (user_id = auth.uid());
create policy "own email log"      on public.email_log          for select using (user_id = auth.uid());
-- lessons, questions, ai_usage: no client policies (served via functions).

-- ---------------------------------------------------------------------------
-- Admin metrics (US-7.2). Called with the service role from /api/admin/metrics.
-- ---------------------------------------------------------------------------
create or replace function public.admin_metrics()
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'users_total', (select count(*) from profiles),
    'users_by_level', coalesce((
      select jsonb_object_agg(coalesce(current_level, 'unset'), n)
      from (select current_level, count(*) n from profiles group by current_level) t
    ), '{}'::jsonb),
    'email_last_30d', (
      select jsonb_build_object(
        'sent',       count(*) filter (where sent_at is not null),
        'opened',     count(*) filter (where opened_at is not null),
        'clicked',    count(*) filter (where clicked_at is not null),
        'bounced',    count(*) filter (where status = 'bounced'),
        'complained', count(*) filter (where status = 'complained'),
        'failed',     count(*) filter (where status = 'failed')
      )
      from email_log where created_at > now() - interval '30 days'
    ),
    'ai_cost_by_day', coalesce((
      select jsonb_agg(jsonb_build_object('day', day, 'cost_usd', cost, 'calls', calls) order by day)
      from (
        select date_trunc('day', created_at)::date day, sum(cost_usd) cost, count(*) calls
        from ai_usage where created_at > now() - interval '14 days' group by 1
      ) t
    ), '[]'::jsonb),
    'review_queue', (select count(*) from lessons where status = 'draft'),
    'lessons_completed_7d', (
      select count(*) from lesson_progress where completed_at > now() - interval '7 days'
    ),
    'active_users_7d', (
      select count(distinct user_id) from exercise_attempts where created_at > now() - interval '7 days'
    ),
    'quiz_overrides', (
      select jsonb_build_object(
        'quiz', count(*) filter (where level_source = 'quiz'),
        'self', count(*) filter (where level_source = 'self')
      ) from profiles
    )
  );
$$;

revoke all on function public.admin_metrics() from public, anon, authenticated;

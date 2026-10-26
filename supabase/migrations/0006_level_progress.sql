-- Levels can now also be reached by passing the previous one (80% average).
alter table public.profiles drop constraint if exists profiles_level_source_check;
alter table public.profiles add constraint profiles_level_source_check
  check (level_source in ('quiz', 'self', 'progress'));

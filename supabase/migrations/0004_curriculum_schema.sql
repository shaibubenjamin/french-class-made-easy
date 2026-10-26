-- Built-in curriculum: lessons are ordered per level (seq) instead of dated.
alter table public.lessons alter column date drop not null;
alter table public.lessons add column if not exists seq smallint;
create unique index if not exists lessons_level_seq on public.lessons (level, seq);

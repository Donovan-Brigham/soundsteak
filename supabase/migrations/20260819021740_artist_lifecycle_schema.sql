-- Artist lifecycle schema.
-- Covers the full plan doc lifecycle (application -> signed -> cohort -> journey),
-- but only the application-stage tables (artists, artist_video_submissions,
-- artist_platform_connections, artist_intake_responses with response_group='journey')
-- have UI writing to them yet. Everything else (ownership_splits, artist_milestones,
-- the AI-context intake group) is modeled now so the schema doesn't need a rework
-- once signing/onboarding is built, but stays empty/read-only until then.

create type artist_type as enum ('band', 'solo', 'dj_electronic', 'composer_producer', 'other');
create type artist_status as enum ('draft', 'submitted', 'shortlisted', 'signed', 'active', 'graduated', 'declined');
create type video_submission_type as enum ('application', 'showcase');
create type video_submission_status as enum ('pending', 'reviewed', 'approved', 'rejected');
create type platform_connection_type as enum ('spotify_for_artists', 'instagram', 'tiktok', 'youtube', 'other');
create type intake_response_group as enum ('journey', 'ai_context');
create type ownership_holder_type as enum ('artist_member', 'platform', 'investor_pool');
create type artist_milestone_status as enum ('locked', 'current', 'completed', 'flagged');

-- Core profile, 1:1 with an auth user.
create table public.artists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stage_name text not null,
  bio text,
  artist_type artist_type,
  location text,
  status artist_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

-- Band roster / individual humans behind an artist entity. Ownership splits
-- (below) reference these once locked at signing.
create table public.artist_members (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.artists(id) on delete cascade,
  full_name text not null,
  role text,
  is_primary_contact boolean not null default false,
  created_at timestamptz not null default now()
);

-- The in-browser performance-video submission (application stage) or later
-- showcase-stage recordings.
create table public.artist_video_submissions (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.artists(id) on delete cascade,
  storage_path text not null,
  duration_seconds integer,
  submission_type video_submission_type not null default 'application',
  status video_submission_status not null default 'pending',
  created_at timestamptz not null default now()
);

-- Connected external accounts — the plan doc's primary verification mechanism
-- ("a real artist has a legitimate Spotify for Artists account..."). OAuth
-- itself isn't wired up yet; this just holds the connection record.
create table public.artist_platform_connections (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.artists(id) on delete cascade,
  platform platform_connection_type not null,
  external_url text,
  verified boolean not null default false,
  connected_at timestamptz not null default now(),
  unique (artist_id, platform)
);

-- Answers to the intake questionnaire. 'journey' = the application-stage
-- questions (performs live? venues? etc.) already spec'd in the plan doc and
-- live in v1. 'ai_context' = the post-signing AI-licensing/data-product
-- questions — modeled now, not asked by any UI yet.
create table public.artist_intake_responses (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.artists(id) on delete cascade,
  response_group intake_response_group not null,
  question_key text not null,
  response jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (artist_id, question_key)
);

-- Ownership percentages, locked before any raise opens per the plan doc.
-- No client write policy below on purpose — this gets set by signing/onboarding
-- logic that doesn't exist yet, not by an artist editing their own split.
create table public.artist_ownership_splits (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.artists(id) on delete cascade,
  holder_type ownership_holder_type not null,
  member_id uuid references public.artist_members(id) on delete set null,
  percentage numeric(5,2) not null check (percentage >= 0 and percentage <= 100),
  locked_at timestamptz,
  created_at timestamptz not null default now()
);

-- Reference library of milestone categories/formats (seeded below from the
-- plan doc's Milestone Categories table) — not artist-specific.
create table public.milestones (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  applicable_artist_types artist_type[] not null,
  format_label text not null,
  description text,
  sort_order integer not null default 0
);

-- Per-artist assigned milestone instances (the generated journey). Nothing
-- writes here yet — journey generation from intake answers isn't built.
create table public.artist_milestones (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.artists(id) on delete cascade,
  milestone_id uuid references public.milestones(id) on delete set null,
  title text not null,
  category text not null,
  sequence_order integer not null default 0,
  status artist_milestone_status not null default 'locked',
  unlocked_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at before update on public.artists
  for each row execute function public.set_updated_at();

create trigger set_updated_at before update on public.artist_intake_responses
  for each row execute function public.set_updated_at();

-- RLS: locked down explicitly per table, matching the project-wide "no
-- auto-expose" default chosen at project creation.
alter table public.artists enable row level security;
alter table public.artist_members enable row level security;
alter table public.artist_video_submissions enable row level security;
alter table public.artist_platform_connections enable row level security;
alter table public.artist_intake_responses enable row level security;
alter table public.artist_ownership_splits enable row level security;
alter table public.milestones enable row level security;
alter table public.artist_milestones enable row level security;

create policy "artists_select_own" on public.artists
  for select using (auth.uid() = user_id);
create policy "artists_insert_own" on public.artists
  for insert with check (auth.uid() = user_id);
create policy "artists_update_own" on public.artists
  for update using (auth.uid() = user_id);

create policy "artist_members_select_own" on public.artist_members
  for select using (exists (select 1 from public.artists a where a.id = artist_id and a.user_id = auth.uid()));
create policy "artist_members_insert_own" on public.artist_members
  for insert with check (exists (select 1 from public.artists a where a.id = artist_id and a.user_id = auth.uid()));
create policy "artist_members_update_own" on public.artist_members
  for update using (exists (select 1 from public.artists a where a.id = artist_id and a.user_id = auth.uid()));
create policy "artist_members_delete_own" on public.artist_members
  for delete using (exists (select 1 from public.artists a where a.id = artist_id and a.user_id = auth.uid()));

create policy "video_submissions_select_own" on public.artist_video_submissions
  for select using (exists (select 1 from public.artists a where a.id = artist_id and a.user_id = auth.uid()));
create policy "video_submissions_insert_own" on public.artist_video_submissions
  for insert with check (exists (select 1 from public.artists a where a.id = artist_id and a.user_id = auth.uid()));
create policy "video_submissions_delete_own" on public.artist_video_submissions
  for delete using (exists (select 1 from public.artists a where a.id = artist_id and a.user_id = auth.uid()));

create policy "platform_connections_select_own" on public.artist_platform_connections
  for select using (exists (select 1 from public.artists a where a.id = artist_id and a.user_id = auth.uid()));
create policy "platform_connections_insert_own" on public.artist_platform_connections
  for insert with check (exists (select 1 from public.artists a where a.id = artist_id and a.user_id = auth.uid()));
create policy "platform_connections_update_own" on public.artist_platform_connections
  for update using (exists (select 1 from public.artists a where a.id = artist_id and a.user_id = auth.uid()));
create policy "platform_connections_delete_own" on public.artist_platform_connections
  for delete using (exists (select 1 from public.artists a where a.id = artist_id and a.user_id = auth.uid()));

create policy "intake_responses_select_own" on public.artist_intake_responses
  for select using (exists (select 1 from public.artists a where a.id = artist_id and a.user_id = auth.uid()));
create policy "intake_responses_insert_own" on public.artist_intake_responses
  for insert with check (exists (select 1 from public.artists a where a.id = artist_id and a.user_id = auth.uid()));
create policy "intake_responses_update_own" on public.artist_intake_responses
  for update using (exists (select 1 from public.artists a where a.id = artist_id and a.user_id = auth.uid()));

-- Ownership splits: owner can read once set, no client-side insert/update/delete.
create policy "ownership_splits_select_own" on public.artist_ownership_splits
  for select using (exists (select 1 from public.artists a where a.id = artist_id and a.user_id = auth.uid()));

-- Milestone library is public reference data — anyone can see what a journey
-- looks like, signed in or not.
create policy "milestones_public_read" on public.milestones
  for select using (true);

-- Assigned journey: owner can read, no client-side writes (platform-generated).
create policy "artist_milestones_select_own" on public.artist_milestones
  for select using (exists (select 1 from public.artists a where a.id = artist_id and a.user_id = auth.uid()));

-- Seed the milestone library from the plan doc's Milestone Categories table
-- (plan/02, "Milestone Categories & Format Options").
insert into public.milestones (category, applicable_artist_types, format_label, sort_order) values
  ('first_release', array['band','solo']::artist_type[], 'Single', 1),
  ('first_release', array['dj_electronic']::artist_type[], 'Track / EP', 1),
  ('first_release', array['composer_producer']::artist_type[], 'Composition / recording', 1),
  ('live', array['band','solo']::artist_type[], 'Bar and club shows', 2),
  ('live', array['dj_electronic']::artist_type[], 'Club nights / festival sets', 2),
  ('live', array['composer_producer']::artist_type[], 'Recital / live session', 2),
  ('physical_product', array['band','solo']::artist_type[], 'Band tees, vinyl', 3),
  ('physical_product', array['dj_electronic']::artist_type[], 'Limited vinyl, USB drives, merch', 3),
  ('physical_product', array['composer_producer']::artist_type[], 'Sheet music, limited pressings', 3),
  ('visual', array['band','solo']::artist_type[], 'Music video', 4),
  ('visual', array['dj_electronic']::artist_type[], 'Visualizer / live set film', 4),
  ('visual', array['composer_producer']::artist_type[], 'Performance film', 4),
  ('full_length', array['band','solo']::artist_type[], 'Album', 5),
  ('full_length', array['dj_electronic']::artist_type[], 'Album / mix / compilation', 5),
  ('full_length', array['composer_producer']::artist_type[], 'Full composition collection', 5),
  ('major_live', array['band','solo']::artist_type[], 'Headlining tour', 6),
  ('major_live', array['dj_electronic']::artist_type[], 'Festival headliner', 6),
  ('major_live', array['composer_producer']::artist_type[], 'Major venue performance', 6);

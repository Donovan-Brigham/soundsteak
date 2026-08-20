-- Records what an artist explicitly agreed to and when, keyed by a short
-- string (e.g. 'application_terms') rather than a fixed column so future
-- consent types (video release, data licensing, etc.) reuse this same table
-- instead of each needing a new boolean column on artists.

create table public.artist_consents (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.artists(id) on delete cascade,
  consent_key text not null,
  accepted_at timestamptz not null default now(),
  unique (artist_id, consent_key)
);

alter table public.artist_consents enable row level security;

create policy "artist_consents_select_own" on public.artist_consents
  for select using (exists (select 1 from public.artists a where a.id = artist_id and a.user_id = auth.uid()));
create policy "artist_consents_insert_own" on public.artist_consents
  for insert with check (exists (select 1 from public.artists a where a.id = artist_id and a.user_id = auth.uid()));

grant select, insert on public.artist_consents to authenticated;

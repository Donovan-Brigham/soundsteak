-- Revenue-tracking foundation. Schema-only groundwork so that adding a new
-- revenue type later (ticketing, merch, sync, etc.) is additive — a new
-- source_type value — rather than a new table and a schema rework.
-- Nothing writes to any of these tables yet; no integration code, no
-- allocation-calculation logic. Shape follows plan/06's revenue
-- infrastructure section and plan/01's two-tiered ownership model
-- (Founding Equity = artist-level stake; Product Investment = a stake in
-- one specific release, its own LLC).

create type release_status as enum ('planned', 'recording', 'released', 'archived');
create type revenue_source_type as enum (
  'streaming', 'sync', 'merch', 'ticketing', 'stem_licensing',
  'ai_licensing', 'sponsorship', 'attribution', 'other'
);
create type revenue_event_status as enum ('pipeline', 'confirmed', 'distributed');

-- Stub table — was missing entirely despite the ownership model requiring
-- it. Nothing writes here yet; this gives revenue_events somewhere to
-- point when an event is release-specific (streaming for one single)
-- rather than artist-general (a sponsorship, a context-task payout).
create table public.releases (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.artists(id) on delete cascade,
  title text not null,
  status release_status not null default 'planned',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- The generic revenue ledger. One row per unit of revenue regardless of
-- source type — the alternative (a bespoke table per revenue type) doesn't
-- scale to the 30+ types the plan docs eventually describe.
create table public.revenue_events (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.artists(id) on delete cascade,
  release_id uuid references public.releases(id) on delete set null,
  source_type revenue_source_type not null,
  status revenue_event_status not null default 'pipeline',
  amount_cents bigint not null,
  currency text not null default 'usd',
  -- Prevents double-counting when a future integration re-imports the same
  -- upstream transaction. Added now, even though nothing writes here yet,
  -- because adding a uniqueness constraint after duplicate rows already
  -- exist is a real migration headache. NULLs don't collide with each
  -- other in a unique constraint, so this is a no-op until populated.
  external_source text,
  external_reference text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source_type, external_source, external_reference)
);

-- Separates "what came in" from "who it's owed to" — one revenue event
-- fans out to N stakeholders via artist_ownership_splits. No
-- allocation-calculation logic here (no triggers/functions), just the
-- shape that lets a future job write rows without another schema change.
create table public.revenue_event_allocations (
  id uuid primary key default gen_random_uuid(),
  revenue_event_id uuid not null references public.revenue_events(id) on delete cascade,
  ownership_split_id uuid not null references public.artist_ownership_splits(id) on delete cascade,
  holder_type ownership_holder_type not null,
  amount_cents bigint not null,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.releases enable row level security;
alter table public.revenue_events enable row level security;
alter table public.revenue_event_allocations enable row level security;

create trigger set_updated_at before update on public.releases
  for each row execute function public.set_updated_at();

create trigger set_updated_at before update on public.revenue_events
  for each row execute function public.set_updated_at();

-- Select-only for the owning artist on all three — platform-controlled,
-- nothing writes yet. Matches artist_ownership_splits' "no client write
-- policy... intentionally inert" precedent from the first migration.
create policy "releases_select_own" on public.releases
  for select using (exists (select 1 from public.artists a where a.id = artist_id and a.user_id = auth.uid()));

create policy "revenue_events_select_own" on public.revenue_events
  for select using (exists (select 1 from public.artists a where a.id = artist_id and a.user_id = auth.uid()));

create policy "revenue_event_allocations_select_own" on public.revenue_event_allocations
  for select using (
    exists (
      select 1 from public.revenue_events re
      join public.artists a on a.id = re.artist_id
      where re.id = revenue_event_id and a.user_id = auth.uid()
    )
  );

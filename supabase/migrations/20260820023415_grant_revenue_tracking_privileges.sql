-- Explicit grants for the new revenue-tracking tables — required since this
-- project's "automatically expose new tables" setting is off, so RLS alone
-- does nothing without an underlying GRANT (see the equivalent comment in
-- grant_artist_lifecycle_privileges.sql).

grant select on public.releases to authenticated;
grant select on public.revenue_events to authenticated;
grant select on public.revenue_event_allocations to authenticated;

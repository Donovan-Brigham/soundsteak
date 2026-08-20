-- Explicit table-level grants for the API roles. The project has "automatically
-- expose new tables" turned OFF (deliberate — see project setup), so RLS
-- policies alone do nothing until the underlying role also has a base GRANT.
-- Each grant here is scoped to match the RLS policy already written for that
-- table in the prior migration, not just mirroring "authenticated gets everything."

grant usage on schema public to anon, authenticated;

grant select, insert, update on public.artists to authenticated;
grant select, insert, update, delete on public.artist_members to authenticated;
grant select, insert, delete on public.artist_video_submissions to authenticated;
grant select, insert, update, delete on public.artist_platform_connections to authenticated;
grant select, insert, update on public.artist_intake_responses to authenticated;

-- Read-only for both tables the client never writes to directly.
grant select on public.artist_ownership_splits to authenticated;
grant select on public.artist_milestones to authenticated;

-- Milestone library is public reference data — readable signed in or not.
grant select on public.milestones to anon, authenticated;

-- Private bucket for application/showcase performance videos. Objects are
-- stored at "<artist_id>/<filename>" so ownership can be checked from the
-- path alone. Not public — pre-decision submission videos have no reason to
-- be world-readable; a "public once shortlisted" policy can be added later
-- if that becomes a real feature.

insert into storage.buckets (id, name, public, file_size_limit)
values ('artist-videos', 'artist-videos', false, 524288000); -- 500MB ceiling

create policy "artist_videos_insert_own"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'artist-videos'
  and exists (
    select 1 from public.artists a
    where a.id::text = (storage.foldername(name))[1]
    and a.user_id = auth.uid()
  )
);

create policy "artist_videos_select_own"
on storage.objects for select
to authenticated
using (
  bucket_id = 'artist-videos'
  and exists (
    select 1 from public.artists a
    where a.id::text = (storage.foldername(name))[1]
    and a.user_id = auth.uid()
  )
);

create policy "artist_videos_delete_own"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'artist-videos'
  and exists (
    select 1 from public.artists a
    where a.id::text = (storage.foldername(name))[1]
    and a.user_id = auth.uid()
  )
);

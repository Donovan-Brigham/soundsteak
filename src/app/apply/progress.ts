import { cache } from "react";
import { requireArtistContext, type Artist } from "@/lib/artist";
import { createClient } from "@/lib/supabase/server";

/**
 * Loads video-application status in one place, `cache()`-wrapped so a
 * request's layout + page calls share one Supabase round trip. The
 * "about your journey" question set now lives under /profile — this only
 * tracks the application itself (the video submission), not profile
 * completeness.
 */
export const getApplicationProgress = cache(async () => {
  const { artist } = await requireArtistContext();

  if (!artist) {
    return { artist: null as Artist | null, hasVideo: false };
  }

  const supabase = await createClient();
  const { count: videoCount } = await supabase
    .from("artist_video_submissions")
    .select("id", { count: "exact", head: true })
    .eq("artist_id", artist.id);

  return { artist, hasVideo: !!videoCount };
});

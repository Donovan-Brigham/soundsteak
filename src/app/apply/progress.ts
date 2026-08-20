import { cache } from "react";
import { requireArtistContext, type Artist } from "@/lib/artist";
import { createClient } from "@/lib/supabase/server";

/**
 * Loads what's been completed of the application in one batched query,
 * `cache()`-wrapped so every step page shares one Supabase round trip per
 * request instead of each hand-rolling its own count query. Each page still
 * does its own explicit `if (!hasX) redirect(...)` — this only centralizes
 * the *data*, not a generic step-sequencing engine (there's exactly one
 * wizard today; a shared abstraction can wait for a second one).
 */
export const getApplicationProgress = cache(async () => {
  const { artist } = await requireArtistContext();

  if (!artist) {
    return { artist: null as Artist | null, hasVideo: false, hasIntake: false };
  }

  const supabase = await createClient();
  const [{ count: videoCount }, { count: intakeCount }] = await Promise.all([
    supabase
      .from("artist_video_submissions")
      .select("id", { count: "exact", head: true })
      .eq("artist_id", artist.id),
    supabase
      .from("artist_intake_responses")
      .select("id", { count: "exact", head: true })
      .eq("artist_id", artist.id)
      .eq("response_group", "journey"),
  ]);

  return { artist, hasVideo: !!videoCount, hasIntake: !!intakeCount };
});

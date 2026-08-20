import { redirect } from "next/navigation";
import { requireArtistContext } from "@/lib/artist";
import { createClient } from "@/lib/supabase/server";
import { VideoStep } from "./video-step";

export default async function VideoStepPage() {
  const { artist } = await requireArtistContext();

  if (!artist) {
    redirect("/apply/profile");
  }

  const supabase = await createClient();
  const { data: consent } = await supabase
    .from("artist_consents")
    .select("id")
    .eq("artist_id", artist.id)
    .eq("consent_key", "application_terms")
    .maybeSingle();

  return (
    <div>
      <p className="mb-2 text-[10.5px] font-medium uppercase tracking-[0.18em] text-accent">
        Step 2
      </p>
      <h1 className="mb-2 text-3xl font-semibold text-text">
        Record your performance
      </h1>
      <p className="mb-8 text-sm text-text-2">
        One take, up to 3 minutes. Play something that shows who you are as
        an artist right now — it doesn&rsquo;t need to be polished.
      </p>
      <VideoStep artistId={artist.id} initialConsented={!!consent} />
    </div>
  );
}

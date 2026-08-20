import { redirect } from "next/navigation";
import { requireArtistContext } from "@/lib/artist";
import { createClient } from "@/lib/supabase/server";
import { QuestionsForm } from "./questions-form";

export default async function QuestionsStepPage() {
  const { artist } = await requireArtistContext();

  if (!artist) {
    redirect("/apply/profile");
  }

  const supabase = await createClient();
  const { count } = await supabase
    .from("artist_video_submissions")
    .select("id", { count: "exact", head: true })
    .eq("artist_id", artist.id);

  if (!count) {
    redirect("/apply/video");
  }

  return (
    <div>
      <p className="mb-2 text-[10.5px] font-medium uppercase tracking-[0.18em] text-accent">
        Step 3
      </p>
      <h1 className="mb-2 text-3xl font-semibold text-text">About you</h1>
      <p className="mb-8 text-sm text-text-2">
        This shapes the roadmap we build for you if you&rsquo;re signed —
        there are no wrong answers here.
      </p>
      <QuestionsForm />
    </div>
  );
}

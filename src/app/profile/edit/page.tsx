import { requireArtistContext } from "@/lib/artist";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "./profile-form";

export default async function ProfileStepPage() {
  const { artist } = await requireArtistContext();

  let memberNames: string[] = [];
  if (artist) {
    const supabase = await createClient();
    const { data: members } = await supabase
      .from("artist_members")
      .select("full_name")
      .eq("artist_id", artist.id)
      .order("created_at", { ascending: true });
    memberNames = members?.map((m) => m.full_name) ?? [];
  }

  return (
    <div>
      <p className="mb-2 text-[10.5px] font-medium uppercase tracking-[0.18em] text-accent">
        Profile
      </p>
      <h1 className="mb-8 text-3xl font-semibold text-text">
        Tell us who you are
      </h1>
      <ProfileForm artist={artist} initialMemberNames={memberNames} />
    </div>
  );
}

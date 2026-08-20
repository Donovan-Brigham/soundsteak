"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

type ArtistType = Database["public"]["Enums"]["artist_type"];

export type ProfileFormState = {
  status: "idle" | "error";
  message?: string;
};

const VALID_ARTIST_TYPES: ArtistType[] = [
  "band",
  "solo",
  "dj_electronic",
  "composer_producer",
  "other",
];

export async function saveProfile(
  _prevState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const stageName = String(formData.get("stage_name") || "").trim();
  const bio = String(formData.get("bio") || "").trim();
  const artistType = String(formData.get("artist_type") || "");
  const location = String(formData.get("location") || "").trim();

  if (!stageName) {
    return { status: "error", message: "Stage name is required." };
  }
  if (!VALID_ARTIST_TYPES.includes(artistType as ArtistType)) {
    return { status: "error", message: "Choose what best describes you." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: savedArtist, error } = await supabase
    .from("artists")
    .upsert(
      {
        user_id: user.id,
        stage_name: stageName,
        bio: bio || null,
        artist_type: artistType as ArtistType,
        location: location || null,
      },
      { onConflict: "user_id" },
    )
    .select("id")
    .single();

  if (error) {
    return { status: "error", message: error.message };
  }

  if (artistType === "band") {
    const memberNames = formData
      .getAll("member_name")
      .map((name) => String(name).trim())
      .filter(Boolean);

    // Full replace on every save — simplest correct way to handle
    // added/removed/renamed members without diffing against what's stored.
    const { error: deleteError } = await supabase
      .from("artist_members")
      .delete()
      .eq("artist_id", savedArtist.id);

    if (deleteError) {
      return { status: "error", message: deleteError.message };
    }

    if (memberNames.length > 0) {
      const { error: membersError } = await supabase
        .from("artist_members")
        .insert(
          memberNames.map((full_name) => ({
            artist_id: savedArtist.id,
            full_name,
          })),
        );

      if (membersError) {
        return { status: "error", message: membersError.message };
      }
    }
  }

  redirect("/apply/video");
}

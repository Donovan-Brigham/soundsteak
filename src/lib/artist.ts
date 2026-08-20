import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

export type Artist = Database["public"]["Tables"]["artists"]["Row"];

/**
 * Requires an authenticated user, redirecting to /login otherwise. Returns
 * the user's artist row if one exists yet (application steps create it on
 * first save, so this is null until the profile-basics step is submitted).
 */
export async function requireArtistContext(): Promise<{
  userId: string;
  artist: Artist | null;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: artist } = await supabase
    .from("artists")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  return { userId: user.id, artist };
}

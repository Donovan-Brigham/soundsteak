"use server";

import { createClient } from "@/lib/supabase/server";

const CONSENT_KEY = "application_terms";

export type AcceptConsentState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function acceptApplicationConsent(
  _prevState: AcceptConsentState,
  formData: FormData,
): Promise<AcceptConsentState> {
  const artistId = String(formData.get("artist_id") || "");

  if (!artistId) {
    return { status: "error", message: "Missing artist context." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("artist_consents")
    .upsert(
      { artist_id: artistId, consent_key: CONSENT_KEY },
      { onConflict: "artist_id,consent_key" },
    );

  if (error) {
    return { status: "error", message: error.message };
  }

  return { status: "success" };
}

"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const CONSENT_KEY = "application_terms";

export function ApplicationConsent({
  artistId,
  onAccepted,
}: {
  artistId: string;
  onAccepted: () => void;
}) {
  const [originalWork, setOriginalWork] = useState(false);
  const [reviewConsent, setReviewConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canContinue = originalWork && reviewConsent;

  const handleContinue = async () => {
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error: insertError } = await supabase
      .from("artist_consents")
      .upsert(
        { artist_id: artistId, consent_key: CONSENT_KEY },
        { onConflict: "artist_id,consent_key" },
      );

    if (insertError) {
      setError(insertError.message);
      setSubmitting(false);
      return;
    }

    onAccepted();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-radius border border-border bg-surface-2 p-5 text-sm text-text-2">
        <p>
          <span className="text-text">What this is for.</span> Applications
          are reviewed entirely online before anything happens on a stage —
          this video, along with your profile and connected platform data,
          is what our selection panel reviews to build a shortlist of
          10–15 acts. It doesn&rsquo;t need to be produced or rehearsed;
          it needs to be real.
        </p>
        <p>
          <span className="text-text">What we&rsquo;re looking for.</span> A
          verifiable human behind the music, an original performance (not a
          cover, not AI-generated), and a sense of who you are as an artist
          right now.
        </p>
        <p>
          <span className="text-text">What happens next.</span> If your
          application is shortlisted, you&rsquo;ll get a verified badge on
          your profile regardless of what happens after that — it has real
          value on its own.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <label className="flex items-start gap-3 rounded-radius border border-border bg-surface-2 px-4 py-3 text-text has-[:checked]:border-accent">
          <input
            type="checkbox"
            checked={originalWork}
            onChange={(e) => setOriginalWork(e.target.checked)}
            className="mt-0.5 accent-[var(--accent)]"
          />
          <span className="text-sm">
            This performance is my own original work, or I hold the rights
            to everything in it.
          </span>
        </label>

        <label className="flex items-start gap-3 rounded-radius border border-border bg-surface-2 px-4 py-3 text-text has-[:checked]:border-accent">
          <input
            type="checkbox"
            checked={reviewConsent}
            onChange={(e) => setReviewConsent(e.target.checked)}
            className="mt-0.5 accent-[var(--accent)]"
          />
          <span className="text-sm">
            I understand this video will be reviewed by SoundSteak&rsquo;s
            selection panel as part of my application.
          </span>
        </label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        onClick={handleContinue}
        disabled={!canContinue || submitting}
        className="self-start rounded-radius bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
      >
        {submitting ? "Saving…" : "I'm ready to record"}
      </button>
    </div>
  );
}

"use client";

import { useActionState, useState } from "react";
import { saveProfile, type ProfileFormState } from "./actions";
import type { Artist } from "@/lib/artist";

const ARTIST_TYPES: { value: string; label: string }[] = [
  { value: "band", label: "Band" },
  { value: "solo", label: "Solo artist" },
  { value: "dj_electronic", label: "DJ / Electronic producer" },
  { value: "composer_producer", label: "Composer" },
  { value: "other", label: "Other" },
];

const initialState: ProfileFormState = { status: "idle" };

export function ProfileForm({
  artist,
  initialMemberNames,
}: {
  artist: Artist | null;
  initialMemberNames: string[];
}) {
  const [state, formAction, pending] = useActionState(
    saveProfile,
    initialState,
  );
  const [artistType, setArtistType] = useState(artist?.artist_type ?? "");
  const [memberNames, setMemberNames] = useState<string[]>(
    initialMemberNames.length > 0 ? initialMemberNames : ["", ""],
  );

  const updateMember = (index: number, value: string) => {
    setMemberNames((prev) =>
      prev.map((name, i) => (i === index ? value : name)),
    );
  };

  const addMember = () => setMemberNames((prev) => [...prev, ""]);

  const removeMember = (index: number) =>
    setMemberNames((prev) => prev.filter((_, i) => i !== index));

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <label className="flex flex-col gap-2">
        <span className="text-sm text-text-2">Stage name</span>
        <input
          type="text"
          name="stage_name"
          required
          defaultValue={artist?.stage_name ?? ""}
          placeholder="What should we call you?"
          className="rounded-radius border border-border bg-surface-2 px-4 py-3 text-text placeholder:text-text-2/60 focus:border-accent focus:outline-none"
        />
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 text-sm text-text-2">
          What best describes your music?
        </legend>
        <div className="flex flex-col gap-2">
          {ARTIST_TYPES.map((type) => (
            <label
              key={type.value}
              className="flex items-center gap-3 rounded-radius border border-border bg-surface-2 px-4 py-3 text-text has-[:checked]:border-accent"
            >
              <input
                type="radio"
                name="artist_type"
                value={type.value}
                required
                checked={artistType === type.value}
                onChange={() => setArtistType(type.value)}
                className="accent-[var(--accent)]"
              />
              <span className="text-sm">{type.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {artistType === "band" && (
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1 text-sm text-text-2">
            Who&rsquo;s in the band?
          </legend>
          <div className="flex flex-col gap-2">
            {memberNames.map((name, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  name="member_name"
                  value={name}
                  onChange={(e) => updateMember(index, e.target.value)}
                  placeholder={`Member ${index + 1} name`}
                  className="flex-1 rounded-radius border border-border bg-surface-2 px-4 py-3 text-text placeholder:text-text-2/60 focus:border-accent focus:outline-none"
                />
                {memberNames.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    aria-label={`Remove member ${index + 1}`}
                    className="rounded-radius border border-border px-3 text-text-2 hover:text-text"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addMember}
            className="self-start text-sm text-accent hover:opacity-80"
          >
            + Add another member
          </button>
        </fieldset>
      )}

      <label className="flex flex-col gap-2">
        <span className="text-sm text-text-2">Where are you based?</span>
        <input
          type="text"
          name="location"
          defaultValue={artist?.location ?? ""}
          placeholder="City, state"
          className="rounded-radius border border-border bg-surface-2 px-4 py-3 text-text placeholder:text-text-2/60 focus:border-accent focus:outline-none"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm text-text-2">
          Tell us about you — a couple sentences is plenty
        </span>
        <textarea
          name="bio"
          rows={4}
          defaultValue={artist?.bio ?? ""}
          placeholder="Where you started, what you make, who it's for."
          className="rounded-radius border border-border bg-surface-2 px-4 py-3 text-text placeholder:text-text-2/60 focus:border-accent focus:outline-none"
        />
      </label>

      {state.status === "error" && (
        <p className="text-sm text-red-400">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-radius bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Continue"}
      </button>
    </form>
  );
}

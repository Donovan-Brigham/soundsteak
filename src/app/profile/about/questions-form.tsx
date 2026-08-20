"use client";

import { useActionState, useState } from "react";
import { saveIntakeAnswers, type QuestionsFormState } from "./actions";

const initialState: QuestionsFormState = { status: "idle" };

const VENUE_OPTIONS = [
  { value: "bars_clubs", label: "Bars and clubs" },
  { value: "festivals", label: "Festivals" },
  { value: "concert_halls", label: "Concert halls" },
  { value: "house_shows", label: "House shows" },
  { value: "online", label: "Online" },
  { value: "mixed", label: "Mixed" },
];

function RadioGroup({
  name,
  legend,
  options,
}: {
  name: string;
  legend: string;
  options: { value: string; label: string }[];
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-1 text-sm text-text-2">{legend}</legend>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 rounded-radius border border-border bg-surface-2 px-4 py-3 text-text has-[:checked]:border-accent"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              required
              className="accent-[var(--accent)]"
            />
            <span className="text-sm">{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function QuestionsForm() {
  const [state, formAction, pending] = useActionState(
    saveIntakeAnswers,
    initialState,
  );
  const [performsLive, setPerformsLive] = useState<string | null>(null);
  const showVenues =
    performsLive === "yes_regularly" || performsLive === "yes_occasionally";

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 text-sm text-text-2">
          Do you perform live?
        </legend>
        <div className="flex flex-col gap-2">
          {[
            { value: "yes_regularly", label: "Yes — regularly" },
            { value: "yes_occasionally", label: "Yes — occasionally" },
            { value: "rarely", label: "Rarely" },
            { value: "no", label: "No" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 rounded-radius border border-border bg-surface-2 px-4 py-3 text-text has-[:checked]:border-accent"
            >
              <input
                type="radio"
                name="performs_live"
                value={option.value}
                required
                onChange={() => setPerformsLive(option.value)}
                className="accent-[var(--accent)]"
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {showVenues && (
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1 text-sm text-text-2">
            What type of venues? Check all that apply.
          </legend>
          <div className="flex flex-col gap-2">
            {VENUE_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 rounded-radius border border-border bg-surface-2 px-4 py-3 text-text has-[:checked]:border-accent"
              >
                <input
                  type="checkbox"
                  name="venue_types"
                  value={option.value}
                  className="accent-[var(--accent)]"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <RadioGroup
        name="releases_music"
        legend="Do you currently release music?"
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />

      <RadioGroup
        name="has_merch"
        legend="Do you have existing merch?"
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />

      <RadioGroup
        name="revenue_source"
        legend="What is your primary revenue source right now?"
        options={[
          { value: "streaming", label: "Streaming" },
          { value: "live_shows", label: "Live shows" },
          { value: "session_work", label: "Session work" },
          { value: "sync", label: "Sync" },
          { value: "none_yet", label: "None yet" },
        ]}
      />

      <RadioGroup
        name="twelve_month_goal"
        legend="What is your goal for the next 12 months?"
        options={[
          { value: "first_release", label: "First release" },
          { value: "grow_audience", label: "Grow audience" },
          { value: "tour", label: "Tour" },
          { value: "record_album", label: "Record album" },
          { value: "build_investor_base", label: "Build investor base" },
        ]}
      />

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

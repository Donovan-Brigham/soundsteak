import { redirect } from "next/navigation";
import { getApplicationProgress } from "../progress";
import { SubmitButton } from "./submit-button";

const ARTIST_TYPE_LABELS: Record<string, string> = {
  band: "Band",
  solo: "Solo artist",
  dj_electronic: "DJ / Electronic producer",
  composer_producer: "Composer",
  other: "Other",
};

export default async function ReviewStepPage() {
  const { artist, hasVideo, hasIntake } = await getApplicationProgress();

  if (!artist) redirect("/apply/profile");
  if (!hasVideo) redirect("/apply/video");
  if (!hasIntake) redirect("/apply/questions");

  return (
    <div>
      <p className="mb-2 text-[10.5px] font-medium uppercase tracking-[0.18em] text-accent">
        Step 4
      </p>
      <h1 className="mb-8 text-3xl font-semibold text-text">
        Review and submit
      </h1>

      <dl className="mb-8 flex flex-col divide-y divide-border rounded-radius border border-border bg-surface-2">
        <div className="flex items-center justify-between px-4 py-3">
          <dt className="text-sm text-text-2">Stage name</dt>
          <dd className="text-sm text-text">{artist.stage_name}</dd>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <dt className="text-sm text-text-2">Type</dt>
          <dd className="text-sm text-text">
            {artist.artist_type
              ? ARTIST_TYPE_LABELS[artist.artist_type]
              : "—"}
          </dd>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <dt className="text-sm text-text-2">Location</dt>
          <dd className="text-sm text-text">{artist.location || "—"}</dd>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <dt className="text-sm text-text-2">Performance video</dt>
          <dd className="text-sm text-text">Recorded</dd>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <dt className="text-sm text-text-2">Application questions</dt>
          <dd className="text-sm text-text">Complete</dd>
        </div>
      </dl>

      <SubmitButton />
    </div>
  );
}

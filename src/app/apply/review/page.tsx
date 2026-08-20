import { redirect } from "next/navigation";
import { getApplicationProgress } from "../progress";
import { SubmitButton } from "./submit-button";

export default async function ReviewStepPage() {
  const { artist, hasVideo } = await getApplicationProgress();

  if (!artist) redirect("/profile/edit");
  if (!hasVideo) redirect("/apply/video");

  return (
    <div>
      <p className="mb-2 text-[10.5px] font-medium uppercase tracking-[0.18em] text-accent">
        Application
      </p>
      <h1 className="mb-8 text-3xl font-semibold text-text">
        Review and submit
      </h1>

      <dl className="mb-8 flex flex-col divide-y divide-border rounded-radius border border-border bg-surface-2">
        <div className="flex items-center justify-between px-4 py-3">
          <dt className="text-sm text-text-2">Applying as</dt>
          <dd className="text-sm text-text">{artist.stage_name}</dd>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <dt className="text-sm text-text-2">Performance video</dt>
          <dd className="text-sm text-text">Recorded</dd>
        </div>
      </dl>

      <SubmitButton />
    </div>
  );
}

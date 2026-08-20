import { redirect } from "next/navigation";
import { requireArtistContext } from "@/lib/artist";
import { createClient } from "@/lib/supabase/server";
import { getApplicationProgress } from "../apply/progress";

const ARTIST_TYPE_LABELS: Record<string, string> = {
  band: "Band",
  solo: "Solo artist",
  dj_electronic: "DJ / Electronic producer",
  composer_producer: "Composer",
  other: "Other",
};

export default async function ProfilePage() {
  const { artist } = await requireArtistContext();

  if (!artist) {
    redirect("/profile/edit");
  }

  const supabase = await createClient();
  const [{ count: intakeCount }, { data: members }] = await Promise.all([
    supabase
      .from("artist_intake_responses")
      .select("id", { count: "exact", head: true })
      .eq("artist_id", artist.id)
      .eq("response_group", "journey"),
    supabase
      .from("artist_members")
      .select("full_name")
      .eq("artist_id", artist.id)
      .order("created_at", { ascending: true }),
  ]);

  const { hasVideo } = await getApplicationProgress();
  const hasIntake = !!intakeCount;
  const applicationSubmitted = artist.status !== "draft";

  return (
    <div>
      <p className="mb-2 text-[10.5px] font-medium uppercase tracking-[0.18em] text-accent">
        Profile
      </p>
      <h1 className="mb-8 text-3xl font-semibold text-text">
        {artist.stage_name}
      </h1>

      <dl className="mb-8 flex flex-col divide-y divide-border rounded-radius border border-border bg-surface-2">
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
        {members && members.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3">
            <dt className="text-sm text-text-2">Members</dt>
            <dd className="text-sm text-text">
              {members.map((m) => m.full_name).join(", ")}
            </dd>
          </div>
        )}
        {artist.bio && (
          <div className="px-4 py-3">
            <dt className="mb-1 text-sm text-text-2">About</dt>
            <dd className="text-sm text-text">{artist.bio}</dd>
          </div>
        )}
      </dl>

      <a
        href="/profile/edit"
        className="mb-10 inline-block text-sm text-accent underline hover:opacity-80"
      >
        Edit profile
      </a>

      <h2 className="mb-4 text-sm font-medium text-text-2">To do</h2>
      <ul className="flex flex-col gap-3">
        {!hasIntake && (
          <ChecklistItem href="/profile/about">
            Finish your profile — tell us where you are in your journey
          </ChecklistItem>
        )}
        {hasIntake && !hasVideo && (
          <ChecklistItem href="/apply">
            Submit a video application
          </ChecklistItem>
        )}
        {hasIntake && hasVideo && !applicationSubmitted && (
          <ChecklistItem href="/apply/review">
            Finish submitting your application
          </ChecklistItem>
        )}
        {applicationSubmitted && (
          <li className="rounded-radius border border-border bg-surface-2 px-4 py-3 text-sm text-text-2">
            Application submitted — we&rsquo;ll reach out if you&rsquo;re
            shortlisted.
          </li>
        )}
      </ul>
    </div>
  );
}

function ChecklistItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        className="flex items-center justify-between rounded-radius border border-border bg-surface-2 px-4 py-3 text-sm text-text transition-colors hover:border-accent"
      >
        {children}
        <span className="text-accent">→</span>
      </a>
    </li>
  );
}

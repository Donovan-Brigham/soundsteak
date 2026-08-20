import { redirect } from "next/navigation";
import { requireArtistContext } from "@/lib/artist";

export default async function SubmittedPage() {
  const { artist } = await requireArtistContext();

  if (!artist) {
    redirect("/profile/edit");
  }

  if (artist.status === "draft") {
    redirect("/apply");
  }

  return (
    <div>
      <p className="mb-2 text-[10.5px] font-medium uppercase tracking-[0.18em] text-accent">
        Application received
      </p>
      <h1 className="mb-4 text-3xl font-semibold text-text">
        You&rsquo;re in the queue, {artist.stage_name}.
      </h1>
      <p className="mb-8 text-text-2">
        We review applications on a rolling basis ahead of the next showcase
        window. If you&rsquo;re shortlisted, we&rsquo;ll reach out at the
        email you signed in with.
      </p>
      <a
        href="/profile"
        className="text-sm text-accent underline hover:opacity-80"
      >
        Back to your profile
      </a>
    </div>
  );
}

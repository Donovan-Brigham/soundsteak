import { redirect } from "next/navigation";
import { requireArtistContext } from "@/lib/artist";
import { QuestionsForm } from "./questions-form";

export default async function AboutPage() {
  const { artist } = await requireArtistContext();

  if (!artist) {
    redirect("/profile/edit");
  }

  return (
    <div>
      <p className="mb-2 text-[10.5px] font-medium uppercase tracking-[0.18em] text-accent">
        About
      </p>
      <h1 className="mb-2 text-3xl font-semibold text-text">
        Where are you in your journey?
      </h1>
      <p className="mb-8 text-sm text-text-2">
        This shapes the roadmap we build for you — there are no wrong
        answers here.
      </p>
      <QuestionsForm />
    </div>
  );
}

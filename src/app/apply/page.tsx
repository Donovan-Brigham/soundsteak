import { redirect } from "next/navigation";
import { getApplicationProgress } from "./progress";

// Landing on the bare /apply URL sends you to wherever you actually are in
// the wizard, using the same progress data every step page already checks.
export default async function ApplyIndexPage() {
  const { artist, hasVideo, hasIntake } = await getApplicationProgress();

  if (!artist) redirect("/apply/profile");
  if (!hasVideo) redirect("/apply/video");
  if (!hasIntake) redirect("/apply/questions");
  redirect("/apply/review");
}

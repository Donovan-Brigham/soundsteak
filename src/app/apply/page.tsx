import { redirect } from "next/navigation";
import { getApplicationProgress } from "./progress";

// Landing on the bare /apply URL sends you to wherever you actually are in
// the application — but only if a profile already exists. Applying is a
// separate action from setting up a profile, not a continuation of it.
export default async function ApplyIndexPage() {
  const { artist, hasVideo } = await getApplicationProgress();

  if (!artist) redirect("/profile/edit");
  if (!hasVideo) redirect("/apply/video");
  redirect("/apply/review");
}

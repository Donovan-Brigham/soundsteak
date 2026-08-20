"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type QuestionsFormState = {
  status: "idle" | "error";
  message?: string;
};

const REQUIRED_KEYS = [
  "performs_live",
  "releases_music",
  "has_merch",
  "revenue_source",
  "twelve_month_goal",
];

export async function saveIntakeAnswers(
  _prevState: QuestionsFormState,
  formData: FormData,
): Promise<QuestionsFormState> {
  const performsLive = String(formData.get("performs_live") || "");
  const venueTypes = formData.getAll("venue_types").map(String);
  const releasesMusic = String(formData.get("releases_music") || "");
  const hasMerch = String(formData.get("has_merch") || "");
  const revenueSource = String(formData.get("revenue_source") || "");
  const twelveMonthGoal = String(formData.get("twelve_month_goal") || "");

  const values: Record<string, string> = {
    performs_live: performsLive,
    releases_music: releasesMusic,
    has_merch: hasMerch,
    revenue_source: revenueSource,
    twelve_month_goal: twelveMonthGoal,
  };

  for (const key of REQUIRED_KEYS) {
    if (!values[key]) {
      return { status: "error", message: "Answer every question to continue." };
    }
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: artist } = await supabase
    .from("artists")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!artist) {
    redirect("/apply/profile");
  }

  const performsLiveYes =
    performsLive === "yes_regularly" || performsLive === "yes_occasionally";

  const rows = [
    { question_key: "performs_live", response: { value: performsLive } },
    ...(performsLiveYes
      ? [{ question_key: "venue_types", response: { values: venueTypes } }]
      : []),
    { question_key: "releases_music", response: { value: releasesMusic } },
    { question_key: "has_merch", response: { value: hasMerch } },
    { question_key: "revenue_source", response: { value: revenueSource } },
    {
      question_key: "twelve_month_goal",
      response: { value: twelveMonthGoal },
    },
  ].map((row) => ({
    artist_id: artist.id,
    response_group: "journey" as const,
    ...row,
  }));

  const { error } = await supabase
    .from("artist_intake_responses")
    .upsert(rows, { onConflict: "artist_id,question_key" });

  if (error) {
    return { status: "error", message: error.message };
  }

  redirect("/apply/review");
}

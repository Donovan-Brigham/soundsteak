"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SubmitApplicationState = {
  status: "idle" | "error";
  message?: string;
};

export async function submitApplication(
  _prevState: SubmitApplicationState,
  _formData: FormData,
): Promise<SubmitApplicationState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase
    .from("artists")
    .update({ status: "submitted" })
    .eq("user_id", user.id);

  if (error) {
    return { status: "error", message: error.message };
  }

  redirect("/apply/submitted");
}

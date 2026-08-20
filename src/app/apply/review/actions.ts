"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function submitApplication() {
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
    throw new Error(error.message);
  }

  redirect("/apply/submitted");
}

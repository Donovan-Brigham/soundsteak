"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SendCodeState = {
  status: "idle" | "sent" | "error";
  email?: string;
  message?: string;
};

export async function sendCode(
  prevState: SendCodeState,
  formData: FormData,
): Promise<SendCodeState> {
  const email = String(formData.get("email") || "").trim();

  if (!email || !email.includes("@")) {
    return { status: "error", message: "Enter a valid email address." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({ email });

  if (error) {
    return { status: "error", message: error.message };
  }

  return { status: "sent", email };
}

export type VerifyCodeState = {
  status: "idle" | "error";
  message?: string;
};

export async function verifyCode(
  _prevState: VerifyCodeState,
  formData: FormData,
): Promise<VerifyCodeState> {
  const email = String(formData.get("email") || "").trim();
  const code = String(formData.get("code") || "").trim();

  if (!code) {
    return { status: "error", message: "Enter the code from your email." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    email,
    token: code,
    type: "email",
  });

  if (error) {
    return { status: "error", message: "That code didn't work — check for a typo, or request a new one." };
  }

  redirect("/apply/profile");
}

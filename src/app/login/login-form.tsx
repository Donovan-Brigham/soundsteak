"use client";

import { useActionState, useState } from "react";
import {
  sendCode,
  verifyCode,
  type SendCodeState,
  type VerifyCodeState,
} from "./actions";

const sendInitialState: SendCodeState = { status: "idle" };
const verifyInitialState: VerifyCodeState = { status: "idle" };

export function LoginForm({ initialError }: { initialError?: string }) {
  const initialSendState: SendCodeState = initialError
    ? { status: "error", message: initialError }
    : sendInitialState;

  const [sendState, sendAction, sendPending] = useActionState(
    sendCode,
    initialSendState,
  );
  const [verifyState, verifyAction, verifyPending] = useActionState(
    verifyCode,
    verifyInitialState,
  );
  const [email, setEmail] = useState<string | null>(sendState.email ?? null);

  const codeSent = sendState.status === "sent" && email;

  if (!codeSent) {
    return (
      <form
        action={(formData) => {
          setEmail(String(formData.get("email") || ""));
          sendAction(formData);
        }}
        className="flex flex-col gap-4"
      >
        <label className="flex flex-col gap-2 text-left">
          <span className="text-sm text-text-2">Email</span>
          <input
            type="email"
            name="email"
            required
            placeholder="you@yourband.com"
            className="rounded-radius border border-border bg-surface-2 px-4 py-3 text-text placeholder:text-text-2/60 focus:border-accent focus:outline-none"
          />
        </label>

        {sendState.status === "error" && (
          <p className="text-sm text-red-400">{sendState.message}</p>
        )}

        <button
          type="submit"
          disabled={sendPending}
          className="rounded-radius bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {sendPending ? "Sending…" : "Send sign-in code"}
        </button>
      </form>
    );
  }

  return (
    <form action={verifyAction} className="flex flex-col gap-4">
      <input type="hidden" name="email" value={email} />
      <p className="text-sm text-text-2">
        We sent a code to <span className="text-text">{email}</span>. Enter
        it below.
      </p>

      <label className="flex flex-col gap-2 text-left">
        <span className="text-sm text-text-2">Code</span>
        <input
          type="text"
          name="code"
          inputMode="numeric"
          autoComplete="one-time-code"
          required
          placeholder="Code from your email"
          className="rounded-radius border border-border bg-surface-2 px-4 py-3 text-center text-lg tracking-[0.2em] text-text placeholder:tracking-normal placeholder:text-text-2/60 focus:border-accent focus:outline-none"
        />
      </label>

      {verifyState.status === "error" && (
        <p className="text-sm text-red-400">{verifyState.message}</p>
      )}

      <button
        type="submit"
        disabled={verifyPending}
        className="rounded-radius bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {verifyPending ? "Verifying…" : "Verify and continue"}
      </button>

      <button
        type="button"
        onClick={() => setEmail(null)}
        className="text-sm text-text-2 underline hover:text-text"
      >
        Use a different email
      </button>
    </form>
  );
}

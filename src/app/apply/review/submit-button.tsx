"use client";

import { useActionState } from "react";
import {
  submitApplication,
  type SubmitApplicationState,
} from "./actions";

const initialState: SubmitApplicationState = { status: "idle" };

export function SubmitButton() {
  const [state, formAction, pending] = useActionState(
    submitApplication,
    initialState,
  );

  return (
    <form action={formAction}>
      {state.status === "error" && (
        <p className="mb-4 text-sm text-red-400">{state.message}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-radius bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}

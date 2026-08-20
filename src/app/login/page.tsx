import { LoginForm } from "./login-form";

const ERROR_MESSAGES: Record<string, string> = {
  "invalid-link":
    "That sign-in link didn't work — it may have expired or already been used. Enter your email again to get a new one.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const initialError = error ? ERROR_MESSAGES[error] : undefined;

  return (
    <main className="flex min-h-screen items-center justify-start bg-bg px-8 sm:px-16">
      <div className="w-full max-w-sm">
        <p className="mb-2 text-[10.5px] font-medium uppercase tracking-[0.18em] text-accent">
          Artist sign-in
        </p>
        <h1 className="mb-8 text-3xl font-semibold text-text">
          Start your application
        </h1>
        <LoginForm initialError={initialError} />
      </div>
    </main>
  );
}

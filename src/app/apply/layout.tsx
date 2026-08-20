import { requireArtistContext } from "@/lib/artist";
import { StepIndicator } from "./_components/step-indicator";

export default async function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth-gates the entire wizard — every step below assumes a signed-in user.
  await requireArtistContext();

  return (
    <main className="min-h-screen bg-bg px-8 py-16 sm:px-16">
      <div className="mx-auto max-w-xl">
        <StepIndicator />
        {children}
      </div>
    </main>
  );
}

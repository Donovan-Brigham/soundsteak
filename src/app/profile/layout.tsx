import { requireArtistContext } from "@/lib/artist";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth-gates the whole profile section — no step indicator here, since
  // this isn't a forced linear sequence the way the application is.
  await requireArtistContext();

  return (
    <main className="min-h-screen bg-bg px-8 py-16 sm:px-16">
      <div className="mx-auto max-w-xl">{children}</div>
    </main>
  );
}

import { readFile } from "node:fs/promises";
import path from "node:path";

// The real marketing/pitch page is a complete standalone HTML document
// (its own <html>/<head>/<style>), not a React component — served
// byte-for-byte via a Route Handler rather than ported into JSX, since
// forcing it into the App Router's layout-owned <html>/<body> model would
// mean hand-translating hundreds of lines of custom CSS for no benefit.
export async function GET() {
  const html = await readFile(
    path.join(process.cwd(), "index.html"),
    "utf-8",
  );
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

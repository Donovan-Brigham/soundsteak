import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // The root route reads index.html at runtime (src/app/route.ts) — without
  // this, Vercel's file-tracing wouldn't know to bundle a file that's only
  // referenced via a dynamic fs.readFile path, and it'd 404 in production
  // while working fine in local dev.
  outputFileTracingIncludes: {
    "/": ["./index.html"],
  },
};

export default nextConfig;

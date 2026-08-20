export const APPLICATION_STEPS = [
  { slug: "video", label: "Performance" },
  { slug: "review", label: "Review" },
] as const;

export type ApplicationStepSlug = (typeof APPLICATION_STEPS)[number]["slug"];

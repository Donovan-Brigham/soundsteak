export const APPLICATION_STEPS = [
  { slug: "profile", label: "Profile" },
  { slug: "video", label: "Performance" },
  { slug: "questions", label: "About you" },
  { slug: "review", label: "Review" },
] as const;

export type ApplicationStepSlug = (typeof APPLICATION_STEPS)[number]["slug"];

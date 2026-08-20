"use client";

import { usePathname } from "next/navigation";
import { APPLICATION_STEPS } from "../steps";

export function StepIndicator() {
  const pathname = usePathname();
  const currentIndex = pathname.endsWith("/apply/submitted")
    ? APPLICATION_STEPS.length
    : APPLICATION_STEPS.findIndex((step) =>
        pathname.endsWith(`/apply/${step.slug}`),
      );

  return (
    <nav
      aria-label="Application progress"
      className="mb-12 flex items-center gap-3"
    >
      {APPLICATION_STEPS.map((step, index) => {
        const isCurrent = index === currentIndex;
        const isDone = currentIndex >= 0 && index < currentIndex;

        return (
          <div key={step.slug} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-medium ${
                  isCurrent
                    ? "bg-accent text-white"
                    : isDone
                      ? "bg-text-2/30 text-text"
                      : "bg-surface-2 text-text-2"
                }`}
              >
                {index + 1}
              </span>
              <span
                className={`text-sm ${isCurrent ? "text-text" : "text-text-2"}`}
              >
                {step.label}
              </span>
            </div>
            {index < APPLICATION_STEPS.length - 1 && (
              <span className="h-px w-8 bg-border" aria-hidden="true" />
            )}
          </div>
        );
      })}
    </nav>
  );
}

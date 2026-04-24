import type { ReactNode } from "react";

/**
 * Live segment layout for the layouts study.
 * Wraps `/studies/next-server/layouts-and-nested-layouts` and all child routes (e.g. `nested-demo`).
 */
export default function LayoutsStudySegmentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="border-b-2 border-sky-500/60 bg-sky-50 px-6 py-2.5 text-sky-950 dark:border-sky-700 dark:bg-sky-950/50 dark:text-sky-100">
        <div className="mx-auto max-w-3xl text-xs leading-relaxed">
          <strong>Segment layout</strong> —{" "}
          <code className="rounded bg-white/80 px-1.5 py-0.5 font-mono text-[11px] dark:bg-sky-900/80">
            layouts-and-nested-layouts/layout.tsx
          </code>
          <span className="mt-1 block text-[11px] opacity-90">
            Persists while you navigate between this index and <strong>nested-demo</strong> (shared chrome).
          </span>
        </div>
      </div>
      {children}
    </>
  );
}

import type { ReactNode } from "react";

/**
 * Second-level layout: only wraps routes under .../nested-demo/
 */
export default function NestedDemoLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="border-b-2 border-amber-500/70 bg-amber-50 px-6 py-2.5 text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
        <div className="mx-auto max-w-3xl text-xs leading-relaxed">
          <strong>Nested layout</strong> —{" "}
          <code className="rounded bg-white/80 px-1.5 py-0.5 font-mono text-[11px] dark:bg-amber-900/80">
            nested-demo/layout.tsx
          </code>
          <span className="mt-1 block text-[11px] opacity-90">
            Stacks <em>inside</em> the sky segment layout above. Only routes under{" "}
            <code className="font-mono">/nested-demo</code> see this strip.
          </span>
        </div>
      </div>
      {children}
    </>
  );
}

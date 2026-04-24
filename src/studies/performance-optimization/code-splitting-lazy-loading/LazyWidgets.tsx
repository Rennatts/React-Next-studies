"use client";

import dynamic from "next/dynamic";
import { lazy, Suspense, useState } from "react";

const DynamicHeavy = dynamic(
  () => import("./HeavyWidget").then((m) => m.HeavyWidget),
  {
    loading: () => (
      <div className="rounded-xl border border-dashed border-zinc-300 p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
        Loading chunk (next/dynamic)…
      </div>
    ),
    ssr: false,
  },
);

const LazyHeavy = lazy(() =>
  import("./HeavyWidget").then((m) => ({ default: m.HeavyWidget })),
);

export function LazyWidgets() {
  const [showLazy, setShowLazy] = useState(false);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Performance optimization
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          The panels below are loaded as separate chunks. Open DevTools → Network and
          watch JS chunks load when each section mounts.
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          next/dynamic
        </p>
        <DynamicHeavy title="Heavy widget (dynamic import)" />
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            React.lazy + Suspense
          </p>
          <button
            type="button"
            onClick={() => setShowLazy(true)}
            className="rounded-md border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
          >
            Mount lazy panel
          </button>
        </div>

        {showLazy ? (
          <Suspense
            fallback={
              <div className="rounded-xl border border-dashed border-zinc-300 p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
                Loading chunk (React.lazy)…
              </div>
            }
          >
            <LazyHeavy title="Heavy widget (React.lazy)" />
          </Suspense>
        ) : (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Lazy chunk is not loaded until you mount it.
          </p>
        )}
      </div>
    </div>
  );
}

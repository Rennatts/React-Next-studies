"use client";

import { useState } from "react";
import { ErrorBoundary } from "./ErrorBoundary";

function Buggy({ crash }: { crash: boolean }) {
  if (crash) {
    throw new Error("Boom! This component crashed during render.");
  }
  return (
    <p className="text-sm text-zinc-700 dark:text-zinc-300">
      Everything is fine. Toggle “crash” to see the boundary fallback.
    </p>
  );
}

export function ErrorBoundariesDemo() {
  const [crash, setCrash] = useState(false);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Advanced concepts
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Error boundaries prevent a render crash in part of the tree from taking down
          the whole page.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setCrash((v) => !v)}
          className={[
            "rounded-md px-3 py-2 text-sm font-medium",
            crash
              ? "bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600"
              : "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900",
          ].join(" ")}
        >
          {crash ? "Crashing" : "Not crashing"}
        </button>
        <button
          type="button"
          onClick={() => setCrash(false)}
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
        >
          Reset toggle
        </button>
      </div>

      <ErrorBoundary
        fallback={({ error, reset }) => (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/40 dark:bg-rose-950/40">
            <p className="text-sm font-semibold text-rose-900 dark:text-rose-100">
              Boundary fallback UI
            </p>
            <p className="mt-2 text-xs text-rose-800/80 dark:text-rose-200/80">
              {error.message}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setCrash(false);
                  reset();
                }}
                className="rounded-md bg-rose-600 px-3 py-2 text-xs font-medium text-white hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600"
              >
                Reset boundary + stop crashing
              </button>
            </div>
          </div>
        )}
      >
        <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
          <Buggy crash={crash} />
        </div>
      </ErrorBoundary>
    </div>
  );
}


"use client";

import { useEffect, useLayoutEffect, useState } from "react";

/**
 * Tiny demo: after each **remount** (new `key`), React runs **render**, then **`useLayoutEffect`**
 * (same tick as DOM update, before paint), then **`useEffect`** (after paint). Open DevTools
 * **Performance** or add `console.log` if you want to correlate with frames.
 */
function PhaseLogger({ label }: { label: string }) {
  const [steps, setSteps] = useState<string[]>(() => [`${label}: render (initial state)`]);

  useLayoutEffect(() => {
    setSteps((prev) => [...prev, `${label}: useLayoutEffect (after DOM update, before paint)`]);
  }, [label]);

  useEffect(() => {
    setSteps((prev) => [...prev, `${label}: useEffect (after paint)`]);
  }, [label]);

  return (
    <ol className="list-decimal space-y-1 pl-5 text-xs text-zinc-700 dark:text-zinc-300">
      {steps.map((step, i) => (
        <li key={i} className="font-mono">
          {step}
        </li>
      ))}
    </ol>
  );
}

export function RenderingLifecycleDemo() {
  const [key, setKey] = useState(0);

  return (
    <div className="space-y-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/40">
      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        Each click <strong className="text-zinc-900 dark:text-zinc-50">remounts</strong> the logger with a new{" "}
        <code className="rounded bg-zinc-100 px-1 font-mono text-xs dark:bg-zinc-800">key</code> so you
        see a fresh sequence. Order should list <code className="font-mono text-xs">useLayoutEffect</code>{" "}
        before <code className="font-mono text-xs">useEffect</code>.
      </p>
      <button
        type="button"
        className="rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        onClick={() => setKey((k) => k + 1)}
      >
        Remount logger (key = {key})
      </button>
      <PhaseLogger label={`Mount #${key}`} key={key} />
    </div>
  );
}

"use client";

import { useCallback, useState } from "react";

export function UseCallbackRefDemo() {
  const [show, setShow] = useState(true);
  const [width, setWidth] = useState<number | null>(null);

  const inputRef = useCallback((node: HTMLInputElement | null) => {
    if (!node) return;
    node.focus();
    setWidth(Math.round(node.getBoundingClientRect().width));
  }, []);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Advanced concepts
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          This input uses a <span className="font-medium">memoized callback ref</span>{" "}
          (via <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">useCallback</code>)
          to capture the node, focus it, and measure its width on mount.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
        >
          {show ? "Hide" : "Show"} input
        </button>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Last measured width: <span className="font-medium">{width ? `${width}px` : "—"}</span>
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        {show ? (
          <input
            ref={inputRef}
            placeholder="I will auto-focus when mounted"
            className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:ring-zinc-700"
          />
        ) : (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Input is unmounted. (A callback ref receives <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">null</code>{" "}
            on unmount.)
          </p>
        )}
      </div>
    </div>
  );
}


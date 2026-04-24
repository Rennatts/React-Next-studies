"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Mode = "resubscribe" | "ref";

export function EventListenersDemo() {
  const [mode, setMode] = useState<Mode>("ref");
  const [count, setCount] = useState(0);

  const countRef = useRef(count);
  useEffect(() => {
    countRef.current = count;
  }, [count]);

  const hint = useMemo(() => {
    return mode === "ref"
      ? "Ref mode: one stable listener; reads latest state via a ref."
      : "Resubscribe mode: listener is recreated when dependencies change (still safe with cleanup).";
  }, [mode]);

  // Mode A: re-subscribe whenever dependencies change.
  useEffect(() => {
    if (mode !== "resubscribe") return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") setCount((c) => c + 1);
      if (e.key === "ArrowDown") setCount((c) => c - 1);
      if (e.key.toLowerCase() === "r") setCount(0);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mode]);

  // Mode B: subscribe once; keep values current via ref.
  useEffect(() => {
    if (mode !== "ref") return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") setCount(countRef.current + 1);
      if (e.key === "ArrowDown") setCount(countRef.current - 1);
      if (e.key.toLowerCase() === "r") setCount(0);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mode]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Advanced concepts
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Use <span className="font-medium">ArrowUp</span> /{" "}
          <span className="font-medium">ArrowDown</span> to change the counter,
          and press <span className="font-medium">R</span> to reset.
        </p>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{hint}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setMode("ref")}
          className={[
            "rounded-md px-3 py-2 text-sm font-medium",
            mode === "ref"
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
          ].join(" ")}
        >
          Ref listener
        </button>
        <button
          type="button"
          onClick={() => setMode("resubscribe")}
          className={[
            "rounded-md px-3 py-2 text-sm font-medium",
            mode === "resubscribe"
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
          ].join(" ")}
        >
          Resubscribe listener
        </button>
        <button
          type="button"
          onClick={() => setCount(0)}
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
        >
          Reset
        </button>
      </div>

      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Counter
        </p>
        <p className="mt-2 text-3xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
          {count}
        </p>
      </div>
    </div>
  );
}


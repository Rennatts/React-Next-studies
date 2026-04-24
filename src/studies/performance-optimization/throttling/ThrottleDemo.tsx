"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function throttle<Args extends unknown[]>(
  fn: (...args: Args) => void,
  waitMs: number,
): (...args: Args) => void {
  let last = 0;
  return (...args: Args) => {
    const now = performance.now();
    if (now - last >= waitMs) {
      last = now;
      fn(...args);
    }
  };
}

export function ThrottleDemo() {
  const [raw, setRaw] = useState(0);
  const [throttled, setThrottled] = useState(0);

  const onThrottledMove = useMemo(
    () =>
      throttle(() => {
        setThrottled((c) => c + 1);
      }, 150),
    [],
  );

  const reset = useCallback(() => {
    setRaw(0);
    setThrottled(0);
  }, []);

  const surfaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = surfaceRef.current;
    if (!el) return;

    const onMove = () => {
      setRaw((c) => c + 1);
      onThrottledMove();
    };

    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [onThrottledMove]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Performance optimization
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Move the pointer over the pad. Raw <code className="text-xs">pointermove</code> fires very
          often; the throttled side uses a ~150ms minimum gap between handler runs (leading-style,
          time-since-last).
        </p>
      </div>

      <div
        ref={surfaceRef}
        className="flex h-40 cursor-crosshair touch-none flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 text-center dark:border-zinc-600 dark:bg-zinc-900/50"
      >
        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Move pointer here</p>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Touch / pen supported</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Raw handler calls</p>
          <p className="text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
            {raw}
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Throttled (~150ms)</p>
          <p className="text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
            {throttled}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={reset}
        className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
      >
        Reset counts
      </button>
    </div>
  );
}

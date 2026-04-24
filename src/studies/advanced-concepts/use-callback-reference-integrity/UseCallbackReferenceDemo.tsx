"use client";

import { memo, useCallback, useRef, useState } from "react";

type MemoChildProps = {
  label: string;
  onAction: () => void;
};

const MemoChild = memo(function MemoChild({ label, onAction }: MemoChildProps) {
  const renders = useRef(0);
  renders.current += 1;

  return (
    <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{label}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          child renders: <span className="font-medium">{renders.current}</span>
        </p>
      </div>
      <button
        type="button"
        onClick={onAction}
        className="mt-3 rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
      >
        Action
      </button>
    </div>
  );
});

export function UseCallbackReferenceDemo() {
  const [parentTick, setParentTick] = useState(0);
  const [childAActionCount, setChildAActionCount] = useState(0);
  const [childBActionCount, setChildBActionCount] = useState(0);

  // Bad for referential integrity: new function identity every parent render.
  const unstableHandler = () => setChildAActionCount((c) => c + 1);

  // Good for referential integrity: stable identity unless deps change.
  const stableHandler = useCallback(() => setChildBActionCount((c) => c + 1), []);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Advanced concepts
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Both children are wrapped in <span className="font-medium">React.memo</span>.
          Click “Re-render parent” and watch which child’s render count increases.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setParentTick((t) => t + 1)}
          className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
        >
          Re-render parent
        </button>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          parent renders (approx):{" "}
          <span className="font-medium">{parentTick + 1}</span>
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <MemoChild
          label="Inline handler (unstable identity)"
          onAction={unstableHandler}
        />
        <MemoChild label="useCallback handler (stable identity)" onAction={stableHandler} />
      </div>

      <div className="rounded-xl border border-zinc-200 p-4 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
        <p>
          Child A actions: <span className="font-semibold">{childAActionCount}</span>
        </p>
        <p className="mt-1">
          Child B actions: <span className="font-semibold">{childBActionCount}</span>
        </p>
      </div>
    </div>
  );
}

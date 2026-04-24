"use client";

import { memo, useMemo, useRef, useState } from "react";

const ThemedBadge = memo(function ThemedBadge({
  theme,
  label,
}: {
  theme: { accent: string };
  label: string;
}) {
  const renders = useRef(0);
  renders.current += 1;

  return (
    <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{label}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          memo child renders: <span className="font-mono font-medium">{renders.current}</span>
        </p>
      </div>
      <p
        className="mt-3 text-sm font-medium"
        style={{ color: theme.accent }}
      >
        Accent sample (theme.accent)
      </p>
    </div>
  );
});

export function AvoidUnnecessaryRerendersDemo() {
  const [tick, setTick] = useState(0);
  const [accent, setAccent] = useState("#2563eb");
  const [stableThemeObject, setStableThemeObject] = useState(false);

  const stableTheme = useMemo(() => ({ accent }), [accent]);
  const inlineTheme = { accent };

  const themeForChild = stableThemeObject ? stableTheme : inlineTheme;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Parent state
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          <span className="font-medium">tick</span> bumps re-render the parent but{" "}
          <span className="font-medium">should not</span> re-render the memoized child if the{" "}
          <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-900">theme</code> prop keeps the same
          reference. Passing a <span className="font-medium">new object literal</span> every parent render breaks that.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTick((t) => t + 1)}
            className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
          >
            Bump tick ({tick})
          </button>
          <button
            type="button"
            onClick={() => setAccent((c) => (c === "#2563eb" ? "#c026d3" : "#2563eb"))}
            className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
          >
            Toggle accent (prop change)
          </button>
        </div>
        <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
          <input
            type="checkbox"
            checked={stableThemeObject}
            onChange={(e) => setStableThemeObject(e.target.checked)}
            className="size-4 rounded border-zinc-300 text-zinc-900 dark:border-zinc-600"
          />
          Use stable <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-900">theme</code> via{" "}
          <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-900">useMemo</code> (deps: accent)
        </label>
      </div>

      <ThemedBadge
        theme={themeForChild}
        label={stableThemeObject ? "Stable theme object" : "Inline { accent } each parent render"}
      />
    </div>
  );
}

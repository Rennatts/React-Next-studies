"use client";

import { memo, useMemo, useRef, useState } from "react";

function expensiveFilter(items: string[], query: string) {
  // Artificial cost: keep this intentionally slow for the demo.
  let burn = 0;
  for (let i = 0; i < 250_000; i += 1) burn += i % 7;
  void burn;

  const q = query.trim().toLowerCase();
  if (q.length === 0) return items.slice(0, 12);
  return items.filter((it) => it.toLowerCase().includes(q)).slice(0, 12);
}

const MemoList = memo(function MemoList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  const renders = useRef(0);
  renders.current += 1;

  return (
    <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{title}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          child renders: <span className="font-medium">{renders.current}</span>
        </p>
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((it) => (
          <li
            key={it}
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-800 dark:border-zinc-800 dark:text-zinc-200"
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
});

const ALL = Array.from({ length: 2000 }, (_, i) => `Item ${String(i).padStart(4, "0")}`);

export function UseMemoAvoidRerendersDemo() {
  const [query, setQuery] = useState("42");
  const [unrelatedTick, setUnrelatedTick] = useState(0);

  const [useMemoEnabled, setUseMemoEnabled] = useState(true);

  const computeCount = useRef(0);
  computeCount.current += 1;

  const filteredMemo = useMemo(() => expensiveFilter(ALL, query), [query]);
  const filteredNoMemo = expensiveFilter(ALL, query);

  const itemsForChild = useMemoEnabled ? filteredMemo : filteredNoMemo;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Advanced concepts
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Toggle <span className="font-medium">useMemo</span> for the expensive derived list.
          Then click <span className="font-medium">Bump unrelated parent state</span> and
          notice how often the expensive filter runs.
        </p>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          Parent renders (approx):{" "}
          <span className="font-medium">{computeCount.current}</span> · unrelated tick:{" "}
          <span className="font-medium">{unrelatedTick}</span>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setUseMemoEnabled(true)}
          className={[
            "rounded-md px-3 py-2 text-sm font-medium",
            useMemoEnabled
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
          ].join(" ")}
        >
          useMemo ON
        </button>
        <button
          type="button"
          onClick={() => setUseMemoEnabled(false)}
          className={[
            "rounded-md px-3 py-2 text-sm font-medium",
            !useMemoEnabled
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
          ].join(" ")}
        >
          useMemo OFF
        </button>

        <button
          type="button"
          onClick={() => setUnrelatedTick((t) => t + 1)}
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
        >
          Bump unrelated parent state
        </button>
      </div>

      <label className="grid gap-2">
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
          Filter query
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:ring-zinc-700"
        />
      </label>

      <MemoList
        title={
          useMemoEnabled
            ? "Memoized derived list (stable when query unchanged)"
            : "Non-memoized derived list (recomputes every parent render)"
        }
        items={itemsForChild}
      />
    </div>
  );
}

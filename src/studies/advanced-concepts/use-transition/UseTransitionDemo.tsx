"use client";

import { useMemo, useState, useTransition } from "react";

function makeItems() {
  const out: { id: string; label: string }[] = [];
  for (let i = 0; i < 5000; i += 1) {
    out.push({ id: `it_${i}`, label: `Item ${i.toString().padStart(4, "0")}` });
  }
  return out;
}

const ITEMS = makeItems();

function expensiveIncludes(haystack: string, needle: string) {
  // Artificial cost so transitions are easier to notice.
  let score = 0;
  for (let i = 0; i < 1800; i += 1) score += i % 7;
  void score;
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

export function UseTransitionDemo() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim();
    if (q.length === 0) return ITEMS.slice(0, 80);
    return ITEMS.filter((it) => expensiveIncludes(it.label, q)).slice(0, 80);
  }, [query]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Advanced concepts
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Type in the input. We update the expensive list in a{" "}
          <span className="font-medium">transition</span>, so typing stays responsive.
        </p>
      </div>

      <label className="grid gap-2">
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
          Filter
        </span>
        <input
          value={input}
          onChange={(e) => {
            const next = e.target.value;
            setInput(next); // urgent update
            startTransition(() => {
              setQuery(next); // non-urgent update
            });
          }}
          placeholder="Try typing: 12, 999, 42…"
          className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:ring-zinc-700"
        />
      </label>

      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <span>
          Input:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-[11px] dark:bg-zinc-900">
            {input || "—"}
          </code>
        </span>
        <span>
          Query (transition):{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-[11px] dark:bg-zinc-900">
            {query || "—"}
          </code>
        </span>
        {isPending ? (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
            Updating…
          </span>
        ) : (
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
            Idle
          </span>
        )}
      </div>

      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Filtered results (top 80)
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {filtered.map((it) => (
            <li
              key={it.id}
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-800 dark:border-zinc-800 dark:text-zinc-200"
            >
              {it.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


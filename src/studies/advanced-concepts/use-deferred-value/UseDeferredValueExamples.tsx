"use client";

/**
 * useDeferredValue — extra patterns with runnable UI + code snippets.
 * See also UseDeferredValueDemo.tsx for the larger list stress demo.
 */

import { useDeferredValue, useMemo, useState, type ReactNode } from "react";

function Section({
  id,
  title,
  code,
  children,
}: {
  id: string;
  title: string;
  code: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/40"
    >
      <div className="space-y-1">
        <h3 id={id} className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h3>
        <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-white p-3 text-[11px] leading-snug text-zinc-800 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200">
          <code>{code.trim()}</code>
        </pre>
      </div>
      {children}
    </section>
  );
}

function makeItems(count: number) {
  const out: { id: string; label: string }[] = [];
  for (let i = 0; i < count; i += 1) {
    out.push({ id: `row_${i}`, label: `Row ${i.toString().padStart(4, "0")}` });
  }
  return out;
}

const SMALL_LIST = makeItems(1200);

function slowIncludes(haystack: string, needle: string) {
  let score = 0;
  for (let i = 0; i < 500; i += 1) score += i % 4;
  void score;
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

/** --- 1. Same component: immediate state + deferred read for expensive memo --- */

function CompactFilterDemo() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const filtered = useMemo(() => {
    const q = deferredQuery.trim();
    if (!q) return SMALL_LIST.slice(0, 24);
    return SMALL_LIST.filter((it) => slowIncludes(it.label, q)).slice(0, 24);
  }, [deferredQuery]);
  const isStale = query !== deferredQuery;

  return (
    <div className="space-y-2">
      <label className="grid gap-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
        Query
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950"
        />
      </label>
      <p className="text-xs text-zinc-500">
        immediate vs deferred:{" "}
        <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-900">{query || "—"}</code> /{" "}
        <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-900">{deferredQuery || "—"}</code>
        {isStale ? (
          <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100">
            stale
          </span>
        ) : null}
      </p>
      <ul className="max-h-32 overflow-auto rounded border border-zinc-200 bg-white p-2 text-xs dark:border-zinc-700 dark:bg-zinc-900">
        {filtered.map((it) => (
          <li key={it.id} className="truncate font-mono">
            {it.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** --- 2. Defer a prop: parent stays “fast”, child throttles heavy work --- */

function HeavyResults({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);
  const summary = useMemo(() => {
    let acc = 0;
    for (let i = 0; i < 120_000; i += 1) acc += i % 7;
    void acc;
    return `Deferred query: "${deferredQuery}" (${deferredQuery.length} chars)`;
  }, [deferredQuery]);

  return (
    <p className="rounded-md border border-emerald-200 bg-emerald-50/90 px-3 py-2 text-sm text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100">
      {summary}
    </p>
  );
}

function ParentPassesQueryDemo() {
  const [query, setQuery] = useState("");
  return (
    <div className="space-y-2">
      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        Parent only holds <code className="font-mono text-xs">query</code>. The child calls{" "}
        <code className="font-mono text-xs">useDeferredValue(query)</code> so expensive child work does not block the
        parent input path on every keystroke.
      </p>
      <label className="grid gap-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
        Type here (parent state)
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950"
        />
      </label>
      <HeavyResults query={query} />
    </div>
  );
}

export function UseDeferredValueExamples() {
  return (
    <div className="space-y-8">
      <Section
        id="ex-core"
        title="1. Defer the value that feeds expensive useMemo / render"
        code={`
const [query, setQuery] = useState("");
const deferredQuery = useDeferredValue(query);

const filtered = useMemo(
  () => expensiveFilter(allItems, deferredQuery),
  [deferredQuery],
);

const isStale = query !== deferredQuery;
`}
      >
        <CompactFilterDemo />
      </Section>

      <Section
        id="ex-prop"
        title="2. Defer props inside a child"
        code={`
function HeavyResults({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);
  const summary = useMemo(() => compute(deferredQuery), [deferredQuery]);
  return <p>{summary}</p>;
}
`}
      >
        <ParentPassesQueryDemo />
      </Section>
    </div>
  );
}

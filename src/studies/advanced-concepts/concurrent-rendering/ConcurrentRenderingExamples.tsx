"use client";

/**
 * Concurrent rendering — transition vs deferred value (compact teaching demos).
 */

import {
  useDeferredValue,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from "react";

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
    out.push({ id: `it_${i}`, label: `Item ${i.toString().padStart(4, "0")}` });
  }
  return out;
}

const ITEMS = makeItems(3500);

function expensiveIncludes(haystack: string, needle: string) {
  let score = 0;
  for (let i = 0; i < 1400; i += 1) score += i % 5;
  void score;
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

function useFiltered(needle: string) {
  return useMemo(() => {
    const q = needle.trim();
    if (q.length === 0) return ITEMS.slice(0, 60);
    return ITEMS.filter((it) => expensiveIncludes(it.label, q)).slice(0, 60);
  }, [needle]);
}

/** --- useTransition: urgent input state + transition query state --- */

function TransitionDemo() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const filtered = useFiltered(query);

  return (
    <div className="space-y-3">
      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        The text field updates immediately (<code className="font-mono text-xs">input</code>). The list follows{" "}
        <code className="font-mono text-xs">query</code> inside <code className="font-mono text-xs">startTransition</code>{" "}
        so React can keep the keystroke path responsive.
      </p>
      <label className="grid gap-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
        Filter (urgent + transition)
        <input
          value={input}
          onChange={(e) => {
            const next = e.target.value;
            setInput(next);
            startTransition(() => setQuery(next));
          }}
          placeholder="Try: 42, 999…"
          className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950"
        />
      </label>
      <div className="flex flex-wrap gap-2 text-xs text-zinc-500">
        <span>
          query: <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-900">{query || "—"}</code>
        </span>
        {isPending ? (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100">
            isPending
          </span>
        ) : null}
      </div>
      <ul className="max-h-40 overflow-auto rounded border border-zinc-200 bg-white p-2 text-xs dark:border-zinc-700 dark:bg-zinc-900">
        {filtered.map((it) => (
          <li key={it.id} className="truncate font-mono">
            {it.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** --- useDeferredValue: one state + deferred copy for expensive derive --- */

function DeferredDemo() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const filtered = useFiltered(deferredQuery);
  const isStale = query !== deferredQuery;

  return (
    <div className="space-y-3">
      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        Only one piece of state (<code className="font-mono text-xs">query</code>).{" "}
        <code className="font-mono text-xs">useDeferredValue(query)</code> gives a version that can lag so the expensive
        list does not block every keystroke.
      </p>
      <label className="grid gap-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
        Query (deferred downstream)
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try: 12, 888…"
          className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950"
        />
      </label>
      <p className="text-xs text-zinc-500">
        List behind deferred value: {isStale ? "catching up…" : "in sync"}
      </p>
      <ul className="max-h-40 overflow-auto rounded border border-zinc-200 bg-white p-2 text-xs dark:border-zinc-700 dark:bg-zinc-900">
        {filtered.map((it) => (
          <li key={it.id} className="truncate font-mono">
            {it.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ConcurrentRenderingExamples() {
  return (
    <div className="space-y-8">
      <Section
        id="ex-transition"
        title="1. useTransition — mark matching state updates as non-urgent"
        code={`
const [isPending, startTransition] = useTransition();
setInput(next); // urgent
startTransition(() => setQuery(next)); // can wait
`}
      >
        <TransitionDemo />
      </Section>

      <Section
        id="ex-deferred"
        title="2. useDeferredValue — defer a value consumed by expensive work"
        code={`
const [query, setQuery] = useState("");
const deferredQuery = useDeferredValue(query);
const filtered = useMemo(() => slowFilter(deferredQuery), [deferredQuery]);
`}
      >
        <DeferredDemo />
      </Section>
    </div>
  );
}

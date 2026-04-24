"use client";

/**
 * startTransition — examples with the named import and with useTransition.
 */

import {
  startTransition,
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

function makeItems(n: number) {
  const out: { id: string; label: string }[] = [];
  for (let i = 0; i < n; i += 1) {
    out.push({ id: `t_${i}`, label: `Tab item ${i}` });
  }
  return out;
}

const ITEMS = makeItems(2000);

function slowMatch(label: string, q: string) {
  let s = 0;
  for (let i = 0; i < 600; i += 1) s += i % 5;
  void s;
  return label.toLowerCase().includes(q.toLowerCase());
}

/** --- 1. useTransition: urgent input + transition-backed query + isPending --- */

function DualStateTransitionDemo() {
  const [isPending, startTrans] = useTransition();
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return ITEMS.slice(0, 20);
    return ITEMS.filter((it) => slowMatch(it.label, q)).slice(0, 20);
  }, [query]);

  return (
    <div className="space-y-2">
      <label className="grid gap-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
        Filter (immediate input, transition query)
        <input
          value={input}
          onChange={(e) => {
            const v = e.target.value;
            setInput(v);
            startTrans(() => setQuery(v));
          }}
          className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950"
        />
      </label>
      <div className="flex flex-wrap gap-2 text-xs text-zinc-500">
        {isPending ? (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100">
            isPending
          </span>
        ) : (
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100">
            idle
          </span>
        )}
      </div>
      <ul className="max-h-28 overflow-auto rounded border border-zinc-200 bg-white p-2 text-xs dark:border-zinc-700 dark:bg-zinc-900">
        {filtered.map((it) => (
          <li key={it.id} className="truncate font-mono">
            {it.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** --- 2. Named import startTransition: batch several updates (no isPending) --- */

function NamedImportBatchDemo() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  return (
    <div className="space-y-2">
      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        Both counters bump inside one <code className="font-mono text-xs">startTransition</code> callback. Use{" "}
        <code className="font-mono text-xs">useTransition</code> if you need <code className="font-mono text-xs">isPending</code>.
      </p>
      <div className="flex flex-wrap gap-2 text-sm font-mono text-zinc-800 dark:text-zinc-200">
        <span>a = {a}</span>
        <span>b = {b}</span>
      </div>
      <button
        type="button"
        className="rounded-md bg-zinc-900 px-3 py-1.5 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
        onClick={() => {
          startTransition(() => {
            setA((x) => x + 1);
            setB((x) => x + 2);
          });
        }}
      >
        Run batched transition
      </button>
    </div>
  );
}

/** --- 3. Tab switch: non-urgent view state --- */

function HeavyPane({ label }: { label: string }) {
  const lines = useMemo(() => {
    let burn = 0;
    for (let i = 0; i < 80_000; i += 1) burn += i % 3;
    void burn;
    return Array.from({ length: 12 }, (_, i) => `${label} line ${i + 1}`);
  }, [label]);

  return (
    <ul className="max-h-32 overflow-auto rounded border border-zinc-200 bg-white p-2 text-xs dark:border-zinc-700 dark:bg-zinc-900">
      {lines.map((line) => (
        <li key={line} className="font-mono">
          {line}
        </li>
      ))}
    </ul>
  );
}

function TabTransitionDemo() {
  const [isPending, startTrans] = useTransition();
  const [tab, setTab] = useState<"summary" | "heavy">("summary");

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <button
          type="button"
          className={`rounded-md px-3 py-1.5 text-sm ${
            tab === "summary"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "border border-zinc-300 dark:border-zinc-600"
          }`}
          onClick={() => startTrans(() => setTab("summary"))}
        >
          Summary
        </button>
        <button
          type="button"
          className={`rounded-md px-3 py-1.5 text-sm ${
            tab === "heavy"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "border border-zinc-300 dark:border-zinc-600"
          }`}
          onClick={() => startTrans(() => setTab("heavy"))}
        >
          Heavy pane
        </button>
        {isPending ? (
          <span className="self-center text-xs text-amber-700 dark:text-amber-300">Switching…</span>
        ) : null}
      </div>
      {tab === "summary" ? (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Light content. Switch to Heavy with a transition.</p>
      ) : (
        <HeavyPane label="Heavy" />
      )}
    </div>
  );
}

export function StartTransitionExamples() {
  return (
    <div className="space-y-8">
      <Section
        id="ex-hook"
        title="1. useTransition — startTransition + isPending"
        code={`
const [isPending, startTransition] = useTransition();
setInput(next); // urgent
startTransition(() => setQuery(next)); // list follows when idle
`}
      >
        <DualStateTransitionDemo />
      </Section>

      <Section
        id="ex-named"
        title='2. import { startTransition } from "react"'
        code={`
import { startTransition } from "react";

startTransition(() => {
  setA(a => a + 1);
  setB(b => b + 2);
});
`}
      >
        <NamedImportBatchDemo />
      </Section>

      <Section
        id="ex-tab"
        title="3. View / tab switches"
        code={`
<button onClick={() => {
  startTransition(() => setTab("analytics"));
}}>
  Analytics
</button>
`}
      >
        <TabTransitionDemo />
      </Section>
    </div>
  );
}

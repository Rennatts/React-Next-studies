"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";

function HeavyBanner({ label }: { label: string }) {
  const renders = useRef(0);
  renders.current += 1;

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100">
      <p className="font-medium">{label}</p>
      <p className="mt-1 text-amber-900/80 dark:text-amber-200/90">
        Simulated “heavy” region — renders:{" "}
        <span className="font-semibold tabular-nums">{renders.current}</span>
      </p>
    </div>
  );
}

function RenderBadge({ name }: { name: string }) {
  const renders = useRef(0);
  renders.current += 1;
  return (
    <p className="text-xs text-zinc-500 dark:text-zinc-400">
      {name} renders: <span className="font-medium text-zinc-800 dark:text-zinc-200">{renders.current}</span>
    </p>
  );
}

/** State + “heavy” UI live in the same component → every click re-renders both. */
function InlineLayout() {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-3">
      <RenderBadge name="Parent (owns state + banner)" />
      <HeavyBanner label="Banner is a sibling of the counter in one component" />
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
        >
          Count: {count}
        </button>
      </div>
    </div>
  );
}

function StableShell({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-3">
      <RenderBadge name="Stable shell (no state)" />
      <HeavyBanner label="Banner lives in the shell above the stateful child" />
      {children}
    </div>
  );
}

function StatefulCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-2">
      <RenderBadge name="Stateful counter subtree" />
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
      >
        Count: {count}
      </button>
    </div>
  );
}

/** Shell wraps only static UI + `children`; state moves into a child → shell subtree skips re-renders. */
function LiftedLayout() {
  return (
    <StableShell>
      <StatefulCounter />
    </StableShell>
  );
}

function StrategyBody({ mode }: { mode: "inline" | "lifted" }) {
  if (mode === "inline") return <InlineLayout />;
  return <LiftedLayout />;
}

export function LiftComponentsUpDemo() {
  const [mode, setMode] = useState<"inline" | "lifted">("inline");

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Advanced concepts
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          When static UI and state live in the same component, updating state re-renders everything
          below that return. Move state into a <span className="font-medium">child</span> and keep
          expensive markup in a <span className="font-medium">parent shell with no state</span> so
          the shell does not run again on each tick.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("inline")}
          className={[
            "rounded-md px-3 py-2 text-sm font-medium",
            mode === "inline"
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
          ].join(" ")}
        >
          Inline (banner + state together)
        </button>
        <button
          type="button"
          onClick={() => setMode("lifted")}
          className={[
            "rounded-md px-3 py-2 text-sm font-medium",
            mode === "lifted"
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
          ].join(" ")}
        >
          Lifted (shell + children)
        </button>
      </div>

      <StrategyBody mode={mode} key={mode} />
    </div>
  );
}

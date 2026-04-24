"use client";

import { useSyncExternalStore } from "react";
import { observableCounter } from "./observableCounter";

function useObservableCounterValue() {
  return useSyncExternalStore(
    observableCounter.subscribe,
    observableCounter.getSnapshot,
    observableCounter.getSnapshot,
  );
}

export function ObserverDemo() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Observer pattern
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Both panels below are <span className="font-medium">observers</span> of
          the same external subject (a tiny store). Update it once, and all
          subscribed observers re-render.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <ObserverPanel title="Observer A" />
        <ObserverPanel title="Observer B" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={observableCounter.decrement}
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
        >
          −1
        </button>
        <button
          type="button"
          onClick={observableCounter.increment}
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
        >
          +1
        </button>
        <button
          type="button"
          onClick={observableCounter.reset}
          className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function ObserverPanel({ title }: { title: string }) {
  const value = useObservableCounterValue();
  return (
    <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {title}
      </p>
      <p className="mt-3 text-3xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
        {value}
      </p>
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        Value read via{" "}
        <code className="rounded bg-zinc-100 px-1 py-0.5 text-[11px] dark:bg-zinc-900">
          useSyncExternalStore
        </code>
        .
      </p>
    </div>
  );
}


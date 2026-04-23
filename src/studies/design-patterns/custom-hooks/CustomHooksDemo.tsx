"use client";

import { useCounter } from "./useCounter";

export function CustomHooksDemo() {
  const a = useCounter(0);
  const b = useCounter(10);

  return (
    <div className="space-y-6">
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Each call to <code className="rounded bg-zinc-100 px-1 py-0.5 text-[11px] dark:bg-zinc-900">useCounter()</code>{" "}
        owns its own state—two counters, two isolated hooks.
      </p>

      <CounterPanel label="Counter A (starts at 0)" counter={a} />
      <CounterPanel label="Counter B (starts at 10)" counter={b} />
    </div>
  );
}

function CounterPanel({
  label,
  counter,
}: {
  label: string;
  counter: ReturnType<typeof useCounter>;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <p className="mt-3 text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
        {counter.count}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={counter.decrement}
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
        >
          −1
        </button>
        <button
          type="button"
          onClick={counter.increment}
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
        >
          +1
        </button>
        <button
          type="button"
          onClick={counter.reset}
          className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

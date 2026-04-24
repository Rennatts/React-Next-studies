"use client";

import { QueryClient, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProductsPage } from "./products";

const CANCEL_KEY = ["products", "cancel-demo", { limit: 5 }] as const;

export function QueryCancellationDemo({ queryClient }: { queryClient: QueryClient }) {
  const [delayMs, setDelayMs] = useState(2500);

  const q = useQuery({
    queryKey: CANCEL_KEY,
    queryFn: ({ signal }) =>
      getProductsPage({ page: 1, limit: 5, delayMs, signal }),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Query cancellation
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          React Query passes an <span className="font-medium">AbortSignal</span>{" "}
          to your <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">queryFn</code>.
          If your API client forwards it to <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">fetch</code>,
          you can cancel in-flight requests via{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">queryClient.cancelQueries</code>.
        </p>
      </div>

      <label className="grid gap-2">
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
          Simulated server delay (ms)
        </span>
        <input
          type="number"
          min={0}
          max={5000}
          value={delayMs}
          onChange={(e) => setDelayMs(Number(e.target.value))}
          className="w-48 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:ring-zinc-700"
        />
      </label>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => void q.refetch()}
          className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
        >
          Start fetch
        </button>
        <button
          type="button"
          onClick={() => void queryClient.cancelQueries({ queryKey: CANCEL_KEY })}
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
        >
          Cancel
        </button>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {q.isFetching ? "fetching" : "idle"}
        </p>
      </div>

      {q.isError ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-100">
          <p className="text-sm font-semibold">Request failed</p>
          <p className="mt-2 text-xs opacity-80">
            {q.error instanceof Error ? q.error.message : "Unknown error"}
          </p>
        </div>
      ) : null}

      {q.data ? (
        <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Result (page 1)
          </p>
          <ul className="mt-3 space-y-2">
            {q.data.products.map((p) => (
              <li
                key={p.id}
                className="flex items-baseline justify-between gap-4 rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800"
              >
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {p.name}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  ${(p.priceCents / 100).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}


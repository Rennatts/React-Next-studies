"use client";

import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { getProducts } from "./products";
import { PaginatedProductsDemo } from "./PaginatedProductsDemo";
import { InfiniteProductsDemo } from "./InfiniteProductsDemo";
import { QueryCancellationDemo } from "./QueryCancellationDemo";

const queryClient = new QueryClient();

function ProductsQueryInner() {
  const [failMode, setFailMode] = useState<"never" | "sometimes">("never");

  const q = useQuery({
    queryKey: ["products", { failMode }],
    queryFn: () => getProducts({ fail: failMode === "sometimes" }),
    staleTime: 10_000,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          API studies
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          React Query manages cache + refetching. Notice that{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            isFetching
          </code>{" "}
          can be true while you still have data.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setFailMode("never")}
          className={[
            "rounded-md px-3 py-2 text-sm font-medium",
            failMode === "never"
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
          ].join(" ")}
        >
          No failures
        </button>
        <button
          type="button"
          onClick={() => setFailMode("sometimes")}
          className={[
            "rounded-md px-3 py-2 text-sm font-medium",
            failMode === "sometimes"
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
          ].join(" ")}
        >
          Simulate failures
        </button>

        <button
          type="button"
          onClick={() => void q.refetch()}
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
        >
          Refetch
        </button>

        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {q.isPending ? "pending" : q.isError ? "error" : "success"} ·{" "}
          <span className="font-medium">{q.isFetching ? "fetching" : "idle"}</span>
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

      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Products
        </p>
        {q.isPending ? (
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">Loading…</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {(q.data?.products ?? []).map((p) => (
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
            {(q.data?.products ?? []).length === 0 ? (
              <li className="text-sm text-zinc-600 dark:text-zinc-400">
                No products yet.
              </li>
            ) : null}
          </ul>
        )}
      </div>
    </div>
  );
}

export function ReactQueryProductsDemo() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="space-y-6">
        <ProductsQueryInner />
        <PaginatedProductsDemo />
        <InfiniteProductsDemo />
        <QueryCancellationDemo queryClient={queryClient} />
      </div>
    </QueryClientProvider>
  );
}


"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProductsPage } from "./products";

export function PaginatedProductsDemo() {
  const [page, setPage] = useState(1);
  const limit = 5;

  const q = useQuery({
    queryKey: ["products", "page", { page, limit }],
    queryFn: ({ signal }) => getProductsPage({ page, limit, signal }),
    placeholderData: keepPreviousData,
    staleTime: 10_000,
    refetchOnWindowFocus: false,
  });

  const totalPages = q.data?.totalPages ?? 1;
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Pagination
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Page is part of the <span className="font-medium">queryKey</span>. We
          use{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            keepPreviousData
          </code>{" "}
          so the list doesn’t clear while fetching the next page.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={!canPrev}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
        >
          ← Prev
        </button>
        <button
          type="button"
          disabled={!canNext}
          onClick={() => setPage((p) => p + 1)}
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
        >
          Next →
        </button>

        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Page <span className="font-medium">{page}</span> of{" "}
          <span className="font-medium">{totalPages}</span> ·{" "}
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
          Products (limit {limit})
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
          </ul>
        )}
      </div>
    </div>
  );
}


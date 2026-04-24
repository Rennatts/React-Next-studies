"use client";

import { useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductsPage } from "./products";

export function InfiniteProductsDemo() {
  const limit = 6;

  const q = useInfiniteQuery({
    queryKey: ["products", "infinite", { limit }],
    initialPageParam: 1,
    queryFn: ({ pageParam, signal }) =>
      getProductsPage({ page: Number(pageParam), limit, signal }),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: 10_000,
  });

  const items = useMemo(() => {
    return q.data?.pages.flatMap((p) => p.products) ?? [];
  }, [q.data]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    if (!q.hasNextPage) return;

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) {
          if (!q.isFetchingNextPage) {
            void q.fetchNextPage();
          }
        }
      },
      { root: null, rootMargin: "200px 0px", threshold: 0.01 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [q]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Infinite scroll
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Uses{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            useInfiniteQuery
          </code>{" "}
          + an{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            IntersectionObserver
          </code>{" "}
          sentinel to fetch the next page when you scroll near the end.
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
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Products
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Loaded: <span className="font-medium">{items.length}</span>{" "}
            {q.isFetchingNextPage ? "· fetching next…" : null}
          </p>
        </div>

        {q.isPending ? (
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">Loading…</p>
        ) : (
          <>
            <ul className="mt-3 space-y-2">
              {items.map((p) => (
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

            <div className="mt-3 space-y-2">
              {q.hasNextPage ? (
                <>
                  <div ref={sentinelRef} className="h-1" />
                  <button
                    type="button"
                    onClick={() => void q.fetchNextPage()}
                    disabled={q.isFetchingNextPage}
                    className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
                  >
                    {q.isFetchingNextPage ? "Loading more…" : "Load more"}
                  </button>
                </>
              ) : (
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  You reached the end.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


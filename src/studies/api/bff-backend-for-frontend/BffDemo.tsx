"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { requestJson } from "@/studies/api/api-layer/apiClient";

type BffProductCard = { id: string; title: string; price: string };
type BffResponse = {
  cards: BffProductCard[];
  meta: { page: number; totalPages: number };
  source: "bff";
};

type State =
  | { status: "idle" | "loading"; data: null; error: null }
  | { status: "success"; data: BffResponse; error: null }
  | { status: "error"; data: null; error: string };

export function BffDemo() {
  const [state, setState] = useState<State>({ status: "idle", data: null, error: null });
  const [page, setPage] = useState(1);

  const endpoint = useMemo(() => `/api/studies/bff?page=${page}&limit=5`, [page]);

  const load = useCallback(async () => {
    setState({ status: "loading", data: null, error: null });
    try {
      const data = await requestJson<BffResponse>(endpoint);
      setState({ status: "success", data, error: null });
    } catch (e) {
      setState({
        status: "error",
        data: null,
        error: e instanceof Error ? e.message : "Unknown error",
      });
    }
  }, [endpoint]);

  useEffect(() => {
    void load();
  }, [load]);

  const totalPages = state.status === "success" ? state.data.meta.totalPages : 1;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">BFF demo</p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          The UI calls a same-origin BFF endpoint that shapes upstream data into a UI-friendly model (title + formatted
          price).
        </p>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          Endpoint:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-[11px] dark:bg-zinc-900">{endpoint}</code>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1 || state.status === "loading"}
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 disabled:opacity-50 dark:border-zinc-800 dark:text-zinc-200"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages || state.status === "loading"}
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 disabled:opacity-50 dark:border-zinc-800 dark:text-zinc-200"
        >
          Next
        </button>
        <button
          type="button"
          onClick={() => void load()}
          disabled={state.status === "loading"}
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 disabled:opacity-50 dark:border-zinc-800 dark:text-zinc-200"
        >
          Reload
        </button>

        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Page <span className="font-medium">{page}</span> / <span className="font-medium">{totalPages}</span>
        </p>
      </div>

      {state.status === "error" ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-100">
          <p className="text-sm font-semibold">Request failed</p>
          <p className="mt-2 text-xs opacity-80">{state.error}</p>
        </div>
      ) : null}

      {state.status === "loading" ? (
        <div className="rounded-xl border border-zinc-200 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          Loading…
        </div>
      ) : null}

      {state.status === "success" ? (
        <ul className="grid gap-3 sm:grid-cols-2">
          {state.data.cards.map((c) => (
            <li key={c.id} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{c.title}</p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{c.price}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}


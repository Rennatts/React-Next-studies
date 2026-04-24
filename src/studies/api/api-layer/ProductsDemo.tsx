"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { requestJson } from "./apiClient";
import type { GetProductsResponse, Product } from "./types";

type State =
  | { status: "idle" | "loading"; products: Product[]; error: null }
  | { status: "success"; products: Product[]; error: null }
  | { status: "error"; products: Product[]; error: string };

export function ProductsDemo() {
  const [state, setState] = useState<State>({
    status: "idle",
    products: [],
    error: null,
  });
  const [failMode, setFailMode] = useState<"never" | "sometimes">("never");

  const endpoint = useMemo(() => {
    const base = "/api/studies/products";
    return failMode === "sometimes" ? `${base}?fail=1` : base;
  }, [failMode]);

  const load = useCallback(async () => {
    const controller = new AbortController();
    setState((s) => ({ ...s, status: "loading", error: null }));
    try {
      const data = await requestJson<GetProductsResponse>(endpoint, {
        signal: controller.signal,
      });
      setState({ status: "success", products: data.products, error: null });
    } catch (e) {
      setState((s) => ({
        status: "error",
        products: s.products,
        error: e instanceof Error ? e.message : "Unknown error",
      }));
    }
    return () => controller.abort();
  }, [endpoint]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          API studies
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Products are loaded through a small API client wrapper (
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            requestJson&lt;T&gt;
          </code>
          ) which normalizes JSON + errors.
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
          onClick={() => void load()}
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
        >
          Reload
        </button>

        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Status: <span className="font-medium">{state.status}</span>
        </p>
      </div>

      {state.error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-100">
          <p className="text-sm font-semibold">Request failed</p>
          <p className="mt-2 text-xs opacity-80">{state.error}</p>
        </div>
      ) : null}

      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Products
        </p>
        <ul className="mt-3 space-y-2">
          {state.products.map((p) => (
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
          {state.products.length === 0 ? (
            <li className="text-sm text-zinc-600 dark:text-zinc-400">
              No products yet.
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}


import type { Product } from "./types";

export type ProductListViewProps = {
  products: Product[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
};

/**
 * Presentational component: no fetching, no module-level side effects.
 * Everything comes from props so you can snapshot-test or reuse the markup easily.
 */
export function ProductListView({
  products,
  loading,
  error,
  onRetry,
}: ProductListViewProps) {
  if (loading) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400" role="status">
        Loading products…
      </p>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-100">
        <p className="font-medium">Could not load products</p>
        <p className="mt-1 opacity-90">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-md bg-red-900 px-3 py-1.5 text-white text-xs font-medium hover:bg-red-800 dark:bg-red-200 dark:text-red-950 dark:hover:bg-red-100"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
      {products.map((p) => (
        <li
          key={p.id}
          className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
        >
          <span className="font-medium text-zinc-900 dark:text-zinc-50">
            {p.name}
          </span>
          <span className="tabular-nums text-zinc-600 dark:text-zinc-400">
            {p.priceLabel}
          </span>
        </li>
      ))}
    </ul>
  );
}

"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-6 px-6 py-12">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Advanced concepts
      </p>
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/40 dark:bg-rose-950/40">
        <p className="text-sm font-semibold text-rose-900 dark:text-rose-100">
          Route error boundary
        </p>
        <p className="mt-2 text-xs text-rose-800/80 dark:text-rose-200/80">
          {error.message}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-3 rounded-md bg-rose-600 px-3 py-2 text-xs font-medium text-white hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600"
        >
          Retry
        </button>
      </div>
    </div>
  );
}


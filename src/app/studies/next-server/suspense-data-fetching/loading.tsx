export default function SuspenseDataFetchingLoading() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-12">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Next.js (server)
      </p>
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Route loading UI (<code className="font-mono text-xs">loading.tsx</code>)
        </p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Shown immediately on navigation to this segment while the server prepares the page shell.
        </p>
        <div className="mt-4 h-24 animate-pulse rounded-lg bg-zinc-200/80 dark:bg-zinc-800/80" />
      </div>
    </div>
  );
}

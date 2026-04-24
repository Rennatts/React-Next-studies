export default function Loading() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-6 px-6 py-12">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Advanced concepts
      </p>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Loading route segment…
        </p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          This UI comes from <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">loading.tsx</code>.
        </p>
      </div>
    </div>
  );
}


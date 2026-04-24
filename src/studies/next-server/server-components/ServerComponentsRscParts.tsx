/**
 * Server Components only (no "use client"). Imported from the App Router study page.
 */

type PlaceholderUser = { id: number; name: string; email: string };

/** Values here are computed on the server for each request (see page `dynamic`). */
export async function ServerRenderedClock() {
  const iso = new Date().toISOString();
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm dark:border-zinc-700 dark:bg-zinc-900/40">
      <p className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">Server-rendered clock</p>
      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
        <code className="rounded bg-white px-1 dark:bg-zinc-950">{iso}</code> — refresh the page; this updates when the
        server handles the request (not a client timer).
      </p>
    </div>
  );
}

export async function ServerFetchedUserLine() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1", {
    next: { revalidate: 120 },
  });

  if (!res.ok) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
        Demo fetch failed ({res.status}).
      </div>
    );
  }

  const user = (await res.json()) as PlaceholderUser;

  return (
    <div className="rounded-lg border border-sky-200 bg-sky-50/90 p-3 text-sm text-sky-950 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-100">
      <p className="font-mono text-xs font-semibold">Server fetch (JSONPlaceholder)</p>
      <p className="mt-1">
        <span className="font-medium">{user.name}</span>{" "}
        <span className="text-xs text-sky-800/90 dark:text-sky-200/90">({user.email})</span>
      </p>
    </div>
  );
}

/**
 * Async **Server Component** (no `"use client"`): runs only on the server, can `await fetch`, and
 * ships HTML to the client without this logic in the JS bundle. See `README.md` in this folder.
 *
 * `next: { revalidate: 60 }` is **ISR-style**: data may be served from cache and re-fetched at most
 * once per 60 seconds on the server (behavior depends on deployment and route static/dynamic).
 */
type DemoPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export async function ServerSideRscFetchDemo() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
        Demo fetch failed ({res.status}). Check network or try again later.
      </div>
    );
  }

  const post = (await res.json()) as DemoPost;

  return (
    <section
      aria-labelledby="rsc-demo-heading"
      className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/40"
    >
      <h2
        id="rsc-demo-heading"
        className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
      >
        Live: async Server Component + <code className="font-mono text-xs">fetch</code>
      </h2>
      <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
        Data loaded on the server from JSONPlaceholder (public demo API). This component is not a
        Client Component—inspect the network tab: the JSON is not fetched again in the browser for
        this render path.
      </p>
      <dl className="mt-3 space-y-2 text-sm">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Title
          </dt>
          <dd className="font-medium text-zinc-900 dark:text-zinc-50">{post.title}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Body (excerpt)
          </dt>
          <dd className="line-clamp-3 text-zinc-700 dark:text-zinc-300">{post.body}</dd>
        </div>
      </dl>
    </section>
  );
}

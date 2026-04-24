/**
 * Async Server Components for Suspense / streaming demos (no "use client").
 * Imported from the App Router study page inside <Suspense> boundaries.
 */

import { Suspense } from "react";

async function sleep(ms: number) {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function StreamingSlot({ title, ms }: { title: string; ms: number }) {
  await sleep(ms);
  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50/90 p-3 text-sm text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100">
      <p className="font-mono text-xs font-semibold">{title}</p>
      <p className="mt-1 text-xs opacity-90">Resolved after ~{ms} ms (simulated slow work).</p>
    </div>
  );
}

type DemoPost = { id: number; title: string };

export async function StreamingJsonCard() {
  await sleep(900);
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/3", {
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
        Fetch failed ({res.status}).
      </div>
    );
  }
  const post = (await res.json()) as DemoPost;
  return (
    <div className="rounded-lg border border-sky-200 bg-sky-50/90 p-3 text-sm text-sky-950 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-100">
      <p className="font-mono text-xs font-semibold">JSONPlaceholder post #{post.id}</p>
      <p className="mt-1 font-medium">{post.title}</p>
    </div>
  );
}

async function InnerSlow() {
  await sleep(1800);
  return (
    <p className="rounded-md border border-violet-200 bg-violet-50 px-3 py-2 text-sm text-violet-950 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-100">
      Inner boundary resolved (another <code className="font-mono text-xs">await</code> completed).
    </p>
  );
}

/** Outer async shell resolves first; inner content streams behind a nested Suspense. */
export async function OuterWithNestedSuspense() {
  await sleep(500);
  return (
    <div className="space-y-3 rounded-lg border border-violet-200 bg-white p-3 dark:border-violet-900 dark:bg-zinc-900">
      <p className="text-sm font-medium text-violet-900 dark:text-violet-100">Outer async RSC ready.</p>
      <Suspense
        fallback={
          <div
            className="animate-pulse rounded-md border border-violet-100 bg-violet-50/50 px-3 py-6 text-center text-xs text-violet-700 dark:border-violet-900 dark:bg-violet-950/20 dark:text-violet-300"
            role="status"
          >
            Nested fallback: inner still loading…
          </div>
        }
      >
        <InnerSlow />
      </Suspense>
    </div>
  );
}

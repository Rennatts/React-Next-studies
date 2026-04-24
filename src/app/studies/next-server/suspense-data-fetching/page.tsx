import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SuspenseDataFetchingExamples } from "@/studies/next-server/suspense-data-fetching/SuspenseDataFetchingExamples";
import {
  OuterWithNestedSuspense,
  StreamingJsonCard,
  StreamingSlot,
} from "@/studies/next-server/suspense-data-fetching/SuspenseRscStreamingParts";

export const metadata: Metadata = {
  title: "Study: Suspense for data fetching (Next.js)",
  description:
    "Streaming UI with Suspense, async Server Components, parallel boundaries, loading.tsx, and App Router patterns.",
};

/** Per-request rendering so simulated delays and fetch run at navigation time. */
export const dynamic = "force-dynamic";

function StreamFallback({ label }: { label: string }) {
  return (
    <div
      className="animate-pulse rounded-lg border border-zinc-200 bg-zinc-100/80 px-3 py-6 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400"
      role="status"
    >
      {label}
    </div>
  );
}

export default function SuspenseDataFetchingStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Next.js (server)
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Suspense for data fetching
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/next-server/suspense-data-fetching/README.md
          </code>
          . Server streaming parts:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            SuspenseRscStreamingParts.tsx
          </code>
          . Snippets:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            SuspenseDataFetchingExamples.tsx
          </code>
          .
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/next-server"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Next server overview
          </Link>
          <Link
            href="/"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Study index
          </Link>
        </div>
      </header>

      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        Below, each <strong className="text-zinc-900 dark:text-zinc-50">fallback</strong> should appear first, then
        content streams in. Open DevTools → Network and reload: HTML arrives in chunks while async work runs on the
        server. This route uses <code className="font-mono text-xs">loading.tsx</code> for instant navigation feedback.
      </p>

      <section aria-labelledby="parallel-heading" className="space-y-3">
        <h2 id="parallel-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Parallel Suspense boundaries
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Suspense fallback={<StreamFallback label="Loading slot A (~1.2s)…" />}>
            <StreamingSlot title="Slot A" ms={1200} />
          </Suspense>
          <Suspense fallback={<StreamFallback label="Loading slot B (~1.8s)…" />}>
            <StreamingSlot title="Slot B" ms={1800} />
          </Suspense>
        </div>
      </section>

      <section aria-labelledby="fetch-heading" className="space-y-3">
        <h2 id="fetch-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Suspense + async fetch (RSC)
        </h2>
        <Suspense fallback={<StreamFallback label="Fetching JSONPlaceholder…" />}>
          <StreamingJsonCard />
        </Suspense>
      </section>

      <section aria-labelledby="nested-heading" className="space-y-3">
        <h2 id="nested-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Nested Suspense (outer async, then inner)
        </h2>
        <Suspense fallback={<StreamFallback label="Loading outer shell…" />}>
          <OuterWithNestedSuspense />
        </Suspense>
      </section>

      <section aria-labelledby="snippets-heading" className="space-y-3">
        <h2 id="snippets-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Patterns (code only)
        </h2>
        <SuspenseDataFetchingExamples />
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { LazyWidgets } from "@/studies/performance-optimization/code-splitting-lazy-loading/LazyWidgets";

export const metadata: Metadata = {
  title: "Study: Code splitting and lazy loading",
  description:
    "Performance optimization: splitting bundles and lazy-loading heavy UI with next/dynamic and React.lazy.",
};

export default function CodeSplittingLazyLoadingStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Performance optimization
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Code splitting and lazy loading
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Ship smaller bundles by splitting code and loading heavy UI on demand. Read the
          topic notes in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/performance-optimization/code-splitting-lazy-loading/README.md
          </code>
          .
        </p>
        <Link
          href="/"
          className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
        >
          ← Back to study index
        </Link>
      </header>

      <section aria-labelledby="demo-heading" className="space-y-3">
        <h2
          id="demo-heading"
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Live example
        </h2>
        <LazyWidgets />
      </section>
    </div>
  );
}

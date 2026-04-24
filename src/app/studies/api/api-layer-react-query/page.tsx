import type { Metadata } from "next";
import Link from "next/link";
import { ReactQueryProductsDemo } from "@/studies/api/api-layer-react-query/ReactQueryProductsDemo";

export const metadata: Metadata = {
  title: "Study: API layer with React Query",
  description:
    "API studies: using TanStack Query (React Query) on top of a typed API client for caching and async states.",
};

export default function ApiLayerReactQueryStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          API studies
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          API layer with React Query
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          React Query adds caching and async state management on top of your API client.
          Read the topic notes in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/api/api-layer-react-query/README.md
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
        <ReactQueryProductsDemo />
      </section>
    </div>
  );
}


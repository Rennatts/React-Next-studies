import type { Metadata } from "next";
import Link from "next/link";
import { FileBasedRoutingExamples } from "@/studies/next-server/file-based-routing/FileBasedRoutingExamples";

export const metadata: Metadata = {
  title: "Study: Next.js file-based routing (App Router)",
  description:
    "How app/ folders map to URLs, special files (page, layout, loading, error, route), dynamic segments, and route groups.",
};

export default function FileBasedRoutingStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Next.js — platform
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          File-based routing
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/next-server/file-based-routing/README.md
          </code>
          . Examples:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            FileBasedRoutingExamples.tsx
          </code>
          . This study is <strong className="text-zinc-800 dark:text-zinc-200">Next-specific</strong> (App Router
          conventions).
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/next-server"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Next server overview
          </Link>
          <Link
            href="/studies/advanced-concepts/async-react-router"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Async App Router study →
          </Link>
          <Link
            href="/"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Study index
          </Link>
        </div>
      </header>

      <article className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          In the <strong className="text-zinc-900 dark:text-zinc-100">App Router</strong>, the filesystem under{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-900">app/</code> is the
          source of truth for URLs. Special filenames (<code className="font-mono text-xs">page</code>,{" "}
          <code className="font-mono text-xs">layout</code>, <code className="font-mono text-xs">route</code>, etc.)
          tell Next what to run for each segment.
        </p>
        <p>
          A real route in this repo:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-900">
            src/app/studies/next-server/file-based-routing/page.tsx
          </code>{" "}
          →{" "}
          <Link className="font-mono text-xs underline underline-offset-4" href="/studies/next-server/file-based-routing">
            /studies/next-server/file-based-routing
          </Link>
          .
        </p>
      </article>

      <section aria-labelledby="patterns-heading" className="space-y-3">
        <h2 id="patterns-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Patterns (code only)
        </h2>
        <FileBasedRoutingExamples />
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: Next.js — server",
  description:
    "Overview of Next.js server-side topics in this repo: App Router, Server Components, caching, and server-side data flow.",
};

export default function NextServerOverviewPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Next.js (server)
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Server-side studies
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Canonical notes live under{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/next-server/
          </code>
          . Start with the App Router server model below.
        </p>
        <Link
          href="/"
          className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
        >
          ← Back to study index
        </Link>
      </header>

      <section aria-labelledby="topics-heading" className="space-y-3">
        <h2
          id="topics-heading"
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Topics
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/studies/next-server/server-side"
              className="block rounded-xl border border-zinc-200 p-4 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/40"
            >
              Server-side in the App Router →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nested demo — layouts study",
  description: "Child route demonstrating a second layout.tsx nested inside the layouts study segment.",
};

export default function NestedDemoPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Next.js — platform / layouts study
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Nested-demo page
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          URL:{" "}
          <code className="rounded bg-zinc-100 px-1 font-mono text-xs dark:bg-zinc-900">
            /studies/next-server/layouts-and-nested-layouts/nested-demo
          </code>
        </p>
      </header>
      <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        You should see <strong className="text-sky-800 dark:text-sky-200">sky</strong> (segment layout) and{" "}
        <strong className="text-amber-800 dark:text-amber-200">amber</strong> (this nested layout) above this
        content. Navigating back to the study index keeps the sky strip but removes amber—only one layout level.
      </p>
      <Link
        href="/studies/next-server/layouts-and-nested-layouts"
        className="inline-flex w-fit text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
      >
        ← Back to layouts study index
      </Link>
    </div>
  );
}

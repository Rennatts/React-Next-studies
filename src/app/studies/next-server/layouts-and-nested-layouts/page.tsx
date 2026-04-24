import type { Metadata } from "next";
import Link from "next/link";
import { LayoutsNestedLayoutsExamples } from "@/studies/next-server/layouts-and-nested-layouts/LayoutsNestedLayoutsExamples";

export const metadata: Metadata = {
  title: "Study: Next.js layouts and nested layouts",
  description:
    "App Router layout.tsx nesting, shared chrome, {children}, and a live nested-demo route under this segment.",
};

export default function LayoutsStudyIndexPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Next.js — platform
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Layouts and nested layouts
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/next-server/layouts-and-nested-layouts/README.md
          </code>
          . Snippets:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            LayoutsNestedLayoutsExamples.tsx
          </code>
          . The <strong className="text-zinc-800 dark:text-zinc-200">sky</strong> strip is this segment’s{" "}
          <code className="font-mono text-xs">layout.tsx</code>; visit nested-demo for a second strip.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/next-server/layouts-and-nested-layouts/nested-demo"
            className="inline-flex rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Open nested-demo route →
          </Link>
          <Link
            href="/studies/next-server/file-based-routing"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            File-based routing
          </Link>
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

      <article className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          Each <code className="rounded bg-zinc-100 px-1 font-mono text-xs dark:bg-zinc-900">layout.tsx</code> wraps{" "}
          <code className="rounded bg-zinc-100 px-1 font-mono text-xs dark:bg-zinc-900">{"{children}"}</code> with UI
          that should survive navigations to deeper URLs in the same subtree. Nested layouts add **inner** shells
          without removing the **outer** ones.
        </p>
      </article>

      <section aria-labelledby="patterns-heading" className="space-y-3">
        <h2 id="patterns-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Patterns (code only)
        </h2>
        <LayoutsNestedLayoutsExamples />
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { FontOptimizationDemo } from "@/studies/performance-optimization/font-optimization/FontOptimizationDemo";

export const metadata: Metadata = {
  title: "Study: Font optimization (next/font)",
  description:
    "next/font: self-hosted Google and local fonts, display swap, subsets, variables, route-scoped layout, and CLS fallbacks.",
};

export default function FontOptimizationStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Performance optimization
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Font optimization (next/font)
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/performance-optimization/font-optimization/README.md
          </code>
          . This route wraps content in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">layout.tsx</code> with{" "}
          <strong className="text-zinc-800 dark:text-zinc-200">Lora</strong> via{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">next/font/google</code>.
        </p>
        <Link
          href="/"
          className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
        >
          ← Back to study index
        </Link>
      </header>

      <article className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          The headings and paragraphs on this page use <strong className="text-zinc-900 dark:text-zinc-100">Lora</strong>{" "}
          from the segment layout so you can compare against the default typography on other study pages. Open{" "}
          <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-900">layout.tsx</code> in this folder to see{" "}
          <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-900">display: &quot;swap&quot;</code> and{" "}
          <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-900">subsets: [&quot;latin&quot;]</code>.
        </p>
      </article>

      <section aria-labelledby="demo-heading" className="space-y-3">
        <h2 id="demo-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Second font on the same page
        </h2>
        <FontOptimizationDemo />
      </section>
    </div>
  );
}

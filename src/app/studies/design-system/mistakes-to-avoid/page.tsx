import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: Design system — mistakes to avoid",
  description:
    "Common anti-patterns: building for hypothetical scale first, training without artifacts, skipping workflow and decision docs, Figma/code drift, skipping tokens, weak ownership.",
};

export default function DesignSystemMistakesPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Design system
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Mistakes to avoid
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Full notes in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/design-system/mistakes-to-avoid/README.md
          </code>
          .
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/design-system"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Overview
          </Link>
          <Link
            href="/studies/design-system/downsides"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Downsides
          </Link>
          <Link
            href="/studies/design-system/core-principles"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Core principles
          </Link>
          <Link
            href="/"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Study index
          </Link>
        </div>
      </header>

      <article className="space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          Ten recurring pitfalls—<strong className="text-zinc-900 dark:text-zinc-100">over-building</strong> before
          adoption, <strong className="text-zinc-900 dark:text-zinc-100">training without artifacts</strong>, ignoring{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">workflow</strong> and{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">decision records</strong>, perfectionism that blocks ship,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">Figma/code drift</strong>, skipping{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">tokens</strong>, unclear ownership, vanity metrics, and
          copy-pasting another org’s system without fitting process—each with a short “better” countermove in the README.
        </p>
      </article>
    </div>
  );
}

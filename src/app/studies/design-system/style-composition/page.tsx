import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: Design system — style composition",
  description:
    "Compose design-system styles: cascade layers, token stacks, Tailwind recipes, variant maps, slots—without breaking encapsulation.",
};

export default function StyleCompositionPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Design system
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Style composition
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Full notes in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/design-system/style-composition/README.md
          </code>
          . Builds on encapsulation and reuse in{" "}
          <Link
            href="/studies/design-system/reusability-and-styles"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Reusability and encapsulating styles
          </Link>
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
            href="/studies/design-system/reusability-and-styles"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Encapsulation & reuse
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
          Composition stacks <strong className="text-zinc-900 dark:text-zinc-100">tokens</strong>,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">layers</strong>,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">utilities or recipes</strong>, and{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">component variants</strong> in a documented order.
          The README contrasts good token composition with one-off literals, describes slot-based style boundaries, and
          lists anti-patterns like deep selectors from pages into library internals.
        </p>
      </article>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: Design system — key concepts",
  description:
    "Foundations, design tokens, components vs patterns, documentation, theming, versioning, accessibility, and governance—in one vocabulary map.",
};

export default function DesignSystemKeyConceptsPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Design system
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Key concepts
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Full notes in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/design-system/key-concepts/README.md
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
            href="/studies/design-system/core-principles"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Core principles
          </Link>
          <Link
            href="/studies/design-system/button-example"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Button example
          </Link>
          <Link
            href="/"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Study index
          </Link>
        </div>
      </header>

      <article className="space-y-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          Mature systems revolve around <strong className="text-zinc-900 dark:text-zinc-100">foundations</strong>{" "}
          feeding <strong className="text-zinc-900 dark:text-zinc-100">tokens</strong>, tokens feeding{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">components</strong>, and components composing into{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">patterns</strong>—all explained in{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">documentation</strong> and evolved with{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">versioning</strong>,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">theming</strong>,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">accessibility</strong>, and light{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">governance</strong>.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Tokens</strong> separate intent
            (semantic) from raw scale (primitive) so themes and brands can swap without renaming every
            component prop.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Patterns</strong> sit above
            primitives: they document flows and content, not only a single widget API.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Docs</strong> are the delivery
            channel—search, examples, and migrations matter as much as the code package.
          </li>
        </ul>
      </article>
    </div>
  );
}

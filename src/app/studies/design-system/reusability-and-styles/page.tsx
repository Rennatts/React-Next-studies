import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: Reusability and encapsulating styles",
  description:
    "Design system angle: reusable primitives, stable APIs, scoped CSS (Modules, Tailwind layers), tokens as decisions, and avoiding style leakage.",
};

export default function ReusabilityAndStylesPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Design system
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Reusability and encapsulating styles
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Full notes in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/design-system/reusability-and-styles/README.md
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
            href="/studies/design-system/key-concepts"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Key concepts
          </Link>
          <Link
            href="/studies/design-patterns/composition-components"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Composition pattern
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
          Reuse ships consistency through a <strong className="text-zinc-900 dark:text-zinc-100">stable component API</strong>
          ; encapsulation keeps <strong className="text-zinc-900 dark:text-zinc-100">styles and DOM details private</strong>{" "}
          so parents do not depend on children’s internals. Tokens encapsulate{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">design decisions</strong> so themes change without
          hunting raw values. The README compares CSS Modules, utilities, CSS-in-JS, and Shadow DOM at a high level and
          lists common leakage anti-patterns.
        </p>
      </article>
    </div>
  );
}

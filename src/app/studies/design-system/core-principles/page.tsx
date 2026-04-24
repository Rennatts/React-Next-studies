import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: Design system — core principles",
  description:
    "Foundational principles for design systems: single source of truth, consistency, accessibility, composability, and living evolution.",
};

export default function DesignSystemCorePrinciplesPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Design system
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Core principles
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Full notes in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/design-system/core-principles/README.md
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
            href="/studies/design-system/importance"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Why it matters
          </Link>
          <Link
            href="/studies/design-system/downsides"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Downsides
          </Link>
          <Link
            href="/studies/design-system/mistakes-to-avoid"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Mistakes
          </Link>
          <Link
            href="/studies/design-system/key-concepts"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Key concepts
          </Link>
          <Link
            href="/studies/design-system/reusability-and-styles"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Reuse & styles
          </Link>
          <Link
            href="/studies/design-system/audience"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Audience
          </Link>
          <Link
            href="/studies/design-system/team-structure"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Team structure
          </Link>
          <Link
            href="/"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Study index
          </Link>
        </div>
      </header>

      <ol className="list-decimal space-y-4 pl-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <li>
          <strong className="text-zinc-900 dark:text-zinc-100">Single source of truth</strong> —
          tokens and decisions live once and flow to tools and code.
        </li>
        <li>
          <strong className="text-zinc-900 dark:text-zinc-100">Consistency over novelty</strong> —
          reuse documented primitives unless differentiation truly matters.
        </li>
        <li>
          <strong className="text-zinc-900 dark:text-zinc-100">Accessibility is non-negotiable</strong>{" "}
          — keyboard, focus, contrast, and states are part of the default bar.
        </li>
        <li>
          <strong className="text-zinc-900 dark:text-zinc-100">Clarity and restraint</strong> — a
          smaller, navigable catalog beats an unbounded grab bag.
        </li>
        <li>
          <strong className="text-zinc-900 dark:text-zinc-100">Composability</strong> — primitives
          combine predictably into product UI.
        </li>
        <li>
          <strong className="text-zinc-900 dark:text-zinc-100">Scalability of process</strong> —
          naming, versioning, migrations, and ownership support many contributors.
        </li>
        <li>
          <strong className="text-zinc-900 dark:text-zinc-100">Documentation as product</strong> —
          examples and rationale are how the system ships.
        </li>
        <li>
          <strong className="text-zinc-900 dark:text-zinc-100">Brand and content alignment</strong> —
          visual language reinforces strategy and voice.
        </li>
        <li>
          <strong className="text-zinc-900 dark:text-zinc-100">Performance awareness</strong> —
          defaults stay lean on real devices and networks.
        </li>
        <li>
          <strong className="text-zinc-900 dark:text-zinc-100">Living evolution</strong> —
          deprecation and communication keep the system relevant.
        </li>
      </ol>

      <p className="flex flex-wrap gap-x-4 gap-y-2">
        <Link
          href="/studies/design-system/mistakes-to-avoid"
          className="text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
        >
          Mistakes to avoid →
        </Link>
        <Link
          href="/studies/design-system/key-concepts"
          className="text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
        >
          Key concepts →
        </Link>
        <Link
          href="/studies/design-system/audience"
          className="text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
        >
          Audience →
        </Link>
        <Link
          href="/studies/design-system/team-structure"
          className="text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
        >
          Team structure →
        </Link>
      </p>
    </div>
  );
}

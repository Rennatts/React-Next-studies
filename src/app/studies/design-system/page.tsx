import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: Design system — overview",
  description:
    "What a design system is: foundations, tokens, components, patterns, documentation, and why teams invest in one.",
};

export default function DesignSystemOverviewPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Design system
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          What is a design system?
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Canonical notes live in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/design-system/README.md
          </code>
          . This page summarizes the idea; follow the links below for related notes.
        </p>
        <Link
          href="/"
          className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
        >
          ← Back to study index
        </Link>
      </header>

      <article className="space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          A <strong className="text-zinc-900 dark:text-zinc-100">design system</strong> is a shared,
          versioned toolkit: visual foundations, tokens, UI components, usage patterns, and the
          documentation and process that keep design and engineering aligned at scale.
        </p>
        <p>
          It is more than a component library or a Figma kit alone—the value is the{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">contract</strong> between how
          interfaces should look and behave and how teams{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">ship and maintain</strong> that
          experience together.
        </p>
        <p>
          Typical layers include foundations (color, type, space, motion),{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">design tokens</strong> as named
          decisions, documented <strong className="text-zinc-900 dark:text-zinc-100">components</strong>{" "}
          with accessibility baselines, <strong className="text-zinc-900 dark:text-zinc-100">patterns</strong>{" "}
          for common flows, and governance for contribution and releases.
        </p>
        <p>
          For a structured tour of that vocabulary, see{" "}
          <Link
            href="/studies/design-system/key-concepts"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Key concepts of design systems
          </Link>
          . For how <strong className="text-zinc-900 dark:text-zinc-100">reuse</strong> pairs with{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">scoped styles</strong>, see{" "}
          <Link
            href="/studies/design-system/reusability-and-styles"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            reusability and encapsulating styles
          </Link>
          ; for <strong className="text-zinc-900 dark:text-zinc-100">composing</strong> layers, tokens, and variants, see{" "}
          <Link
            href="/studies/design-system/style-composition"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            style composition
          </Link>
          . For <strong className="text-zinc-900 dark:text-zinc-100">spacing</strong>—layered roles,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">split</strong> toolbars/rows,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">column</strong> gutters,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">grid</strong> (2D layout rhythm),{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">inline</strong> (line-box), and{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">inline-bundle</strong> clusters,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">pad</strong> (inset),{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">center</strong> (measure),{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">media-wrapper</strong> (img/video frames),{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">cover</strong> (viewport shell)—see{" "}
          <Link
            href="/studies/design-system/spacing-patterns"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            spacing patterns
          </Link>
          .
        </p>
      </article>

      <section aria-labelledby="next-heading" className="space-y-3">
        <h2
          id="next-heading"
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Continue
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/studies/design-system/importance"
              className="block rounded-xl border border-zinc-200 p-4 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/40"
            >
              Why a design system matters →
            </Link>
          </li>
          <li>
            <Link
              href="/studies/design-system/downsides"
              className="block rounded-xl border border-zinc-200 p-4 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/40"
            >
              Downsides and trade-offs →
            </Link>
          </li>
          <li>
            <Link
              href="/studies/design-system/mistakes-to-avoid"
              className="block rounded-xl border border-zinc-200 p-4 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/40"
            >
              Mistakes to avoid →
            </Link>
          </li>
          <li>
            <Link
              href="/studies/design-system/core-principles"
              className="block rounded-xl border border-zinc-200 p-4 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/40"
            >
              Core principles →
            </Link>
          </li>
          <li>
            <Link
              href="/studies/design-system/key-concepts"
              className="block rounded-xl border border-zinc-200 p-4 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/40"
            >
              Key concepts →
            </Link>
          </li>
          <li>
            <Link
              href="/studies/design-system/reusability-and-styles"
              className="block rounded-xl border border-zinc-200 p-4 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/40"
            >
              Reusability and encapsulating styles →
            </Link>
          </li>
          <li>
            <Link
              href="/studies/design-system/style-composition"
              className="block rounded-xl border border-zinc-200 p-4 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/40"
            >
              Style composition →
            </Link>
          </li>
          <li>
            <Link
              href="/studies/design-system/spacing-patterns"
              className="block rounded-xl border border-zinc-200 p-4 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/40"
            >
              Spacing patterns →
            </Link>
          </li>
          <li>
            <Link
              href="/studies/design-system/audience"
              className="block rounded-xl border border-zinc-200 p-4 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/40"
            >
              Audience →
            </Link>
          </li>
          <li>
            <Link
              href="/studies/design-system/design-phase-checklist"
              className="block rounded-xl border border-zinc-200 p-4 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/40"
            >
              Design phase checklist →
            </Link>
          </li>
          <li>
            <Link
              href="/studies/design-system/development-checklist"
              className="block rounded-xl border border-zinc-200 p-4 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/40"
            >
              Development checklist →
            </Link>
          </li>
          <li>
            <Link
              href="/studies/design-system/button-example"
              className="block rounded-xl border border-zinc-200 p-4 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/40"
            >
              Example: Button documentation →
            </Link>
          </li>
          <li>
            <Link
              href="/studies/design-system/team-structure"
              className="block rounded-xl border border-zinc-200 p-4 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/40"
            >
              Team structure →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: Design system — why it matters",
  description:
    "Why invest in a design system: user trust, velocity, brand, accessibility, lower cost of change, and the cost of not having one.",
};

export default function DesignSystemImportancePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Design system
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Why a design system matters
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Full notes in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/design-system/importance/README.md
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
            href="/"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Study index
          </Link>
        </div>
      </header>

      <article className="space-y-6 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section className="space-y-2" aria-labelledby="users-heading">
          <h2 id="users-heading" className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Users and customers
          </h2>
          <p>
            Consistent patterns make products easier to learn and trust. Accessible defaults in
            shared components raise the floor for every flow—not only the ones that get specialist
            review.
          </p>
        </section>

        <section className="space-y-2" aria-labelledby="business-heading">
          <h2 id="business-heading" className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Product and business
          </h2>
          <p>
            Reuse speeds shipping; tokens encode brand so surfaces stay aligned. Global changes
            (rebrand, themes, platform tweaks) cost less when decisions live in one system instead of
            scattered implementations.
          </p>
        </section>

        <section className="space-y-2" aria-labelledby="teams-heading">
          <h2 id="teams-heading" className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Design and engineering
          </h2>
          <p>
            A shared vocabulary shortens reviews and handoff. Fixes and a11y improvements to system
            components multiply across consumers; onboarding improves when there is a canonical
            catalog and contribution path.
          </p>
        </section>

        <section className="space-y-2" aria-labelledby="cost-heading">
          <h2 id="cost-heading" className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Cost of not having one
          </h2>
          <p>
            Teams still ship—but often duplicate widgets, diverge on details, and pay more for
            maintenance and refactors. A system channels effort toward product-specific problems
            instead of reinventing primitives.
          </p>
        </section>

        <p className="flex flex-wrap gap-x-4 gap-y-2">
          <Link
            href="/studies/design-system/downsides"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Downsides and trade-offs →
          </Link>
          <Link
            href="/studies/design-system/mistakes-to-avoid"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Mistakes to avoid →
          </Link>
          <Link
            href="/studies/design-system/core-principles"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Core principles →
          </Link>
          <Link
            href="/studies/design-system/key-concepts"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Key concepts →
          </Link>
          <Link
            href="/studies/design-system/audience"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Audience →
          </Link>
          <Link
            href="/studies/design-system/team-structure"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Team structure →
          </Link>
        </p>
      </article>
    </div>
  );
}

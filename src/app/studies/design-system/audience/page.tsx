import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: Design system — audience",
  description:
    "Who design systems serve: designers, engineers, content and a11y, PMs, QA, leadership, and end users—plus how to structure docs for each.",
};

export default function DesignSystemAudiencePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Design system
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Audience
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Full notes in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/design-system/audience/README.md
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
            href="/studies/design-system/design-phase-checklist"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Design checklist
          </Link>
          <Link
            href="/studies/design-system/development-checklist"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Dev checklist
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

      <article className="space-y-6 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          The design system’s <strong className="text-zinc-900 dark:text-zinc-100">audience</strong>{" "}
          includes designers and engineers who ship UI daily, adjacent roles (content, a11y, PM,
          QA), leadership judging outcomes, and{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">end users</strong> who benefit
          indirectly from consistency and accessible defaults. Docs and APIs should offer{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">role-based entry points</strong> and
          progressive depth—not only a single props wall.
        </p>

        <section className="space-y-2" aria-labelledby="primary-heading">
          <h2 id="primary-heading" className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Primary consumers
          </h2>
          <p>
            Product designers need libraries and usage rules; frontend (and often mobile) engineers
            need APIs, types, and migrations; content and accessibility roles need patterns and
            acceptance criteria wired to components.
          </p>
        </section>

        <section className="space-y-2" aria-labelledby="secondary-heading">
          <h2 id="secondary-heading" className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Stakeholders and end users
          </h2>
          <p>
            PMs and engineering leads care about fit, effort, and policy; QA about states and
            regressions; brand about alignment with campaigns. End users never read the docs site—but
            they are the reason the system exists.
          </p>
        </section>

        <p className="flex flex-wrap gap-x-4 gap-y-2">
          <Link
            href="/studies/design-system/key-concepts"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Key concepts →
          </Link>
          <Link
            href="/studies/design-system/core-principles"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Core principles →
          </Link>
        </p>
      </article>
    </div>
  );
}

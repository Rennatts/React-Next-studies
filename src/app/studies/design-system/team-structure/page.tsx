import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: Design system — team structure",
  description:
    "Who owns the design system: platform roles, extended guilds, centralized vs federated models, and how squads interact with the core team.",
};

export default function DesignSystemTeamStructurePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Design system
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Team structure
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Full notes in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/design-system/team-structure/README.md
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
            href="/studies/design-system/audience"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Audience
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
          A sustainable system pairs a <strong className="text-zinc-900 dark:text-zinc-100">small core team</strong>{" "}
          (design + engineering + product direction, often with accessibility input) with{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">contributors and guilds</strong> across
          product squads. Structure should match{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">centralized vs federated</strong> needs:
          one owner for strict consistency, or shared ownership of domain kits on top of shared
          primitives.
        </p>

        <section className="space-y-2" aria-labelledby="core-heading">
          <h2 id="core-heading" className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Core platform roles
          </h2>
          <p>
            Typical focus areas: roadmap and releases (lead/PM), tokens and component APIs (design
            technologist), implementation and quality (frontend), visual patterns (product design),
            inclusive defaults (accessibility).
          </p>
        </section>

        <section className="space-y-2" aria-labelledby="squads-heading">
          <h2 id="squads-heading" className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Working with product squads
          </h2>
          <p>
            Clear intake, office hours or pairing, and realistic review SLAs reduce bottlenecks and
            “shadow” libraries built out of frustration.
          </p>
        </section>

        <p className="flex flex-wrap gap-x-4 gap-y-2">
          <Link
            href="/studies/design-system/audience"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Audience →
          </Link>
          <Link
            href="/studies/design-system/downsides"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Downsides and trade-offs →
          </Link>
        </p>
      </article>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: Design system — downsides and trade-offs",
  description:
    "Honest trade-offs: cost of ownership, rigidity, adoption friction, upgrade tax, bottlenecks, and when a system may not pay off.",
};

export default function DesignSystemDownsidesPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Design system
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Downsides and trade-offs
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Full notes in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/design-system/downsides/README.md
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
            href="/studies/design-system/mistakes-to-avoid"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Mistakes to avoid
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

      <article className="space-y-6 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          Systems need ongoing ownership, can feel rigid when APIs miss real flows, and create
          migration and governance overhead. Central teams can bottleneck; without contribution paths,
          teams work around the library.
        </p>

        <section className="space-y-2" aria-labelledby="cost-heading">
          <h2 id="cost-heading" className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Cost and rigidity
          </h2>
          <p>
            Building and maintaining docs, tooling, and releases is real work. Strong defaults help
            consistency but can fight genuine product differentiation if the system has no escape
            hatches or evolves too slowly.
          </p>
        </section>

        <section className="space-y-2" aria-labelledby="adopt-heading">
          <h2 id="adopt-heading" className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Adoption and upgrades
          </h2>
          <p>
            Heavy process without value pushes teams local. Many dependents mean breaking changes
            need clear deprecation and migration—or you end up with parallel component generations.
          </p>
        </section>

        <section className="space-y-2" aria-labelledby="mitigate-heading">
          <h2 id="mitigate-heading" className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Mitigation
          </h2>
          <p>
            Start small, fund ownership, document exceptions, and treat contribution and versioning
            as first-class—without pretending trade-offs do not exist.
          </p>
        </section>

        <p className="flex flex-wrap gap-x-4 gap-y-2">
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

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: Design phase completion checklist",
  description:
    "Gate design before handoff: accessibility, interaction, context, completion, content, customization, resolution, system consistency, and performance awareness.",
};

export default function DesignPhaseChecklistPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Design system
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Design phase checklist
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Full checklist with explanations:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/design-system/design-phase-checklist/README.md
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

      <article className="space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          Nine dimensions—<strong className="text-zinc-900 dark:text-zinc-100">accessibility</strong>,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">interaction</strong>,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">context</strong>,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">completion</strong> (handoff readiness),{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">content</strong>,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">customization</strong>,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">resolution</strong> / responsive behavior,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">design-system consistency</strong>, and{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">performance awareness</strong>—each
          includes “what it is,” actionable checks, and why it matters before build.
        </p>
        <p className="flex flex-wrap gap-x-4 gap-y-2">
          <Link
            href="/studies/design-system/development-checklist"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Development checklist →
          </Link>
          <Link
            href="/studies/design-system/key-concepts"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Key concepts →
          </Link>
          <Link
            href="/studies/design-system/button-example"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Button example →
          </Link>
        </p>
      </article>
    </div>
  );
}

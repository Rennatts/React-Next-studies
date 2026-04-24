import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: Development completion checklist",
  description:
    "Pre-merge / pre-release gate: responsiveness, error handling, validation, browsers, a11y in code, performance, security, testing, i18n, observability.",
};

export default function DevelopmentChecklistPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Design system
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Development checklist
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Full checklist with explanations:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/design-system/development-checklist/README.md
          </code>
          . Pairs with the design-phase checklist before handoff.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/design-system"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Overview
          </Link>
          <Link
            href="/studies/design-system/design-phase-checklist"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Design checklist
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
          Ten engineering-focused areas—<strong className="text-zinc-900 dark:text-zinc-100">responsiveness</strong>,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">error handling</strong>,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">data validation</strong> (client + server),{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">browser compatibility</strong>,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">accessibility in code</strong>,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">performance</strong>,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">security basics</strong>,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">testing</strong>,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">i18n</strong>, and{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">observability / release</strong>—each with checks
          and rationale in the README.
        </p>
        <p className="flex flex-wrap gap-x-4 gap-y-2">
          <Link
            href="/studies/design-system/key-concepts"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Key concepts →
          </Link>
        </p>
      </article>
    </div>
  );
}

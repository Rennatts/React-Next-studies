import type { Metadata } from "next";
import Link from "next/link";
import { LiftingStateColocationExamples } from "@/studies/advanced-concepts/lifting-state-colocation-strategies/LiftingStateColocationExamples";

export const metadata: Metadata = {
  title: "Study: Lifting state up and colocation strategies",
  description:
    "When to keep state local, when to lift to a shared parent, and how state boundaries limit re-renders.",
};

export default function LiftingStateColocationStrategiesPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Advanced concepts
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Lifting state up and colocation strategies
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/advanced-concepts/lifting-state-colocation-strategies/README.md
          </code>
          . Examples:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            LiftingStateColocationExamples.tsx
          </code>
          . Deeper demos:{" "}
          <Link className="underline underline-offset-4" href="/studies/advanced-concepts/state-collocation">
            state collocation
          </Link>
          ,{" "}
          <Link className="underline underline-offset-4" href="/studies/advanced-concepts/lift-components-up">
            lift components up
          </Link>
          .
        </p>
        <Link
          href="/"
          className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
        >
          ← Back to study index
        </Link>
      </header>

      <section aria-labelledby="examples-heading" className="space-y-3">
        <h2 id="examples-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Examples (runnable)
        </h2>
        <LiftingStateColocationExamples />
      </section>
    </div>
  );
}

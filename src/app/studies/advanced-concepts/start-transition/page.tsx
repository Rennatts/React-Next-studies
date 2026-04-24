import type { Metadata } from "next";
import Link from "next/link";
import { StartTransitionExamples } from "@/studies/advanced-concepts/start-transition/StartTransitionExamples";
import { UseTransitionDemo } from "@/studies/advanced-concepts/use-transition/UseTransitionDemo";

export const metadata: Metadata = {
  title: "Study: startTransition",
  description:
    "Mark non-urgent React updates with startTransition and useTransition; batching, isPending, and tab-style switches.",
};

export default function StartTransitionStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Advanced concepts
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          startTransition
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/advanced-concepts/start-transition/README.md
          </code>
          . Examples:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            StartTransitionExamples.tsx
          </code>
          . Related study:{" "}
          <Link className="underline underline-offset-4" href="/studies/advanced-concepts/use-transition">
            useTransition
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
          Examples (code + runnable)
        </h2>
        <StartTransitionExamples />
      </section>

      <section aria-labelledby="stress-heading" className="space-y-3">
        <h2 id="stress-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Larger list demo (from useTransition study)
        </h2>
        <UseTransitionDemo />
      </section>
    </div>
  );
}

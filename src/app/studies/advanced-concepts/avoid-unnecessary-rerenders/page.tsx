import type { Metadata } from "next";
import Link from "next/link";
import { AvoidUnnecessaryRerendersDemo } from "@/studies/advanced-concepts/avoid-unnecessary-rerenders/AvoidUnnecessaryRerendersDemo";

export const metadata: Metadata = {
  title: "Study: Avoiding unnecessary re-renders",
  description:
    "React.memo, stable props vs inline objects, colocation mindset, and pointers to useMemo and useCallback studies.",
};

export default function AvoidUnnecessaryRerendersStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Advanced concepts
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Avoiding unnecessary re-renders
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Read{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/advanced-concepts/avoid-unnecessary-rerenders/README.md
          </code>
          . Complements{" "}
          <Link
            href="/studies/advanced-concepts/use-memo-avoid-rerenders"
            className="font-medium text-zinc-800 underline-offset-4 hover:underline dark:text-zinc-200"
          >
            useMemo and unnecessary work
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

      <section aria-labelledby="demo-heading" className="space-y-3">
        <h2 id="demo-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Live example
        </h2>
        <AvoidUnnecessaryRerendersDemo />
      </section>
    </div>
  );
}

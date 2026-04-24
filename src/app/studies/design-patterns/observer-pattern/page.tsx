import type { Metadata } from "next";
import Link from "next/link";
import { ObserverDemo } from "@/studies/design-patterns/observer-pattern/ObserverDemo";

export const metadata: Metadata = {
  title: "Study: Observer pattern",
  description:
    "Observer pattern (pub/sub) and how to subscribe in React using useSyncExternalStore.",
};

export default function ObserverPatternStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Design patterns
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Observer pattern
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          A subject notifies observers on changes. Read the topic notes in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/design-patterns/observer-pattern/README.md
          </code>
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
        <h2
          id="demo-heading"
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Live example
        </h2>
        <ObserverDemo />
      </section>
    </div>
  );
}


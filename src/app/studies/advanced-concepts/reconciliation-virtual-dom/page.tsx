import type { Metadata } from "next";
import Link from "next/link";
import { ReconciliationVirtualDomExamples } from "@/studies/advanced-concepts/reconciliation-virtual-dom/ReconciliationVirtualDomExamples";

export const metadata: Metadata = {
  title: "Study: Reconciliation and virtual DOM",
  description:
    "How React elements describe UI, how reconciliation reuses or remounts nodes, and why keys matter in lists.",
};

export default function ReconciliationVirtualDomStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Advanced concepts
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Reconciliation and virtual DOM
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/advanced-concepts/reconciliation-virtual-dom/README.md
          </code>
          . Examples:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            ReconciliationVirtualDomExamples.tsx
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

      <section aria-labelledby="examples-heading" className="space-y-3">
        <h2 id="examples-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Examples (runnable)
        </h2>
        <ReconciliationVirtualDomExamples />
      </section>
    </div>
  );
}

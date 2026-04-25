import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: Separation of concerns",
  description:
    "Project architecture: keep UI, data loading, domain rules, and side effects separated so changes stay local and code stays testable.",
};

export default function SeparationOfConcernsStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Project architecture
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Separation of concerns
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes live in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/project-architecture/separation-of-concerns/README.md
          </code>
          .
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/project-architecture/feature-vs-layer-structure"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Feature vs layer structure
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
          The fastest way to make a React app hard to change is to mix{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">rendering</strong>,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">data access</strong>,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">domain rules</strong>, and{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">side effects</strong> inside the same module.
        </p>
        <p>
          This study summarizes the most useful boundaries and gives “smells” you can use in code review to decide when
          to split.
        </p>
      </article>
    </div>
  );
}


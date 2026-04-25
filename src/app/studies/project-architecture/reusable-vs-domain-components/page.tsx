import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: Reusable vs domain components",
  description:
    "Project architecture: reusable (shared) UI primitives vs domain (feature) components; how to keep shared small and changes local.",
};

export default function ReusableVsDomainComponentsStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Project architecture
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Reusable components vs domain components
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes live in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/project-architecture/reusable-vs-domain-components/README.md
          </code>
          .
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/project-architecture/separation-of-concerns"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Separation of concerns
          </Link>
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
          Treat reusable UI as a small set of{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">primitives</strong> with stable APIs, and keep domain
          components inside their feature folders so they can evolve quickly without turning shared into a dumping
          ground.
        </p>
      </article>
    </div>
  );
}


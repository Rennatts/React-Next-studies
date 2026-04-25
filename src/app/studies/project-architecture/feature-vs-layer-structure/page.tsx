import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: Feature-based vs layer-based structure",
  description:
    "Project architecture basics: organize by technical layers or by product features; trade-offs and a practical hybrid for Next.js.",
};

export default function FeatureVsLayerStructureStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Project architecture
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Feature-based vs layer-based structure
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes live in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/project-architecture/feature-vs-layer-structure/README.md
          </code>
          .
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/next-server/file-based-routing"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            File-based routing study
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
          Use this as a navigation guide when your codebase grows: grouping by{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">layers</strong> is straightforward early, but grouping
          by <strong className="text-zinc-900 dark:text-zinc-100">features</strong> tends to keep changes local once
          multiple domains exist.
        </p>
        <p>
          The recommended default for many apps is a{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">hybrid</strong>: feature folders + a small shared area
          for true cross-cutting primitives. Keep route files thin and import “screens” from feature folders.
        </p>
      </article>
    </div>
  );
}


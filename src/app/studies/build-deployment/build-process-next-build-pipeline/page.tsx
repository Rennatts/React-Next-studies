import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: Build process (Next.js pipeline)",
  description:
    "Build & deployment: what next build does, static vs dynamic routes, prerendering, and where .next output comes from.",
};

export default function NextBuildPipelineStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Build & deployment
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Build process (Next.js build pipeline)
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes live in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/build-deployment/build-process-next-build-pipeline/README.md
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
          Use this as a quick guide to understand why some issues only appear in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">next build</code>: the build step
          can pre-render routes, execute Server Components, and produce static HTML for routes that qualify.
        </p>
      </article>
    </div>
  );
}


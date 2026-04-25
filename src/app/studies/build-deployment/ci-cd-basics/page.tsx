import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: CI/CD basics",
  description:
    "Build & deployment: CI validation, build artifacts, deployment environments, secrets, and why pipelines fail.",
};

export default function CicdBasicsStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Build & deployment
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">CI/CD basics</h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes live in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/build-deployment/ci-cd-basics/README.md
          </code>
          .
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/build-deployment/build-process-next-build-pipeline"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Next build pipeline
          </Link>
          <Link
            href="/studies/build-deployment/environment-variables"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Environment variables
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
          CI/CD is about making merges and releases predictable: validate changes quickly, build a reproducible artifact,
          deploy it to environments, and monitor after deploy.
        </p>
      </article>
    </div>
  );
}


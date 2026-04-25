import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: Environment variables (Next.js)",
  description:
    "Build & deployment: server vs client env vars, NEXT_PUBLIC, build-time vs runtime behavior, and safe validation patterns.",
};

export default function EnvironmentVariablesStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Build & deployment
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Environment variables
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes live in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/build-deployment/environment-variables/README.md
          </code>
          .
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/build-deployment/build-process-next-build-pipeline"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Build process (Next build pipeline)
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
          The rule to remember: <strong className="text-zinc-900 dark:text-zinc-100">server env vars are private</strong>
          , and <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">NEXT_PUBLIC_*</code> values
          are exposed to the browser bundle.
        </p>
      </article>
    </div>
  );
}


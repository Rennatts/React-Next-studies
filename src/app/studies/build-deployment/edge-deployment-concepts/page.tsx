import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: Edge deployment concepts",
  description:
    "Build & deployment: what “edge” means, Edge runtime constraints, best-fit workloads, caching, and how it fits Next.js + Vercel.",
};

export default function EdgeDeploymentConceptsStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Build & deployment
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Edge deployment concepts
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes live in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/build-deployment/edge-deployment-concepts/README.md
          </code>
          .
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/next-server/middleware"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Middleware study
          </Link>
          <Link
            href="/studies/next-server/edge-vs-node-runtime"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Edge vs Node runtime study
          </Link>
          <Link
            href="/studies/build-deployment/vercel-nextjs"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Vercel (Next) study
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
          Edge is best for <strong className="text-zinc-900 dark:text-zinc-100">fast interception</strong> (redirects,
          rewrites, auth gating) and for serving cached artifacts globally. Keep edge logic small and avoid Node-only
          dependencies.
        </p>
      </article>
    </div>
  );
}


import type { Metadata } from "next";
import Link from "next/link";
import { RenderingModesExamples } from "@/studies/next-server/rendering-ssr-ssg-isr/RenderingModesExamples";

export const metadata: Metadata = {
  title: "Study: Next.js SSR, SSG, and ISR",
  description:
    "How Server-Side Rendering, Static Site Generation, and Incremental Static Regeneration map to the App Router.",
};

export default function RenderingModesStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Next.js — platform
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          SSR, SSG, and ISR
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/next-server/rendering-ssr-ssg-isr/README.md
          </code>
          . Examples:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            RenderingModesExamples.tsx
          </code>
          . Runnable <strong className="text-zinc-800 dark:text-zinc-200">revalidate</strong> demo:{" "}
          <Link className="underline underline-offset-4" href="/studies/next-server/server-side">
            server-side study
          </Link>{" "}
          (<code className="font-mono text-xs">ServerSideRscFetchDemo</code>).
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/next-server/server-side"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Server-side study →
          </Link>
          <Link
            href="/studies/next-server"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Next server overview
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
          <strong className="text-zinc-900 dark:text-zinc-100">SSR</strong> (server-side rendering): the server
          produces a fresh response when the route is <strong>dynamic</strong>.{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">SSG</strong> (static site generation): the route can be
          prerendered and served from cache until you change code or revalidate.{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">ISR</strong> (incremental static regeneration): serve
          cached output, then refresh data after a <strong>time window</strong> (
          <code className="font-mono text-xs">revalidate</code>).
        </p>
        <p>
          In the App Router you rarely set a flag named “SSR”—you combine{" "}
          <code className="font-mono text-xs">fetch</code> options,{" "}
          <code className="font-mono text-xs">export const dynamic</code>,{" "}
          <code className="font-mono text-xs">export const revalidate</code>, and APIs like{" "}
          <code className="font-mono text-xs">cookies()</code> to get the behavior you want.
        </p>
      </article>

      <section aria-labelledby="patterns-heading" className="space-y-3">
        <h2 id="patterns-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Patterns (code only)
        </h2>
        <RenderingModesExamples />
      </section>
    </div>
  );
}

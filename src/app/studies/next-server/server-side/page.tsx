import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ServerSideRscFetchDemo } from "@/studies/next-server/server-side/ServerSideRscFetchDemo";

export const metadata: Metadata = {
  title: "Study: Next.js — server-side (App Router)",
  description:
    "Server Components, async RSC, fetch caching, dynamic APIs, Server Actions, Route Handlers, and the client boundary.",
};

export default function NextServerSideStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Next.js (server)
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Server-side in the App Router
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Full notes in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/next-server/server-side/README.md
          </code>
          .
        </p>
        <div className="flex flex-wrap gap-3">
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
          The README explains the default <strong className="text-zinc-900 dark:text-zinc-100">Server Component</strong>{" "}
          model, <strong className="text-zinc-900 dark:text-zinc-100">async</strong> data in RSC,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">fetch</code> caching
          and <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">revalidate</code>,{" "}
          dynamic rendering signals (<code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            cookies()
          </code>
          , <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">headers()</code>
          ), <strong className="text-zinc-900 dark:text-zinc-100">Server Actions</strong> vs{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">Route Handlers</strong>, env and secrets, and
          when to push <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            &quot;use client&quot;
          </code>{" "}
          down the tree—with links to async App Router and API-layer studies in this repo.
        </p>
      </article>

      <section aria-labelledby="demo-heading" className="space-y-3">
        <h2
          id="demo-heading"
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Example code (server)
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Source:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-900">
            src/studies/next-server/server-side/ServerSideRscFetchDemo.tsx
          </code>
        </p>
        <Suspense
          fallback={
            <p className="text-sm text-zinc-600 dark:text-zinc-400" role="status">
              Loading server demo…
            </p>
          }
        >
          <ServerSideRscFetchDemo />
        </Suspense>
      </section>
    </div>
  );
}

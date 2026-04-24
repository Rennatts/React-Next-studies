import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { MiddlewareExamples } from "@/studies/next-server/middleware/MiddlewareExamples";

export const metadata: Metadata = {
  title: "Study: Next.js middleware",
  description:
    "Edge middleware, matcher, NextResponse, headers; live demo via src/middleware.ts and this route.",
};

export const dynamic = "force-dynamic";

export default function MiddlewareStudyPage() {
  const h = headers();
  const ran = h.get("x-study-middleware");
  const path = h.get("x-study-path");
  const search = h.get("x-study-search");

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Next.js — platform
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Middleware
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/next-server/middleware/README.md
          </code>
          . Snippets:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            MiddlewareExamples.tsx
          </code>
          . Live middleware:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">src/middleware.ts</code>.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/next-server/middleware?hello=1"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Reload with ?hello=1
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

      <section
        aria-labelledby="live-heading"
        className="rounded-xl border border-emerald-200 bg-emerald-50/90 p-4 text-sm dark:border-emerald-900 dark:bg-emerald-950/40"
      >
        <h2 id="live-heading" className="text-sm font-semibold text-emerald-950 dark:text-emerald-100">
          Live: headers from <code className="font-mono text-xs">src/middleware.ts</code>
        </h2>
        <dl className="mt-3 space-y-2 font-mono text-xs text-emerald-900 dark:text-emerald-100">
          <div className="flex flex-wrap gap-2">
            <dt className="text-zinc-600 dark:text-emerald-300/90">x-study-middleware</dt>
            <dd>{ran ?? "(missing — matcher may not include this path)"}</dd>
          </div>
          <div className="flex flex-wrap gap-2">
            <dt className="text-zinc-600 dark:text-emerald-300/90">x-study-path</dt>
            <dd>{path ?? "—"}</dd>
          </div>
          <div className="flex flex-wrap gap-2">
            <dt className="text-zinc-600 dark:text-emerald-300/90">x-study-search</dt>
            <dd>{search === "" ? "(empty)" : (search ?? "—")}</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="patterns-heading" className="space-y-3">
        <h2 id="patterns-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Patterns (code only)
        </h2>
        <MiddlewareExamples />
      </section>
    </div>
  );
}

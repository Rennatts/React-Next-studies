import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { RouteHandlersExamples } from "@/studies/next-server/route-handlers/RouteHandlersExamples";
import { RouteHandlersPostDemo } from "@/studies/next-server/route-handlers/RouteHandlersPostDemo";

export const metadata: Metadata = {
  title: "Study: Next.js Route Handlers",
  description:
    "App Router route.ts as Pages API replacement: GET/POST, params, NextResponse, and live demos under this segment.",
};

export const dynamic = "force-dynamic";

function baseUrlFromHeaders() {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

export default async function RouteHandlersStudyPage() {
  const base = baseUrlFromHeaders();
  const demoUrl = `${base}/studies/next-server/route-handlers/demo`;
  const itemUrl = `${base}/studies/next-server/route-handlers/demo/item/hello-route`;

  const getRes = await fetch(demoUrl, { cache: "no-store" });
  const getJson = getRes.ok ? ((await getRes.json()) as Record<string, unknown>) : { error: getRes.status };

  const itemRes = await fetch(itemUrl, { cache: "no-store" });
  const itemJson = itemRes.ok ? ((await itemRes.json()) as Record<string, unknown>) : { error: itemRes.status };

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Next.js — platform
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Route Handlers
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/next-server/route-handlers/README.md
          </code>
          . Snippets:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            RouteHandlersExamples.tsx
          </code>
          . Live routes:{" "}
          <code className="font-mono text-xs">demo/route.ts</code>,{" "}
          <code className="font-mono text-xs">demo/item/[id]/route.ts</code>.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/next-server"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Next server overview
          </Link>
          <Link
            href="/studies/api/api-layer"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            API layer study
          </Link>
          <Link
            href="/"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Study index
          </Link>
        </div>
      </header>

      <article className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          Use <code className="font-mono text-xs">route.ts</code> when you need raw HTTP (JSON, webhooks, file
          downloads) instead of a React <code className="font-mono text-xs">page.tsx</code>. This repo already exposes{" "}
          <Link className="underline underline-offset-4" href="/api/studies/products">
            <code className="font-mono text-xs">/api/studies/products</code>
          </Link>{" "}
          from <code className="font-mono text-xs">src/app/api/studies/products/route.ts</code>.
        </p>
      </article>

      <section aria-labelledby="live-heading" className="space-y-3">
        <h2 id="live-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Live: server-fetched GET responses
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/90 p-3 text-xs dark:border-emerald-900 dark:bg-emerald-950/40">
            <p className="font-semibold text-emerald-950 dark:text-emerald-100">GET /demo</p>
            <p className="mt-1 break-all font-mono text-[11px] text-emerald-900 dark:text-emerald-200">{demoUrl}</p>
            <pre className="mt-2 max-h-48 overflow-auto rounded border border-emerald-100 bg-white p-2 text-[11px] dark:border-emerald-900 dark:bg-zinc-950">
              {JSON.stringify(getJson, null, 2)}
            </pre>
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50/90 p-3 text-xs dark:border-sky-900 dark:bg-sky-950/40">
            <p className="font-semibold text-sky-950 dark:text-sky-100">GET /demo/item/hello-route</p>
            <p className="mt-1 break-all font-mono text-[11px] text-sky-900 dark:text-sky-200">{itemUrl}</p>
            <pre className="mt-2 max-h-48 overflow-auto rounded border border-sky-100 bg-white p-2 text-[11px] dark:border-sky-900 dark:bg-zinc-950">
              {JSON.stringify(itemJson, null, 2)}
            </pre>
          </div>
        </div>
      </section>

      <section aria-labelledby="post-heading" className="space-y-3">
        <h2 id="post-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Live: POST from the browser
        </h2>
        <RouteHandlersPostDemo />
      </section>

      <section aria-labelledby="patterns-heading" className="space-y-3">
        <h2 id="patterns-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Patterns (code only)
        </h2>
        <RouteHandlersExamples />
      </section>
    </div>
  );
}

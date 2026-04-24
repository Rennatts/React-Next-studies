import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { EdgeVsNodeRuntimeExamples } from "@/studies/next-server/edge-vs-node-runtime/EdgeVsNodeRuntimeExamples";

export const metadata: Metadata = {
  title: "Study: Next.js Edge vs Node.js runtime",
  description:
    "When code runs on Edge vs Node, segment runtime config, and live Route Handler probes in this repo.",
};

export const dynamic = "force-dynamic";

function baseUrlFromHeaders() {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

export default async function EdgeVsNodeRuntimeStudyPage() {
  const base = baseUrlFromHeaders();
  const nodeUrl = `${base}/studies/next-server/edge-vs-node-runtime/probe-node`;
  const edgeUrl = `${base}/studies/next-server/edge-vs-node-runtime/probe-edge`;

  const [nodeRes, edgeRes] = await Promise.all([
    fetch(nodeUrl, { cache: "no-store" }),
    fetch(edgeUrl, { cache: "no-store" }),
  ]);

  const nodeJson = nodeRes.ok ? ((await nodeRes.json()) as Record<string, unknown>) : { error: nodeRes.status };
  const edgeJson = edgeRes.ok ? ((await edgeRes.json()) as Record<string, unknown>) : { error: edgeRes.status };

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Next.js — platform
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Edge vs Node.js runtime
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/next-server/edge-vs-node-runtime/README.md
          </code>
          . Snippets:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            EdgeVsNodeRuntimeExamples.tsx
          </code>
          . Live handlers:{" "}
          <code className="font-mono text-xs">probe-node/route.ts</code>,{" "}
          <code className="font-mono text-xs">probe-edge/route.ts</code>.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/next-server"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Next server overview
          </Link>
          <Link
            href="/studies/next-server/middleware"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Middleware (Edge) study
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
          This page (Server Component, default <strong className="text-zinc-900 dark:text-zinc-100">Node</strong>{" "}
          runtime) calls two Route Handlers on the same host: one uses <code className="font-mono text-xs">fs</code>{" "}
          (Node), the other sets <code className="font-mono text-xs">export const runtime = &quot;edge&quot;</code>.
        </p>
      </article>

      <section aria-labelledby="live-heading" className="space-y-3">
        <h2 id="live-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Live probe responses
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-sky-200 bg-sky-50/90 p-3 text-xs dark:border-sky-900 dark:bg-sky-950/40">
            <p className="font-semibold text-sky-900 dark:text-sky-100">Node — probe-node</p>
            <p className="mt-1 break-all font-mono text-[11px] text-sky-800 dark:text-sky-200">{nodeUrl}</p>
            <pre className="mt-2 max-h-48 overflow-auto rounded border border-sky-100 bg-white p-2 text-[11px] dark:border-sky-900 dark:bg-zinc-950">
              {JSON.stringify(nodeJson, null, 2)}
            </pre>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/90 p-3 text-xs dark:border-amber-900 dark:bg-amber-950/40">
            <p className="font-semibold text-amber-900 dark:text-amber-100">Edge — probe-edge</p>
            <p className="mt-1 break-all font-mono text-[11px] text-amber-900 dark:text-amber-200">{edgeUrl}</p>
            <pre className="mt-2 max-h-48 overflow-auto rounded border border-amber-100 bg-white p-2 text-[11px] dark:border-amber-900 dark:bg-zinc-950">
              {JSON.stringify(edgeJson, null, 2)}
            </pre>
          </div>
        </div>
      </section>

      <section aria-labelledby="patterns-heading" className="space-y-3">
        <h2 id="patterns-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Patterns (code only)
        </h2>
        <EdgeVsNodeRuntimeExamples />
      </section>
    </div>
  );
}

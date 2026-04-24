import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ServerComponentsClientIsland } from "@/studies/next-server/server-components/ServerComponentsClientIsland";
import { ServerComponentsExamples } from "@/studies/next-server/server-components/ServerComponentsExamples";
import {
  ServerFetchedUserLine,
  ServerRenderedClock,
} from "@/studies/next-server/server-components/ServerComponentsRscParts";

export const metadata: Metadata = {
  title: "Study: React Server Components (Next.js)",
  description:
    "Default server components in the App Router, async RSC, client islands, serializable props, and composition.",
};

export const dynamic = "force-dynamic";

function RscFallback({ label }: { label: string }) {
  return (
    <div
      className="animate-pulse rounded-lg border border-zinc-200 bg-zinc-100/80 px-3 py-4 text-center text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400"
      role="status"
    >
      {label}
    </div>
  );
}

export default async function ServerComponentsStudyPage() {
  const serverLabel = `Leanne Graham (loaded on server at ${new Date().toISOString().slice(11, 19)})`;

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Next.js (server)
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          React Server Components
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/next-server/server-components/README.md
          </code>
          . Server parts:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            ServerComponentsRscParts.tsx
          </code>
          ; client island:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            ServerComponentsClientIsland.tsx
          </code>
          ; snippets:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            ServerComponentsExamples.tsx
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
            href="/studies/next-server/server-side"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Server-side deep dive →
          </Link>
          <Link
            href="/"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Study index
          </Link>
        </div>
      </header>

      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        This <code className="font-mono text-xs">page.tsx</code> file is a <strong>Server Component</strong> (no{" "}
        <code className="font-mono text-xs">&quot;use client&quot;</code>). It can be <code className="font-mono text-xs">async</code>,{" "}
        await child RSCs inside <code className="font-mono text-xs">Suspense</code>, and pass plain props into the
        violet <strong>client island</strong> below.
      </p>

      <section aria-labelledby="live-heading" className="space-y-3">
        <h2 id="live-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Live examples
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Suspense fallback={<RscFallback label="Resolving server clock…" />}>
            <ServerRenderedClock />
          </Suspense>
          <Suspense fallback={<RscFallback label="Fetching user…" />}>
            <ServerFetchedUserLine />
          </Suspense>
        </div>
        <ServerComponentsClientIsland serverLabel={serverLabel} />
      </section>

      <section aria-labelledby="snippets-heading" className="space-y-3">
        <h2 id="snippets-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Patterns (code only)
        </h2>
        <ServerComponentsExamples />
      </section>
    </div>
  );
}

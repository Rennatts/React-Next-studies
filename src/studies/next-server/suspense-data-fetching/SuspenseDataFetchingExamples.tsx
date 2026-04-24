"use client";

/**
 * Code-focused patterns for Suspense + data fetching in Next.js.
 * Live parallel / nested streaming is rendered by the Server Component page.
 */

import type { ReactNode } from "react";

function Section({ id, title, code }: { id: string; title: string; code: string }) {
  return (
    <section
      aria-labelledby={id}
      className="space-y-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/40"
    >
      <h3 id={id} className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h3>
      <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-white p-3 text-[11px] leading-snug text-zinc-800 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200">
        <code>{code.trim()}</code>
      </pre>
    </section>
  );
}

function Note({ children }: { children: ReactNode }) {
  return <p className="text-xs text-zinc-600 dark:text-zinc-400">{children}</p>;
}

export function SuspenseDataFetchingExamples() {
  return (
    <div className="space-y-6">
      <Note>
        These snippets are reference patterns. The async pieces must live in Server Components (or client code using{" "}
        <code className="font-mono">use</code> with a compatible cache), not inside arbitrary client callbacks.
      </Note>

      <Section
        id="ex-rsc-suspense"
        title="1. Wrap async RSC children in Suspense (App Router page.tsx)"
        code={`
import { Suspense } from "react";
import { SlowCard } from "./SlowCard"; // async Server Component

export default function Page() {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <SlowCard />
    </Suspense>
  );
}
`}
      />

      <Section
        id="ex-parallel"
        title="2. Parallel boundaries (independent streaming)"
        code={`
<Suspense fallback={<A_Skeleton />}>
  <AsyncSidebar />
</Suspense>
<Suspense fallback={<B_Skeleton />}>
  <AsyncFeed />
</Suspense>
`}
      />

      <Section
        id="ex-loading-file"
        title="3. Route-level loading.tsx (Next.js)"
        code={`
// app/dashboard/loading.tsx
export default function Loading() {
  return <DashboardSkeleton />;
}

// Next wraps this segment's page in Suspense automatically.
`}
      />

      <Section
        id="ex-dynamic"
        title="4. Force request-time rendering when needed"
        code={`
// app/some-route/page.tsx
export const dynamic = "force-dynamic";

// Or use cookies() / headers() / searchParams (patterns) so the segment
// is not fully static when you rely on per-request data or timing demos.
`}
      />

      <Section
        id="ex-nested"
        title="5. Nested Suspense inside an async parent"
        code={`
export async function Outer() {
  await loadShell();
  return (
    <div>
      <Suspense fallback={<InnerFallback />}>
        <InnerAsync />
      </Suspense>
    </div>
  );
}

// Page: <Suspense fallback={<OuterFallback />}><Outer /></Suspense>
`}
      />
    </div>
  );
}

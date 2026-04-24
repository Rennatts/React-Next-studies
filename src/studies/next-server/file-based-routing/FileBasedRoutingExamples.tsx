"use client";

/**
 * Next.js App Router — file-based routing reference snippets.
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

export function FileBasedRoutingExamples() {
  return (
    <div className="space-y-6">
      <Note>
        Paths are under <code className="font-mono text-xs">src/app/</code> in this repo. Only folders that contain a{" "}
        <code className="font-mono text-xs">page.tsx</code> or <code className="font-mono text-xs">route.ts</code> (etc.)
        participate as segments—see each pattern below.
      </Note>

      <Section
        id="ex-root"
        title="1. Root layout + home page"
        code={`
// src/app/layout.tsx  — wraps entire app
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// src/app/page.tsx  — URL: /
export default function HomePage() {
  return <main>Home</main>;
}
`}
      />

      <Section
        id="ex-nested"
        title="2. Nested segment: folder = URL path"
        code={`
// src/app/blog/page.tsx       → /blog
// src/app/blog/[slug]/page.tsx → /blog/hello-world
export default async function BlogPost({ params }: { params: { slug: string } }) {
  return <article>{params.slug}</article>;
}
`}
      />

      <Section
        id="ex-layout"
        title="3. layout.tsx shares chrome between child routes"
        code={`
// src/app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <aside>Nav</aside>
      <section>{children}</section>
    </div>
  );
}

// src/app/dashboard/page.tsx        → /dashboard
// src/app/dashboard/settings/page.tsx → /dashboard/settings
`}
      />

      <Section
        id="ex-dynamic"
        title="4. Dynamic & catch-all segments"
        code={`
// app/shop/[category]/page.tsx     → /shop/electronics
// app/docs/[...slug]/page.tsx      → /docs/a/b/c  (params.slug is string[])
// app/wiki/[[...slug]]/page.tsx    → /wiki or /wiki/a/b
`}
      />

      <Section
        id="ex-route-group"
        title="5. Route groups — parentheses, no URL segment"
        code={`
// app/(marketing)/page.tsx   → still "/" if only leaf under app
// app/(marketing)/pricing/page.tsx → /pricing
// app/(app)/dashboard/page.tsx     → /dashboard

// (marketing) and (app) organize files; they do not appear in the path.
`}
      />

      <Section
        id="ex-route-handler"
        title="6. route.ts — API / non-HTML handlers"
        code={`
// src/app/api/health/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true });
}
`}
      />

      <Section
        id="ex-loading-error"
        title="7. loading.tsx & error.tsx per segment"
        code={`
// src/app/dashboard/loading.tsx
export default function Loading() {
  return <p>Loading dashboard…</p>;
}

// src/app/dashboard/error.tsx  ("use client" in App Router)
"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <p>{error.message}</p>
      <button type="button" onClick={() => reset()}>Try again</button>
    </div>
  );
}
`}
      />

      <Section
        id="ex-metadata"
        title="8. Metadata next to routes"
        code={`
// src/app/blog/[slug]/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

// Or generateMetadata({ params, searchParams }) for dynamic titles.
`}
      />
    </div>
  );
}

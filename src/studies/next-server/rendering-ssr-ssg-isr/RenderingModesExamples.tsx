"use client";

/**
 * SSR / SSG / ISR — App Router patterns (reference snippets).
 * Names map from Pages Router; APIs are segment config + fetch options.
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

export function RenderingModesExamples() {
  return (
    <div className="space-y-6">
      <Note>
        Treat <strong>SSR / SSG / ISR</strong> as <strong>behavior</strong> you get from combining{" "}
        <code className="font-mono text-xs">fetch</code>, segment <code className="font-mono text-xs">dynamic</code> /{" "}
        <code className="font-mono text-xs">revalidate</code>, and dynamic APIs—Next decides static vs dynamic from the
        whole segment.
      </Note>

      <Section
        id="ex-ssr"
        title="1. SSR-style — per-request (dynamic)"
        code={`
// app/dashboard/page.tsx
export const dynamic = "force-dynamic";

export default async function Page() {
  const res = await fetch("https://api.example.com/me", { cache: "no-store" });
  const me = await res.json();
  return <div>{me.name}</div>;
}
`}
      />

      <Section
        id="ex-ssg"
        title="2. SSG-style — static / build-time friendly"
        code={`
// app/about/page.tsx
export const dynamic = "force-static";

export default async function Page() {
  // Default fetch in RSC is cached — can be prerendered at build when segment is static.
  const res = await fetch("https://api.example.com/about");
  const copy = await res.json();
  return <article>{copy.title}</article>;
}
`}
      />

      <Section
        id="ex-isr-fetch"
        title="3. ISR-style — time-based revalidation on fetch"
        code={`
export default async function Page() {
  const res = await fetch("https://api.example.com/posts", {
    next: { revalidate: 60 },
  });
  const posts = await res.json();
  return <ul>{posts.map((p: { id: string }) => <li key={p.id}>…</li>)}</ul>;
}
`}
      />

      <Section
        id="ex-isr-segment"
        title="4. ISR-style — segment revalidate (all fetches in segment)"
        code={`
// app/blog/layout.tsx (or page.tsx)
export const revalidate = 300; // seconds

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div className="blog-shell">{children}</div>;
}
`}
      />

      <Section
        id="ex-gsp"
        title="5. SSG with dynamic routes — generateStaticParams"
        code={`
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  return [{ slug: "hello" }, { slug: "world" }];
}

export default async function Page({ params }: { params: { slug: string } }) {
  return <article>{params.slug}</article>;
}
`}
      />

      <Section
        id="ex-dynamic-api"
        title="6. Dynamic route without asking — cookies / headers"
        code={`
import { cookies } from "next/headers";

export default async function Page() {
  const theme = cookies().get("theme");
  return <div>Theme: {theme?.value}</div>;
}

// Reading cookies() opts this segment into dynamic rendering (SSR-style).
`}
      />
    </div>
  );
}

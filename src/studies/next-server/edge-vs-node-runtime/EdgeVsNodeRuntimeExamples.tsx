"use client";

/**
 * Edge vs Node.js runtime — segment config and Route Handlers (reference snippets).
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

export function EdgeVsNodeRuntimeExamples() {
  return (
    <div className="space-y-6">
      <Note>
        Defaults depend on the Next.js version and surface; confirm in the docs for your release. Middleware is Edge-only.
      </Note>

      <Section
        id="ex-route-edge"
        title="1. Route Handler on the Edge"
        code={`
// app/api/health-edge/route.ts
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json({ ok: true, at: Date.now() });
}
`}
      />

      <Section
        id="ex-route-node"
        title="2. Route Handler on Node (default) — can use fs"
        code={`
// app/api/pkg-head/route.ts
import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const raw = readFileSync(join(process.cwd(), "package.json"), "utf8");
  return NextResponse.json({ name: JSON.parse(raw).name });
}
`}
      />

      <Section
        id="ex-page-edge"
        title="3. Force Edge for a Server Component page (when supported)"
        code={`
// app/fast/page.tsx
export const runtime = "edge";

export default function Page() {
  return <p>Runs on Edge if this segment allows it.</p>;
}
`}
      />

      <Section
        id="ex-explicit-node"
        title="4. Explicit Node (when you rely on Node-only APIs)"
        code={`
export const runtime = "nodejs"; // Next 14+: explicit when both are available

import fs from "fs";
// …
`}
      />

      <Section
        id="ex-middleware"
        title="5. Middleware = Edge (no runtime switch)"
        code={`
// middleware.ts always runs on the Edge runtime.
// Use Route Handlers + Node when you need full Node APIs.
`}
      />
    </div>
  );
}

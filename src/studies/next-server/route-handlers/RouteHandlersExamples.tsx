"use client";

/**
 * Next.js Route Handlers — reference snippets (App Router).
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

export function RouteHandlersExamples() {
  return (
    <div className="space-y-6">
      <Note>
        A folder may contain <code className="font-mono text-xs">page.tsx</code> <strong>or</strong>{" "}
        <code className="font-mono text-xs">route.ts</code> for the same segment in many cases—not both as the same
        leaf without splitting (see Next docs for colocation rules).
      </Note>

      <Section
        id="ex-get"
        title="1. GET JSON"
        code={`
// app/api/ping/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true });
}
`}
      />

      <Section
        id="ex-query"
        title="2. Read search params"
        code={`
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  return NextResponse.json({ q });
}
`}
      />

      <Section
        id="ex-post"
        title="3. POST JSON body"
        code={`
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ saved: body }, { status: 201 });
}
`}
      />

      <Section
        id="ex-dynamic"
        title="4. Dynamic segment param"
        code={`
// app/api/items/[id]/route.ts
import { NextResponse } from "next/server";

type Ctx = { params: { id: string } };

export async function GET(_request: Request, { params }: Ctx) {
  return NextResponse.json({ id: params.id });
}
`}
      />

      <Section
        id="ex-status"
        title="5. Errors and status codes"
        code={`
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ error: "not found" }, { status: 404 });
}
`}
      />

      <Section
        id="ex-pages-migrate"
        title="6. Migrating from pages/api"
        code={`
// Before: pages/api/hello.ts → export default function handler(req, res) { … }

// After: app/api/hello/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "hello" });
}
`}
      />
    </div>
  );
}

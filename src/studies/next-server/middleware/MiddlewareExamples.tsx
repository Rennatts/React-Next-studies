"use client";

/**
 * Next.js middleware — reference snippets (root middleware.ts).
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

export function MiddlewareExamples() {
  return (
    <div className="space-y-6">
      <Note>
        Production apps should use a tight <code className="font-mono text-xs">matcher</code> (and often exclude static
        assets). This study’s real <code className="font-mono text-xs">src/middleware.ts</code> only targets the study
        URL prefix below.
      </Note>

      <Section
        id="ex-skeleton"
        title="1. Minimal middleware + matcher (this repo)"
        code={`
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("x-study-middleware", "1");
  res.headers.set("x-study-path", request.nextUrl.pathname);
  return res;
}

export const config = {
  matcher: [
    "/studies/next-server/middleware",
    "/studies/next-server/middleware/:path*",
  ],
};
`}
      />

      <Section
        id="ex-redirect"
        title="2. Redirect when unauthenticated (pattern)"
        code={`
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("session");
  if (!token && request.nextUrl.pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}
`}
      />

      <Section
        id="ex-rewrite"
        title="3. Rewrite (same URL, different internal path)"
        code={`
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/old-blog") {
    return NextResponse.rewrite(new URL("/blog", request.url));
  }
  return NextResponse.next();
}
`}
      />

      <Section
        id="ex-matcher-multi"
        title="4. Multiple matchers + negative lookahead (common)"
        code={`
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
`}
      />

      <Section
        id="ex-request-header"
        title="5. Set request headers for Server Components / RSC"
        code={`
const requestHeaders = new Headers(request.headers);
requestHeaders.set("x-request-id", crypto.randomUUID());

return NextResponse.next({
  request: { headers: requestHeaders },
});
`}
      />
    </div>
  );
}

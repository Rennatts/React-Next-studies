"use client";

/**
 * Auth flows — JWT, cookies, sessions (reference snippets; not a runnable auth server).
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

export function AuthFlowsExamples() {
  return (
    <div className="space-y-6">
      <Note>
        Replace placeholders with your stack (e.g. jose, iron-session, Auth.js, your IdP). Never ship real secrets in
        client bundles.
      </Note>

      <Section
        id="ex-bearer"
        title="1. SPA → API with Bearer JWT"
        code={`
// Browser (after login hands you access_token)
await fetch("https://api.example.com/v1/me", {
  headers: {
    Authorization: \`Bearer \${accessToken}\`,
  },
});
`}
      />

      <Section
        id="ex-set-cookie"
        title="2. Login response: set httpOnly session cookie"
        code={`
// Pseudocode: HTTP route after verifying password
Set-Cookie: sid=<random-session-id>; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800
`}
      />

      <Section
        id="ex-session-lookup"
        title="3. Server: resolve session id → user"
        code={`
// Pseudocode
const sid = cookies.get("sid");
if (!sid) return unauthorized;
const session = await redis.get(\`sess:\${sid}\`);
if (!session) return unauthorized;
const userId = session.userId;
`}
      />

      <Section
        id="ex-next-cookies"
        title="4. Next.js App Router — read cookie in a Server Component"
        code={`
import { cookies } from "next/headers";

export default async function Page() {
  const token = cookies().get("session");
  if (!token) return <p>Guest</p>;
  return <p>Signed in (validate server-side)</p>;
}
`}
      />

      <Section
        id="ex-next-middleware"
        title="5. Next.js — middleware gate (Edge)"
        code={`
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.cookies.has("session")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/app/:path*"] };
`}
      />

      <Section
        id="ex-refresh"
        title="6. Refresh token pattern (outline)"
        code={`
// Short-lived access JWT + longer-lived refresh in httpOnly cookie
// POST /auth/refresh reads refresh cookie, issues new access token, rotates refresh if needed.
`}
      />
    </div>
  );
}

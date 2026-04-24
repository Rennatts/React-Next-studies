"use client";

/**
 * OAuth 2.0 basics — reference snippets (no live IdP; use a real library in production).
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

export function OAuthBasicsExamples() {
  return (
    <div className="space-y-6">
      <Note>
        Use a maintained SDK (Auth.js, Clerk, WorkOS, vendor SDKs) or a vetted OAuth library—do not roll crypto from
        scratch.
      </Note>

      <Section
        id="ex-authorize-url"
        title="1. Build the /authorize redirect (query params)"
        code={`
const params = new URLSearchParams({
  response_type: "code",
  client_id: CLIENT_ID,
  redirect_uri: "https://app.example.com/api/auth/callback",
  scope: "openid email",
  state: randomState,           // store in session; verify on return
  code_challenge: challenge,   // PKCE (S256)
  code_challenge_method: "S256",
});

const url = \`https://id.example.com/authorize?\${params}\`;
// window.location.href = url  (browser) or redirect response (server)
`}
      />

      <Section
        id="ex-token-exchange"
        title="2. Exchange authorization code for tokens (server-side)"
        code={`
// POST https://id.example.com/token
// Content-Type: application/x-www-form-urlencoded

const body = new URLSearchParams({
  grant_type: "authorization_code",
  code: authCodeFromCallback,
  redirect_uri: "https://app.example.com/api/auth/callback",
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET, // confidential client only — never in SPA bundle
  code_verifier: storedVerifier, // PKCE — was secret to your app + IdP
});

const tokenRes = await fetch("https://id.example.com/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body,
});
const tokens = await tokenRes.json(); // access_token, refresh_token, id_token (OIDC), expires_in
`}
      />

      <Section
        id="ex-state"
        title="3. Validate state on callback"
        code={`
// Callback handler: compare query.state to value stored in httpOnly session / cookie jar
if (query.state !== session.oauthState) {
  return new Response("Invalid state", { status: 400 });
}
`}
      />

      <Section
        id="ex-next-callback"
        title="4. Next.js App Router — Route Handler as OAuth callback (sketch)"
        code={`
// app/api/auth/callback/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  // validate state, exchange code, set session cookie, redirect to /app
  return NextResponse.redirect(new URL("/app", request.url));
}
`}
      />

      <Section
        id="ex-client-credentials"
        title="5. Client credentials (M2M, outline)"
        code={`
// POST /token
grant_type=client_credentials
client_id=...&client_secret=...

// Response: access_token only (no user); use for service-to-service APIs.
`}
      />
    </div>
  );
}

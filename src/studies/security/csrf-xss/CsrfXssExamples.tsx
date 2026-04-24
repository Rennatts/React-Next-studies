"use client";

/**
 * CSRF / XSS — reference snippets only; not a runnable security middleware.
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

export function CsrfXssExamples() {
  return (
    <div className="space-y-6">
      <Note>
        Adapt to your framework (Rails, Laravel, Spring, Next, etc.). Prefer built-in CSRF protection and security headers over custom crypto.
      </Note>

      <Section
        id="ex-samesite"
        title="1. Session cookie — SameSite + Secure + HttpOnly"
        code={`
Set-Cookie: sid=<opaque>; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800
// Lax: default-friendly; use Strict if you can tolerate no cookie on top-level cross-site navigations.
// SameSite=None requires Secure — pair with explicit CSRF tokens for browser POSTs.
`}
      />

      <Section
        id="ex-csrf-token"
        title="2. CSRF synchronizer token (classic form)"
        code={`
// Server: store csrfSecret in session; render:
<input type="hidden" name="_csrf" value="\${csrfToken}" />
// On POST: reject if body._csrf !== session.csrfToken (or use signed/double-submit variant).
`}
      />

      <Section
        id="ex-origin"
        title="3. Route handler — check Origin for state-changing requests"
        code={`
// Pseudocode (Next.js Route Handler, Node)
const origin = request.headers.get("origin");
const allowed = new Set(["https://app.example.com"]);
if (request.method !== "GET" && request.method !== "HEAD") {
  if (!origin || !allowed.has(origin)) {
    return new Response("Forbidden", { status: 403 });
  }
}
`}
      />

      <Section
        id="ex-fetch-cred"
        title="4. fetch from browser — credentials and APIs"
        code={`
// Same-origin: cookies sent when credentials included (default for same-origin in many cases).
await fetch("/api/profile", { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" } });
// Cross-origin API: CORS + auth design; CSRF less classic if no ambient cookie auth — still validate Origin.
`}
      />

      <Section
        id="ex-xss-react"
        title="5. XSS — prefer text; avoid raw HTML from users"
        code={`
// Safe: React escapes text
<p>{userName}</p>

// Dangerous: only if you truly need HTML — sanitize with a vetted library + strict allowlist
// <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userHtml) }} />

// Also dangerous: untrusted URLs
// <a href={userSuppliedUrl}> — block javascript: and data: schemes server- or client-side
`}
      />

      <Section
        id="ex-csp"
        title="6. Content-Security-Policy (header sketch)"
        code={`
Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none';
// Tighten/loosen per app; use nonces/hashes if you need inline scripts — avoid unsafe-inline in production.
`}
      />
    </div>
  );
}

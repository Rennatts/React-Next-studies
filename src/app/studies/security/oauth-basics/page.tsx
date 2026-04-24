import type { Metadata } from "next";
import Link from "next/link";
import { OAuthBasicsExamples } from "@/studies/security/oauth-basics/OAuthBasicsExamples";

export const metadata: Metadata = {
  title: "Study: OAuth 2.0 basics",
  description:
    "Authorization code flow, roles, PKCE, state and redirect URI, scopes, and how OIDC relates to identity.",
};

export default function OAuthBasicsStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Authentication and security
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          OAuth 2.0 basics
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/security/oauth-basics/README.md
          </code>
          . Examples:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            OAuthBasicsExamples.tsx
          </code>
          .
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/security/auth-flows"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Auth flows (JWT, cookies, sessions)
          </Link>
          <Link
            href="/studies/next-server/route-handlers"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Route Handlers
          </Link>
          <Link
            href="/"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Study index
          </Link>
        </div>
      </header>

      <article className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          OAuth answers <strong className="text-zinc-900 dark:text-zinc-100">“can this app act on my behalf?”</strong>{" "}
          with <strong className="text-zinc-900 dark:text-zinc-100">tokens</strong> and <strong>scoped</strong> access.
          For <strong className="text-zinc-900 dark:text-zinc-100">who is the user?</strong> (login), look for{" "}
          <strong>OpenID Connect</strong> or your vendor’s identity profile on top of these flows.
        </p>
      </article>

      <section aria-labelledby="patterns-heading" className="space-y-3">
        <h2 id="patterns-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Patterns (code only)
        </h2>
        <OAuthBasicsExamples />
      </section>
    </div>
  );
}

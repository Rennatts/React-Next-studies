import type { Metadata } from "next";
import Link from "next/link";
import { AuthFlowsExamples } from "@/studies/security/auth-flows/AuthFlowsExamples";

export const metadata: Metadata = {
  title: "Study: Auth flows — JWT, cookies, sessions",
  description:
    "How JWTs, cookies, and server-side sessions differ; transport, httpOnly, CSRF/XSS notes, and Next.js snippets.",
};

export default function AuthFlowsStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Authentication and security
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Auth flows: JWT, cookies, sessions
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/security/auth-flows/README.md
          </code>
          . Examples:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            AuthFlowsExamples.tsx
          </code>
          .
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/next-server/middleware"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Next middleware study
          </Link>
          <Link
            href="/studies/next-server/server-side"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Next server-side study
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
          Use this page as a <strong className="text-zinc-900 dark:text-zinc-100">glossary + checklist</strong>: what
          each mechanism is good for, and how cookies relate to both JWTs and opaque session ids. Implementations vary
          by provider—always follow your IdP and threat model.
        </p>
      </article>

      <section aria-labelledby="patterns-heading" className="space-y-3">
        <h2 id="patterns-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Patterns (code only)
        </h2>
        <AuthFlowsExamples />
      </section>
    </div>
  );
}

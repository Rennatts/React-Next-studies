import type { Metadata } from "next";
import Link from "next/link";
import { CsrfXssExamples } from "@/studies/security/csrf-xss/CsrfXssExamples";

export const metadata: Metadata = {
  title: "Study: CSRF and XSS protection",
  description:
    "Cross-site request forgery vs cross-site scripting: cookies, SameSite, tokens, Origin checks, React escaping, CSP.",
};

export default function CsrfXssStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Authentication and security
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          CSRF and XSS protection
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/security/csrf-xss/README.md
          </code>
          . Examples:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            CsrfXssExamples.tsx
          </code>
          .
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/security/auth-flows"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Auth flows study
          </Link>
          <Link
            href="/studies/next-server/route-handlers"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Route handlers study
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
          Use this page as a <strong className="text-zinc-900 dark:text-zinc-100">glossary + checklist</strong>: how
          CSRF abuses ambient browser auth (often cookies), how XSS is an injection into your page’s trust boundary, and
          which mitigations apply at the cookie, framework, and HTTP header layers.
        </p>
      </article>

      <section aria-labelledby="patterns-heading" className="space-y-3">
        <h2 id="patterns-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Patterns (code only)
        </h2>
        <CsrfXssExamples />
      </section>
    </div>
  );
}

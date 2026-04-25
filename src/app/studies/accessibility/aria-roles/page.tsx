import type { Metadata } from "next";
import Link from "next/link";
import { AriaRolesDemo } from "@/studies/accessibility/aria-roles/AriaRolesDemo";

export const metadata: Metadata = {
  title: "Study: ARIA roles",
  description: "Accessibility (A11y): semantic HTML first, then ARIA roles, names, and states when needed.",
};

export default function AriaRolesStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Accessibility (A11y)
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">ARIA roles</h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Prefer semantic HTML. Use ARIA roles when HTML can’t express the right semantics, and pair roles with an
          accessible name + state. Notes in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/accessibility/aria-roles/README.md
          </code>
          .
        </p>
        <Link
          href="/"
          className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
        >
          ← Back to study index
        </Link>
      </header>

      <section aria-labelledby="demo-heading" className="space-y-3">
        <h2 id="demo-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Live examples
        </h2>
        <AriaRolesDemo />
      </section>
    </div>
  );
}


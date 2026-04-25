import type { Metadata } from "next";
import Link from "next/link";
import { KeyboardNavigationDemo } from "@/studies/accessibility/keyboard-navigation/KeyboardNavigationDemo";

export const metadata: Metadata = {
  title: "Study: Keyboard navigation",
  description: "Accessibility (A11y): tab order, focus management, Escape to close, and roving tabindex patterns.",
};

export default function KeyboardNavigationStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Accessibility (A11y)
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Keyboard navigation
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Make UI usable without a mouse: predictable Tab order, visible focus, Escape to close, and arrow-key patterns
          for composite widgets. Notes in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/accessibility/keyboard-navigation/README.md
          </code>
          .
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/accessibility/aria-roles"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ARIA roles study
          </Link>
          <Link
            href="/"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Back to study index
          </Link>
        </div>
      </header>

      <section aria-labelledby="demo-heading" className="space-y-3">
        <h2 id="demo-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Live examples
        </h2>
        <KeyboardNavigationDemo />
      </section>
    </div>
  );
}


import type { Metadata } from "next";
import Link from "next/link";
import { ButtonExampleDemo } from "@/studies/design-system/button-example/ButtonExampleDemo";

export const metadata: Metadata = {
  title: "Study: Design system — Button example",
  description:
    "Real-life style documentation for a Button: variants, sizes, states, accessibility, API table, and do/don’t—plus a minimal SystemButton demo.",
};

export default function DesignSystemButtonExamplePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Design system
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Example: <code className="text-lg">Button</code> documentation
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Canonical structure and copy patterns live in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/design-system/button-example/README.md
          </code>
          . Implementation reference:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            SystemButton.tsx
          </code>
          .
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/design-system"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Overview
          </Link>
          <Link
            href="/studies/design-system/audience"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Audience
          </Link>
          <Link
            href="/"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Study index
          </Link>
        </div>
      </header>

      <section aria-labelledby="demo-heading" className="space-y-3">
        <h2
          id="demo-heading"
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Live demo
        </h2>
        <ButtonExampleDemo />
      </section>
    </div>
  );
}

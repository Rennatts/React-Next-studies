import type { Metadata } from "next";
import Link from "next/link";
import { BffDemo } from "@/studies/api/bff-backend-for-frontend/BffDemo";

export const metadata: Metadata = {
  title: "Study: BFF (Backend for Frontend)",
  description:
    "API study: build a small BFF with a Next.js Route Handler that reshapes upstream API data into a UI-friendly contract.",
};

export default function BffStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">API studies</p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          BFF (Backend for Frontend)
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Notes in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/api/bff-backend-for-frontend/README.md
          </code>
          . BFF endpoint:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/app/api/studies/bff/route.ts
          </code>
          .
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/api/api-layer"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            API layer study
          </Link>
          <Link
            href="/studies/next-server/route-handlers"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Route Handlers study
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
          Live example
        </h2>
        <BffDemo />
      </section>
    </div>
  );
}


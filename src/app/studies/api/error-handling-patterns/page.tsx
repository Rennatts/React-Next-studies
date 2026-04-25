import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: Error handling patterns in APIs",
  description:
    "API studies: status codes, consistent error envelopes, validation errors, retryability, and correlation ids.",
};

export default function ApiErrorHandlingPatternsStudyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">API studies</p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Error handling patterns in APIs
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Read the notes in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/api/error-handling-patterns/README.md
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
            href="/studies/api/bff-backend-for-frontend"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            BFF study
          </Link>
          <Link
            href="/"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Back to study index
          </Link>
        </div>
      </header>

      <article className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          This study focuses on the contract side of error handling: choosing status codes, standardizing an error
          envelope, and returning actionable validation errors—so clients can implement consistent UX and logging.
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Tip: If you adopt a stable error <em>code</em> + request id, you can show friendly messages while still
          logging the real diagnostic signal.
        </p>
      </article>
    </div>
  );
}


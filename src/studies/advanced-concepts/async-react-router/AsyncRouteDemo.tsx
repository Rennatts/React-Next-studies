import { Suspense } from "react";
import { fetchRecommendationsSlow, fetchUserSlow } from "./mockServerFetch";

export async function AsyncRouteDemo() {
  const user = await fetchUserSlow();

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Advanced concepts
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          This page is rendered by an <span className="font-medium">async Server Component</span>.
          The first block awaits “user” data. The second block streams in later via{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            Suspense
          </code>
          .
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          User (awaited before render)
        </p>
        <p className="mt-2 text-sm text-zinc-800 dark:text-zinc-200">
          {user.name}{" "}
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            ({user.role})
          </span>
        </p>
      </div>

      <Suspense
        fallback={
          <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Recommendations (streaming…)
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Loading slower content…
            </p>
          </div>
        }
      >
        <RecommendationsBlock />
      </Suspense>
    </div>
  );
}

async function RecommendationsBlock() {
  const recs = await fetchRecommendationsSlow();
  return (
    <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Recommendations (streamed)
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
        {recs.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  );
}


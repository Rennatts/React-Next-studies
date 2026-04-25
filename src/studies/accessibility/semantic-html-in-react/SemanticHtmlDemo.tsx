"use client";

import { useState } from "react";

export function SemanticHtmlDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Action: button vs div
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Buttons have built-in keyboard activation and correct semantics.
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setCount((c) => c + 1)}
            className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
          >
            Increment
          </button>

          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Count: <span className="font-medium">{count}</span>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-950 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-100">
          <p className="text-xs font-semibold">Anti-pattern</p>
          <p className="mt-2 text-sm opacity-90">
            A clickable <code className="rounded bg-amber-100 px-1 py-0.5 text-[11px] dark:bg-amber-900/30">div</code>{" "}
            is not automatically keyboard-accessible and doesn’t behave like a button.
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Navigation: link vs click handler
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Use links for navigation so users can open in new tab and screen readers announce “link”.
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <a
            href="/studies/accessibility/aria-roles"
            className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
          >
            Go to ARIA roles study
          </a>

          <span className="text-xs text-zinc-500 dark:text-zinc-400">(works as a real link)</span>
        </div>
      </section>

      <section className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Structure: headings and lists
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Headings and lists give assistive tech a navigable structure (not just visual styling).
        </p>

        <h3 className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">Example list</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>Use a real &lt;ul&gt; + &lt;li&gt; for lists</li>
          <li>Use &lt;h1&gt;…&lt;h6&gt; for hierarchy</li>
          <li>Keep DOM order aligned with visual order</li>
        </ul>
      </section>
    </div>
  );
}


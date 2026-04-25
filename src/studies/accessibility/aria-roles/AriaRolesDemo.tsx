"use client";

import { useId, useState } from "react";

export function AriaRolesDemo() {
  const detailsId = useId();
  const [pressed, setPressed] = useState(false);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Landmarks (semantic HTML)
        </p>
        <div className="mt-3 rounded-lg border border-dashed border-zinc-200 p-3 text-sm dark:border-zinc-800">
          <header className="rounded-md bg-zinc-50 p-2 text-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-200">
            &lt;header&gt; (banner)
          </header>
          <nav className="mt-2 rounded-md bg-zinc-50 p-2 text-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-200">
            &lt;nav&gt; (navigation)
          </nav>
          <main className="mt-2 rounded-md bg-zinc-50 p-2 text-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-200">
            &lt;main&gt; (main)
          </main>
        </div>
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          These elements already expose landmark roles. Usually you should <span className="font-medium">not</span>{" "}
          add an explicit <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-900">role=</code> here.
        </p>
      </section>

      <section className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Accessible name (icon-only)
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Screen readers need a name. Visible text works by default, but icon-only buttons should use{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-900">aria-label</code>.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            aria-label="Close dialog"
            className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
          >
            ×
          </button>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Announces as: “Close dialog, button”
          </span>
        </div>
      </section>

      <section className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          State with ARIA (toggle)
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          For toggle buttons, expose state with{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-900">aria-pressed</code>.
        </p>
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            aria-pressed={pressed}
            aria-describedby={detailsId}
            onClick={() => setPressed((v) => !v)}
            className={[
              "rounded-md px-3 py-2 text-sm font-medium",
              pressed
                ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
            ].join(" ")}
          >
            {pressed ? "Enabled" : "Disabled"}
          </button>
          <p id={detailsId} className="text-xs text-zinc-500 dark:text-zinc-400">
            The screen reader announces pressed/unpressed.
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-100">
        <p className="text-xs font-medium uppercase tracking-wide opacity-80">Anti-pattern</p>
        <p className="mt-2 text-sm font-semibold">
          <code className="rounded bg-amber-100 px-1 py-0.5 text-[11px] dark:bg-amber-900/30">
            div role=&quot;button&quot;
          </code>{" "}
          needs full keyboard behavior
        </p>
        <p className="mt-2 text-sm opacity-90">
          This is focusable, but it does not respond to Space/Enter unless you implement it. Prefer a real{" "}
          <code className="rounded bg-amber-100 px-1 py-0.5 text-[11px] dark:bg-amber-900/30">button</code>.
        </p>
        <div
          role="button"
          tabIndex={0}
          aria-label="Fake button (demo)"
          className="mt-3 inline-flex select-none rounded-md border border-amber-300 bg-white px-3 py-2 text-sm font-medium dark:border-amber-900/40 dark:bg-black/20"
        >
          Fake button
        </div>
      </section>
    </div>
  );
}


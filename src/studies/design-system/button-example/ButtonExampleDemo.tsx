"use client";

import { useState } from "react";
import { SystemButton } from "./SystemButton";

export function ButtonExampleDemo() {
  const [loading, setLoading] = useState(false);

  const simulateSubmit = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1400);
  };

  return (
    <div className="space-y-8">
      <section aria-labelledby="variants-heading" className="space-y-3">
        <h2
          id="variants-heading"
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Variants (same size: md)
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Matches the variant table in the README: one primary action per region is the usual
          guideline.
        </p>
        <div className="flex flex-wrap gap-3">
          <SystemButton variant="primary">Primary</SystemButton>
          <SystemButton variant="secondary">Secondary</SystemButton>
          <SystemButton variant="ghost">Ghost</SystemButton>
          <SystemButton variant="danger">Delete project</SystemButton>
        </div>
      </section>

      <section aria-labelledby="sizes-heading" className="space-y-3">
        <h2 id="sizes-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Sizes
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <SystemButton size="sm" variant="secondary">
            Small
          </SystemButton>
          <SystemButton size="md" variant="secondary">
            Medium
          </SystemButton>
          <SystemButton size="lg" variant="secondary">
            Large
          </SystemButton>
        </div>
      </section>

      <section aria-labelledby="states-heading" className="space-y-3">
        <h2 id="states-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          States: disabled and loading
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading sets <code className="text-[11px]">aria-busy</code> and prevents double submit in
          this demo.
        </p>
        <div className="flex flex-wrap gap-3">
          <SystemButton disabled variant="primary">
            Disabled
          </SystemButton>
          <SystemButton loading={loading} variant="primary" onClick={simulateSubmit}>
            {loading ? "Saving…" : "Save changes"}
          </SystemButton>
        </div>
      </section>

      <section aria-labelledby="pattern-heading" className="space-y-3">
        <h2 id="pattern-heading" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Pattern: dialog footer (primary + secondary)
        </h2>
        <div
          role="group"
          aria-label="Example dialog actions"
          className="flex flex-wrap justify-end gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50"
        >
          <SystemButton variant="secondary">Cancel</SystemButton>
          <SystemButton variant="primary">Confirm</SystemButton>
        </div>
      </section>
    </div>
  );
}

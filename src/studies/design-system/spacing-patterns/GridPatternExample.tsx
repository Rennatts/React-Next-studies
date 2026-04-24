/**
 * ## Grid pattern (spacing / layout)
 *
 * **Problem it solves:** Treating every surface as a **one-row flex** hides **2D** relationships—row
 * rhythm, **spans**, and **alignment across both axes**—so teams stack nested flex wrappers and
 * duplicate gaps. A **grid** makes **row gap** and **column gap** (or a single `gap` shorthand)
 * explicit and keeps **placement** (spans, areas) in one place.
 *
 * **What the pattern does:** Define **tracks** on **columns and rows** together (`grid-template-*`
 * or utilities), set **`gap` / `row-gap` / `column-gap`** from tokens (same step on both axes, or
 * **gutter** + **stack** roles when marketing wants airy rows but tight columns). **Inset** on the
 * grid container stays separate from **cell gap**; **padding inside** a cell still follows the
 * [layers](./README.md#pattern-layers-structural) model. Document **min sizes**, **overflow**, and
 * **spanning** so reading order and focus order stay coherent.
 *
 * **Contrast with “columns” in this repo:** The [columns](./README.md#pattern-columns) note
 * emphasizes **inline gutters** between parallel tracks; **grid** here is a **small shell** where
 * **multiple rows** and **col-span** are intentional—closer to dashboards or **layout-grid** specs
 * than a single wrapping card row.
 *
 * **How this file implements it:** One container uses **CSS Grid** with **different** `gap-x` and
 * `gap-y` token vars, **sidebar + main** on `md` with **fixed-ish first column** (`minmax(0,12rem)`),
 * **header/footer spanning both columns**, and **`min-h-0`** on the main cell so nested overflow can
 * scroll if you add long content later.
 */
export function GridPatternExample() {
  return (
    <section
      aria-labelledby="grid-shell-heading"
      className="p-[var(--space-inset-md)]"
    >
      <h2 id="grid-shell-heading" className="sr-only">
        Two-dimensional shell layout
      </h2>
      <div
        className="grid grid-cols-1 gap-x-[var(--space-gutter-md)] gap-y-[var(--space-stack-md)] md:min-h-[12rem] md:grid-cols-[minmax(0,12rem)_1fr] md:grid-rows-[auto_1fr_auto]"
      >
        <header className="rounded-lg border border-zinc-200 p-[var(--space-inset-sm)] md:col-span-2 dark:border-zinc-700">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            Header — spans full grid width (`md:col-span-2`)
          </p>
        </header>
        <aside className="rounded-lg border border-zinc-200 p-[var(--space-inset-sm)] dark:border-zinc-700">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Sidebar</p>
          <p className="mt-[var(--space-cluster)] text-xs text-zinc-600 dark:text-zinc-400">
            First column track; gutter to main is column-gap on the parent.
          </p>
        </aside>
        <main className="min-h-0 rounded-lg border border-zinc-200 p-[var(--space-inset-sm)] md:min-h-[6rem] dark:border-zinc-700">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Main</p>
          <p className="mt-[var(--space-cluster)] text-xs text-zinc-600 dark:text-zinc-400">
            Second column; row-gap separates this band from header/footer.
          </p>
        </main>
        <footer className="rounded-lg border border-zinc-200 p-[var(--space-inset-sm)] md:col-span-2 dark:border-zinc-700">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            Footer — spans both columns; same gutter tokens as the rest of the grid.
          </p>
        </footer>
      </div>
    </section>
  );
}

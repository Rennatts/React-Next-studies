/**
 * ## Split pattern (spacing / layout)
 *
 * **Problem it solves:** A row of unrelated siblings on `justify-content: space-between` creates
 * uneven “gutters” between items, and teams push **physical** `margin-left: auto` on the last chip
 * to “reach” the primary button—**RTL breaks**, wrapping becomes unpredictable, and spacing review
 * cannot distinguish **start cluster** vs **end cluster** vs **middle void**.
 *
 * **What the pattern does:** Treat the row as **exactly two flex children**—a **start cluster**
 * and an **end cluster**—so free space lives **between** groups, not between every icon. **Inside**
 * each cluster, use **`gap`** with **cluster / inline** tokens from your layer model; the **middle**
 * is usually **no dedicated token**—it is whatever remains after `min-width` and flex rules.
 * Prefer **logical** properties (`margin-inline-start: auto` on the end cluster, or
 * `justify-between` on two wrappers) so **LTR/RTL** stay correct.
 *
 * **How this file implements it:** One `header` uses `justify-between` with **two** children: a
 * `div` (brand + subtitle) and a `nav` (secondary + primary actions). Each child is an
 * `inline-flex` row with `gap-[var(--space-cluster)]`. The start cluster gets **`min-w-0`** so
 * long titles can **truncate** instead of crushing the actions.
 *
 * **Alternative recipe** (not shown here): one flex row with `gap` on the bar, first cluster
 * flexed, second cluster with **`ms-auto`** (`margin-inline-start: auto`) when you need the pair
 * to stay split after **wrap**—document which recipe your system allows.
 *
 * Full narrative lives in `README.md` → **Pattern: split** in this folder.
 */
export function SplitPatternExample() {
  return (
    <header
      role="banner"
      className="flex min-h-12 items-center justify-between border-b border-zinc-200 px-[var(--space-inset-md)] py-[var(--space-stack-sm)] dark:border-zinc-800"
    >
      <div className="flex min-w-0 items-center gap-[var(--space-cluster)]">
        <span className="truncate font-semibold text-zinc-900 dark:text-zinc-50">Acme</span>
        <span className="hidden truncate text-sm text-zinc-600 sm:inline dark:text-zinc-400">
          Dashboard
        </span>
      </div>
      <nav
        aria-label="Toolbar actions"
        className="flex shrink-0 items-center gap-[var(--space-cluster)]"
      >
        <button
          type="button"
          className="rounded-md border border-zinc-300 px-[var(--space-inline)] py-[var(--space-micro)] text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          Cancel
        </button>
        <button
          type="button"
          className="rounded-md bg-zinc-900 px-[var(--space-inline)] py-[var(--space-micro)] text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Save
        </button>
      </nav>
    </header>
  );
}

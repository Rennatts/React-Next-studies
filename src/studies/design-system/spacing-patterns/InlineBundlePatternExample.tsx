/**
 * ## Inline-bundle pattern (spacing)
 *
 * **Problem it solves:** Spacing between related pills or icons is done with **`margin-inline-end`**
 * on every child but the last—RTL breaks, **wrap** breaks, and the last item often grows a
 * **magic margin** to “push away” the primary button instead of the **parent row** owning that
 * separation (see [split](./README.md#pattern-split)).
 *
 * **What the pattern does:** Wrap the related items in **one** flex container (`flex` or
 * **`inline-flex`**) and apply **a single `gap`** token (**cluster** / **inline** scale). **Inside**
 * the bundle = one rhythm; **space between this bundle and siblings** = **parent** `gap`, split,
 * stack, or region rules—**not** extra margins on the outer chips.
 *
 * **Contrast with [inline](./README.md#pattern-inline):** True **inline** flow is for **text-line**
 * semantics (baseline, wrapping like words). **Inline-bundle** is **Flex + `gap`** for **UI
 * chrome** (filters, compact actions) even when the wrapper is `inline-flex` sitting beside copy.
 *
 * **How this file implements it:** A **`role="group"`** filter chip row uses **`flex flex-wrap`**,
 * **`items-center`**, and **`gap-[var(--space-cluster)]`**. Each chip is a **`button`** (keyboard
 * reachable); the group is **`aria-labelledby`** the visible heading. No margins between chips—
 * only **`gap`**.
 */
export function InlineBundlePatternExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-[var(--space-inset-sm)] dark:border-zinc-700">
      <p
        id="inline-bundle-filter-label"
        className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
      >
        Filter by status
      </p>
      <div
        className="mt-[var(--space-cluster)] flex flex-wrap items-center gap-[var(--space-cluster)]"
        role="group"
        aria-labelledby="inline-bundle-filter-label"
      >
        {(["All", "Draft", "Published", "Archived"] as const).map((label) => (
          <button
            key={label}
            type="button"
            className="rounded-full border border-zinc-300 bg-white px-[var(--space-inline)] py-[var(--space-micro)] text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

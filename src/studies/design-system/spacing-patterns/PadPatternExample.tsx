/**
 * ## Pad pattern (spacing)
 *
 * **Problem it solves:** Content sits flush against **borders** or **full-bleed** edges, or teams
 * use **`margin` on every child** to “inset” content—margins **collapse**, **double up** with the
 * parent’s own spacing, and **do not** define the relationship between **chrome** (border,
 * shadow, background) and **content** the way **padding** does.
 *
 * **What the pattern does:** Apply **`padding`** (or logical **`padding-inline` / `padding-block`**)
 * on the **surface that owns the box**: card body, modal frame, table cell, toolbar strip. Map
 * steps to **inset** semantic tokens (`space.inset.sm` …). **Symmetric** pad uses the same token on
 * all sides; **asymmetric** (“squish”) pad uses **larger horizontal** and **tighter vertical** steps
 * for dense bars—still **padding**, not sibling **`gap`** (that is for flex/grid **between**
 * children, not border-to-text).
 *
 * **Contrast with [layers](./README.md#pattern-layers-structural) region:** “Pad” names the
 * **mechanism** (padding on the container); **region inset** is the **role** in the layer table—
 * same tokens, explicit rule: **inside the border, use pad; between siblings, use gap or
 * margin per your stack/split docs.**
 *
 * **How this file implements it:** An **outer card** uses **symmetric** `p-[var(--space-inset-md)]`.
 * An **inner toolbar** uses **squish** `px-[var(--space-inset-lg)] py-[var(--space-stack-sm)]` so
 * the bar feels **wider breath** than **tall**—both axes tokenized, no magic pixels.
 */
export function PadPatternExample() {
  return (
    <article
      aria-labelledby="pad-card-title"
      className="max-w-md rounded-xl border border-zinc-200 bg-white p-[var(--space-inset-md)] shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
    >
      <h2
        id="pad-card-title"
        className="text-base font-semibold text-zinc-900 dark:text-zinc-50"
      >
        Workspace
      </h2>
      <p className="mt-[var(--space-cluster)] text-sm text-zinc-600 dark:text-zinc-400">
        The card uses symmetric inset padding between the border and this copy.
      </p>

      <div className="mt-[var(--space-stack-md)] rounded-lg border border-zinc-200 bg-zinc-50 px-[var(--space-inset-lg)] py-[var(--space-stack-sm)] dark:border-zinc-600 dark:bg-zinc-800/60">
        <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Toolbar strip — asymmetric pad (wider inline, tighter block) keeps controls dense without
          crushing horizontal rhythm.
        </p>
        <div className="mt-[var(--space-cluster)] flex flex-wrap gap-[var(--space-cluster)]">
          <button
            type="button"
            className="rounded border border-zinc-300 bg-white px-[var(--space-inline)] py-[var(--space-micro)] text-xs font-medium text-zinc-800 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200"
          >
            Share
          </button>
          <button
            type="button"
            className="rounded border border-zinc-300 bg-white px-[var(--space-inline)] py-[var(--space-micro)] text-xs font-medium text-zinc-800 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200"
          >
            Export
          </button>
        </div>
      </div>
    </article>
  );
}

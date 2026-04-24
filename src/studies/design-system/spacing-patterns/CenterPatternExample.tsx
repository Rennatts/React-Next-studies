/**
 * ## Center pattern (spacing / layout)
 *
 * **Problem it solves:** Copy and forms **span the full viewport width** on large screens—**line
 * length** becomes hard to read—or every screen invents its own **`calc`** / **`transform`** hack
 * to “put this in the middle.” There is no shared **measure** token or predictable **inline-axis**
 * alignment.
 *
 * **What the pattern does:** Give the **content block** a **maximum width** (readable measure or
 * layout token) and **center it in the inline direction** with **`margin-inline: auto`** (Tailwind
 * **`mx-auto`**) on that block **or** with **`justify-center`** on a full-width flex parent—pick
 * one recipe per system. Pair with **page-inline** padding (`px-*` on the same wrapper or an outer
 * shell) so text never kisses the viewport edge on small screens.
 *
 * **Optional variant:** **Vertical** centering (hero, empty state) uses **`min-height`** +
 * **flex** **`items-center`** on a **tall parent**—different concern from **measure centering**;
 * document both if your “Center” primitive bundles them.
 *
 * **Relation to [layers](./README.md#pattern-layers-structural):** Often lives at **page / shell**
 * next to **`space.page.inline`**. Complements [grid](./README.md#pattern-grid) / [columns](./README.md#pattern-columns):
 * a **single** centered column is not a multi-track grid—it is **one box** with a **cap width**.
 *
 * **How this file implements it:** Outer band has **vertical pad**; inner wrapper is **`mx-auto`**
 * **`max-w-[var(--layout-measure,42rem)]`** with **`px-[var(--space-page-inline)]`** so the column
 * is centered and **gains side inset** when the viewport is narrow.
 */
export function CenterPatternExample() {
  return (
    <div className="border-y border-zinc-200 bg-zinc-50 py-[var(--space-stack-lg)] dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="mx-auto w-full max-w-[var(--layout-measure,42rem)] px-[var(--space-page-inline)]">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Centered measure
        </h2>
        <p className="mt-[var(--space-cluster)] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          This block uses a capped width and <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">
            mx-auto
          </code>{" "}
          so the column sits in the middle of the band. Replace{" "}
          <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">42rem</code> with your
          layout token when the variable is defined.
        </p>
      </div>
    </div>
  );
}

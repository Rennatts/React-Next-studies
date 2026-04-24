/**
 * ## Columns pattern (spacing)
 *
 * **Problem it solves:** “Gutters” implemented as **margin on every column except the last** are
 * hard to maintain, fight **RTL**, break when columns **wrap**, and duplicate the same numeric
 * value in many rules. Spacing between **parallel tracks** should be **one symmetric rhythm**, not
 * N−1 margin declarations.
 *
 * **What the pattern does:** The **parent** that owns the columns applies **`column-gap`** (and
 * optionally a **different** **`row-gap`** when items wrap to new rows)—typically via **CSS Grid**
 * or **flex** with **`gap`**. Use **semantic gutter tokens** (e.g. `--space-gutter-md`) for
 * **inline** separation between tracks, and **stack** tokens for **block** separation between
 * rows when they differ. Pair **track sizing** with **minimum widths** (`minmax(min, 1fr)`,
 * `min-w-0` on overflow) so gutters do not collapse content unreadably.
 *
 * **How this file implements it:** A **`ul`** uses **`display: grid`**, **one column on small
 * screens** and **two from `md` up**, with **`gap-x`** = gutter token and **`gap-y`** = stack token
 * (different roles, as many systems document). Each **`li`** is a simple “card” with **region
 * inset** padding on the cell—**gutter stays on the grid**, not inside every leaf as fake margin.
 *
 * **Contrast with split:** Columns repeat the **same gutter** between **N** tracks; split pushes
 * **two clusters** to **start/end** with a **flexible middle** that is often **not** a gutter
 * token. See `README.md` → **Pattern: columns** and **Columns vs split**.
 */
export function ColumnsPatternExample() {
  return (
    <section
      aria-labelledby="columns-heading"
      className="p-[var(--space-inset-md)]"
    >
      <h2 id="columns-heading" className="sr-only">
        Feature columns
      </h2>
      <ul className="grid grid-cols-1 gap-x-[var(--space-gutter-md)] gap-y-[var(--space-stack-md)] md:grid-cols-2">
        <li className="rounded-lg border border-zinc-200 p-[var(--space-inset-sm)] dark:border-zinc-700">
          <h3 className="font-medium text-zinc-900 dark:text-zinc-50">First track</h3>
          <p className="mt-[var(--space-cluster)] text-sm text-zinc-600 dark:text-zinc-400">
            Gutter between columns is owned by the grid parent via the column-gap token.
          </p>
        </li>
        <li className="rounded-lg border border-zinc-200 p-[var(--space-inset-sm)] dark:border-zinc-700">
          <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Second track</h3>
          <p className="mt-[var(--space-cluster)] text-sm text-zinc-600 dark:text-zinc-400">
            Row gap when wrapping uses a separate stack token from the same README table.
          </p>
        </li>
        <li className="rounded-lg border border-zinc-200 p-[var(--space-inset-sm)] md:col-span-2 dark:border-zinc-700">
          <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Full-width row (optional span)</h3>
          <p className="mt-[var(--space-cluster)] text-sm text-zinc-600 dark:text-zinc-400">
            Spans are documented separately; gutter still belongs to the grid container.
          </p>
        </li>
      </ul>
    </section>
  );
}

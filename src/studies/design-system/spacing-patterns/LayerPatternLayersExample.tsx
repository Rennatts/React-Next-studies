/**
 * ## Structural layers pattern (spacing)
 *
 * **Problem it solves:** Without a layer model, spacing drifts: every screen picks ad-hoc margins,
 * the same “breathing room” gets applied twice (section margin *and* repeated card padding), and
 * small components absorb page-level gaps—so density tweaks and theming require hunting values
 * across the tree. Reviewers cannot ask “is this gap page, region, or stack?” because nothing
 * encodes that intent.
 *
 * **What the pattern does:** Treat the UI as nested frames and assign **one semantic role** per
 * level—**page** (viewport/shell), **region** (card/dialog inset), **stack** (gaps between sibling
 * blocks in a column), **cluster** (tight label+control groups), **inline/micro** (inside controls).
 * Prefer **`gap`** on the parent that defines sibling relationships; use **padding** for region
 * inset; keep **section-level** separation at the layout that owns the relationship between major
 * blocks. `--space-*` names here are illustrative; in production they come from your **token**
 * pipeline (JSON → CSS variables or generated utilities).
 *
 * **How this file maps the example:** `main` → page padding; `article` → region inset + margin
 * between this card and what follows; inner column → stack gap between field groups; each
 * label+input wrapper → cluster gap; button → micro/inline padding—not outer layout margins.
 *
 * Full narrative (split, columns, grid, etc.) lives in `README.md` in this folder.
 */
export function LayerPatternLayersExample() {
  return (
    <main className="px-[var(--space-page-inline)] py-[var(--space-page-block)]">
      <article
        className="mb-[var(--space-section)] p-[var(--space-inset-md)]"
        aria-labelledby="card-title"
      >
        <h2 id="card-title">Account</h2>
        <div className="mt-[var(--space-stack-sm)] flex flex-col gap-[var(--space-stack-md)]">
          <div className="flex flex-col gap-[var(--space-cluster)]">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" autoComplete="email" />
          </div>
          <div className="flex flex-col gap-[var(--space-cluster)]">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" autoComplete="name" />
          </div>
        </div>
        <footer className="mt-[var(--space-stack-lg)] pt-[var(--space-stack-md)]">
          <button
            type="button"
            className="px-[var(--space-inline)] py-[var(--space-micro)]"
          >
            Save
          </button>
        </footer>
      </article>
    </main>
  );
}

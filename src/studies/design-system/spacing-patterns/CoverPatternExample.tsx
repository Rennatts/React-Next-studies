/**
 * ## Cover pattern (spacing / layout)
 *
 * **Problem it solves:** On **short pages**, the **footer** rides up under the content and the
 * middle of the screen feels **empty**; teams add **magic `min-height`** on random wrappers or
 * **`position: fixed`** footers that **overlap** content on small viewports. There is no shared
 * recipe for “**fill at least the viewport** (or a panel), **bookend** chrome, **grow** the main
 * band.”
 *
 * **What the pattern does:** A **column flex** (or grid row template) with **`min-height`** on the
 * **outer shell**—often **`100dvh`** or **`100svh`** for full viewports so **mobile dynamic toolbars**
 * behave better than raw **`100vh`**. **Header** and **footer** are **`flex-shrink: 0`** (or
 * content-sized rows); **main** uses **`flex-grow: 1`** (`flex-1`) so it **absorbs leftover
 * block-axis space**. Optional: vertically **center** content inside `main` with **`justify-center`**
 * when the design wants a **hero** feel. **Padding** on the shell or on `main` still uses **pad /
 * page** tokens from your [layers](./README.md#pattern-layers-structural) doc.
 *
 * **Contrast with [center](./README.md#pattern-center):** **Center** caps **inline width**;
 * **cover** distributes **block-axis** space so a region **fills a minimum height**.
 *
 * **How this file implements it:** A **bounded demo height** (`min-h-[18rem]`) stands in for
 * **`min-h-dvh`** in real shells so the sample fits in documentation; structure is **`flex flex-col`**
 * + **`shrink-0`** header/footer + **`flex-1`** main with a subtle **grow** background so the
 * pattern is visible without scrolling the whole app.
 */
export function CoverPatternExample() {
  return (
    <div className="flex min-h-[18rem] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
      <header className="shrink-0 border-b border-zinc-200 px-[var(--space-inset-md)] py-[var(--space-stack-sm)] text-sm font-medium text-zinc-900 dark:border-zinc-700 dark:text-zinc-50">
        Header (does not shrink)
      </header>
      <main className="flex flex-1 flex-col justify-center bg-zinc-50 px-[var(--space-inset-md)] py-[var(--space-stack-md)] dark:bg-zinc-800/50">
        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <code className="rounded bg-zinc-100 px-1 font-mono text-xs dark:bg-zinc-800">main</code>{" "}
          uses <code className="rounded bg-zinc-100 px-1 font-mono text-xs dark:bg-zinc-800">flex-1</code>{" "}
          so this band grows to fill space between header and footer. In production, the outer shell
          often uses <code className="rounded bg-zinc-100 px-1 font-mono text-xs dark:bg-zinc-800">
            min-h-dvh
          </code>{" "}
          (or <code className="rounded bg-zinc-100 px-1 font-mono text-xs dark:bg-zinc-800">100dvh</code>
          ) instead of a fixed demo height.
        </p>
      </main>
      <footer className="shrink-0 border-t border-zinc-200 px-[var(--space-inset-md)] py-[var(--space-stack-sm)] text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
        Footer (does not shrink)
      </footer>
    </div>
  );
}

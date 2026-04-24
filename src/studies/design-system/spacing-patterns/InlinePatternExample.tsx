/**
 * ## Inline pattern (spacing / typography)
 *
 * **Problem it solves:** Mid-sentence icons and pills are wrapped in **`display: flex` + `gap`**
 * everywhere, which can **break baseline alignment** with body copy, confuse **screen reader**
 * phrasing (extra flex containers), and fight **natural text wrap**. True **inline** flow keeps
 * pieces on the **same line box** as surrounding words.
 *
 * **What the pattern does:** Use **inline / inline-block / inline-flex** (as a single atomic
 * control) inside a **paragraph** or heading. Prefer **token-backed margins** on the non-text
 * piece (`margin-inline-start` on an icon or badge) or an explicit **`{' '}`** / thin separator—
 * not flex **`gap`** between every token. Watch **JSX whitespace**: line breaks between tags can
 * become stray spaces; document whether teams use **margins** or **tight `{}` text nodes** for
 * predictable rhythm.
 *
 * **Contrast with [inline-bundle](./README.md#pattern-inline-bundle):** Bundles are **Flex + one
 * `gap`** for **toolbar-like clusters**. Inline is **line-box** semantics—**`vertical-align`**
 * (e.g. **`align-middle`** on `inline-block` icons) and **margins**, not a gap between every chip.
 *
 * **How this file implements it:** One **`p`** holds copy, a **link**, then an **`inline-block`**
 * icon with **`ms-[var(--space-inline)]`** and **`align-middle`**. Explicit **`{' '}`** nodes show
 * intentional word spaces; the icon includes **`aria-hidden`** plus **screen-reader-only** hint
 * text for “opens in new tab” style cues.
 */
export function InlinePatternExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-[var(--space-inset-md)] dark:border-zinc-700">
      <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        See{" "}
        <a
          href="https://example.com/pricing"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-zinc-900 underline underline-offset-2 dark:text-zinc-50"
        >
          pricing
        </a>
        <span className="ms-[var(--space-inline)] inline-block align-middle text-zinc-500 dark:text-zinc-400">
          <span className="sr-only">(opens in a new tab)</span>
          <svg
            aria-hidden
            className="h-3.5 w-3.5"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M4.75 3.5h6.5a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0V5.56l-7.22 7.22a.75.75 0 0 1-1.06-1.06l7.22-7.22H4.75a.75.75 0 0 1 0-1.5z" />
          </svg>
        </span>{" "}
        for billing options.
      </p>
    </div>
  );
}

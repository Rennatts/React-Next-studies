import Image from "next/image";

/** Placeholder SVG (no network): 800×450 for intrinsic sizing hints. */
const MEDIA_DEMO_SRC =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#52525b"/><stop offset="1" stop-color="#18181b"/></linearGradient></defs><rect width="800" height="450" fill="url(#g)"/></svg>',
  );

/**
 * ## Media-wrapper pattern (spacing / layout)
 *
 * **Problem it solves:** Raw **`<img>`**, **`<video>`**, or embeds **stretch the layout** (wide
 * overflow), **jump** the page when they load (**CLS**), or look **letterboxed wrong** inside cards
 * and carousels. Spacing tokens do not help if the **media element** is not framed by a predictable
 * **box**.
 *
 * **What the pattern does:** Wrap media in a **container** that owns **aspect ratio** (CSS
 * **`aspect-ratio`**, or legacy **padding-top** hacks where needed), **`overflow: hidden`** when
 * paired with **radius**, and **max width** relative to the parent. The **inner** media uses
 * **`width/height` attributes** (or explicit dimensions) for the **reserved box**, then
 * **`object-fit: cover` / `contain`** (or **`fill`** for maps) so crops are intentional. **Captions**
 * and **pads** sit **outside** the ratio box or in a **stack** below it—see [layers](./README.md#pattern-layers-structural)
 * and [pad](./README.md#pattern-pad).
 *
 * **Relation to [center](./README.md#pattern-center):** The **figure** or card often sits in a
 * centered column; the **wrapper** still caps **how tall/wide** the media band is inside that
 * column.
 *
 * **How this file implements it:** **`aspect-video`** wrapper, **`overflow-hidden`** + **radius**
 * on the **figure**, **`img`** with **`width` / `height`**, **`className="h-full w-full object-cover"`**,
 * and a **caption** with **inset** padding tokens.
 */
export function MediaWrapperPatternExample() {
  return (
    <figure className="mx-auto max-w-lg overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
      <div className="aspect-video w-full bg-zinc-900">
        <Image
          src={MEDIA_DEMO_SRC}
          alt="Decorative gradient placeholder for a responsive media frame demo"
          width={800}
          height={450}
          className="h-full w-full object-cover"
          unoptimized
        />
      </div>
      <figcaption className="px-[var(--space-inset-sm)] pb-[var(--space-inset-sm)] pt-[var(--space-cluster)] text-xs leading-snug text-zinc-600 dark:text-zinc-400">
        Wrapper sets <strong className="text-zinc-800 dark:text-zinc-200">aspect ratio</strong> and
        clips rounded corners; the image fills the box with{" "}
        <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">object-cover</code>. Swap the{" "}
        <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">src</code> for real assets; keep
        the same framing structure.
      </figcaption>
    </figure>
  );
}

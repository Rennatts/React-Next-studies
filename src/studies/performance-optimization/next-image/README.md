# Image optimization (`next/image`)

Next.js provides **`next/image`**, an `<img>` replacement that **lazy-loads** by default, serves **modern formats** when the browser supports them, and can **resize** sources to the dimensions you request—so you ship fewer bytes and avoid layout shift when you supply **width and height** (or **`fill`** with a sized parent).

## Why use it

- **Layout stability**: explicit dimensions (or `fill` + reserved box) reduce **CLS** (Cumulative Layout Shift).
- **Right-sized assets**: the optimizer can generate widths appropriate for `sizes` and DPR.
- **Lazy loading**: images below the fold defer until near the viewport (unless you opt out with **`priority`** for **LCP** candidates).

## Common props

| Prop | Role |
|------|------|
| **`src`** | Static import, path under `/public`, or **allowlisted** remote URL. |
| **`width` / `height`** | Intrinsic box; use with fixed layouts or CSS `width: 100%; height: auto` for fluid width. |
| **`fill`** | Stretches to **parent** (`position: relative` + explicit height); pair with **`object-fit`** and **`sizes`**. |
| **`sizes`** | Tells the browser which **slot width** to pick from the responsive `srcset`—**critical** for full-width or `fill` images. |
| **`priority`** | **Eager** load; use for the **LCP** image (usually one per route). |
| **`placeholder="blur"`** | Optional blur while loading; with **static imports** you get a generated blur hash; for remote URLs supply **`blurDataURL`** yourself. |
| **`quality`** | 1–100; default is high—tune for thumbnails vs hero. |

## Remote images

Remote `src` values must be **explicitly allowed** in `next.config` (`images.remotePatterns` or legacy `domains`). This blocks accidental hotlinking to arbitrary hosts.

This study’s demo uses **picsum.photos**; see `next.config.mjs` in the repo root.

## When not to use the optimizer

- **Tiny** icons where a single SVG or sprite is simpler.
- Some **CMS** workflows that already deliver a CDN URL with every variant—still often worth `next/image` for lazy + `sizes`, or use **`unoptimized`** if you must pass through unchanged.

## Related in this repo

- [Code splitting and lazy loading](../code-splitting-lazy-loading/README.md) — complementary bundle-size work.  
- [Font optimization (next/font)](../font-optimization/README.md) — LCP often pairs image weight with font loading.  

## Further reading

- [Next.js Image optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)  
- [web.dev — Optimize LCP](https://web.dev/articles/optimize-lcp)

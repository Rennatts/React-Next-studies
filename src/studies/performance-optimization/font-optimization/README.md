# Font optimization (`next/font`)

**`next/font`** downloads fonts at **build time** and serves them from your **own origin**—no extra round trip to Google Fonts in the browser, better **privacy**, and predictable caching. Next also injects **`size-adjust`** fallbacks so system fonts reserve similar space and **CLS** stays low while the webfont loads.

## `next/font/google`

Import a font from the [Google catalog](https://fonts.google.com/) with tree-shaken **subsets** (only the glyphs you list) and optional **weights** / **styles**.

Typical options:

| Option | Role |
|--------|------|
| **`subsets`** | e.g. `["latin"]` — include only scripts you need. |
| **`display`** | Prefer **`"swap"`** so text shows immediately with a fallback, then swaps when the font loads. |
| **`weight`** / **`style`** | For non-variable fonts, list what you use to avoid shipping unused files. |
| **`variable`** | Exposes a **CSS variable** (e.g. `--font-inter`) for Tailwind `fontFamily` extension. |
| **`adjustFontFallback`** | Tweak automatic fallback metrics (advanced). |

Apply with **`className`** on a layout wrapper or on `<html>` / `<body>` in the root layout.

## `next/font/local`

Use **`src`** pointing to files under your repo (e.g. `.woff2` in `public/` or `src/fonts/`). Same `display`, `variable`, and weight axes as documented for your files.

This repo’s root `app/layout.tsx` already loads **Geist** with **`next/font/local`** and exposes CSS variables on `<body>`—open that file to see a production-style pattern alongside this study’s Google-font layout.

## Where to declare fonts

- **Route segment `layout.tsx`**: scope a font to one study or section (this repo does that for the font study).
- **Root `app/layout.tsx`**: site-wide primary UI font.
- **Colocated in a Server Component**: fine for a second font on one page (see `FontOptimizationDemo.tsx`).

## Pairing with Tailwind

If you use **`variable: "--font-sans"`**, extend `theme.fontFamily` to `["var(--font-sans)", "system-ui", ...]` so utilities stay consistent.

## Related in this repo

- [Image optimization (next/image)](../next-image/README.md) — LCP is often **image + font** together; optimize both.  
- [Code splitting and lazy loading](../code-splitting-lazy-loading/README.md) — fonts are separate from JS bundle splitting but both affect first paint.

## Further reading

- [Next.js Font optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)  
- [web.dev — Font best practices](https://web.dev/articles/font-best-practices)

# Layouts and nested layouts (Next.js App Router)

A **`layout.tsx`** file defines **shared UI** for a **route segment** and **all routes below it**. Layouts **nest**: outer segments wrap inner segments, so the final tree is **root `app/layout.tsx`** → … → **your segment layout** → **child layout** → **`page.tsx`**.

## Rules of thumb

- **Persisting chrome** (nav, sidebars, headers that should not remount on child navigation) belongs in **`layout.tsx`**.
- **Remounting on every navigation** within the segment is what **`template.tsx`** does instead—use rarely when you need a fresh subtree.
- Layouts are **Server Components by default** unless you add **`"use client"`** (e.g. for a client-only sidebar state).
- **`{children}`** is where the **deeper** segment renders: either another layout + page or just a page.

## Nesting order

For URL `/a/b/c`:

1. `app/layout.tsx` (root: usually `<html>`, `<body>`)
2. `app/a/layout.tsx`
3. `app/a/b/layout.tsx` (if present)
4. `app/a/b/c/page.tsx` (leaf UI inside the innermost layout’s `{children}`)

Each layout **wraps** the next level; they do **not** replace each other.

## Live demo in this repo

The study route installs **two** real layout files:

| File | URL |
|------|-----|
| `src/app/studies/next-server/layouts-and-nested-layouts/layout.tsx` | `/studies/next-server/layouts-and-nested-layouts` and all children |
| `src/app/studies/next-server/layouts-and-nested-layouts/nested-demo/layout.tsx` | `/studies/next-server/layouts-and-nested-layouts/nested-demo` only |

Open both URLs and watch the **colored strips** stack: segment layout, then nested layout, then page content.

## Reference snippets

| File | Role |
|------|------|
| `LayoutsNestedLayoutsExamples.tsx` | Copy-paste patterns (root shell, nested dashboard, `children`, template vs layout, metadata). |

## Related

- [File-based routing](../file-based-routing/README.md) — how folders map to URLs and special files.  
- [Server-side in the App Router](../server-side/README.md) — data fetching and Server Actions in layout trees.  
- [Async App Router rendering](../../advanced-concepts/async-react-router/README.md) — `loading.tsx` / `error.tsx` with segments.

## Further reading

- [Layouts and Pages](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)  
- [Nesting Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#nesting-layouts)

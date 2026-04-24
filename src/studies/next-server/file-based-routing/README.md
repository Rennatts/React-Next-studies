# File-based routing (Next.js App Router)

Next maps **folders under `app/`** to **URL segments**. Special filenames declare UI, handlers, and loading/error behavior—**no central `routes` config** like some frameworks.

This topic is **Next-specific**: it describes the **App Router** (`app/`). The older **Pages Router** (`pages/`) uses different files (`pages/about.tsx` → `/about`); new work should prefer `app/`.

## Core files

| File | Role |
|------|------|
| **`page.tsx`** | Makes the segment **routable**; exports the default React tree for that path. |
| **`layout.tsx`** | **Shared shell** for the segment and its children; nests outward to root `app/layout.tsx`. |
| **`loading.tsx`** | Wraps the segment in **Suspense**; instant fallback while the segment’s async work runs. |
| **`error.tsx`** | **Error boundary** for the segment (Client Component boundary in practice). |
| **`not-found.tsx`** | UI when **`notFound()`** is thrown or no matching route. |
| **`route.ts`** | **HTTP Route Handler** (`GET`, `POST`, …)—not a React page. Details: [Route Handlers](../route-handlers/README.md). |
| **`middleware.ts`** (project root, often `src/`) | Runs **before** the request; matches **paths** via `config.matcher`, not a folder under `app/`. See [Middleware](../middleware/README.md). |
| **`template.tsx`** | Like layout but **remounts** on navigation (use sparingly). |
| **`default.tsx`** | Used with **parallel routes** (`@slot`) when a slot has no active URL match. |

## Dynamic segments

- **`[id]`** — one dynamic path piece (`/posts/42` → `params.id`).
- **`[...slug]`** — catch-all (`/docs/a/b` → array).
- **`[[...slug]]`** — optional catch-all (segment may be absent).

## Route groups & organization

- **`(groupName)/`** — **parentheses**: folder for **organization only**; **does not** add a URL segment.
- **`_components/`** — leading underscore is a **colocation** convention some teams use; it is **not** a special Next.js “private route” primitive—prefer **`(group)`** or a non-route folder outside `app/` for shared UI.

## Examples in this repo

| File | Role |
|------|------|
| `FileBasedRoutingExamples.tsx` | Copy-paste **patterns** (this page’s “code only” section). |

Concrete routes in this project include e.g. `src/app/studies/next-server/server-components/page.tsx` → `/studies/next-server/server-components`.

## Related

- [Layouts and nested layouts](../layouts-and-nested-layouts/README.md) — `layout.tsx`, nesting, live demo routes.  
- [Async App Router rendering](../../advanced-concepts/async-react-router/README.md) — `loading` / `error` in context.  
- [Server-side in the App Router](../server-side/README.md) — data, caching, Server Actions.

## Further reading

- [Defining Routes](https://nextjs.org/docs/app/building-your-application/routing/defining-routes)  
- [Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)  
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

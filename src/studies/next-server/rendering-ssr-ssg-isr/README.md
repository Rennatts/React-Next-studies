# SSR, SSG, and ISR (Next.js App Router)

These names come from the **Pages Router** era, but the **ideas** still apply in the **App Router**—they map to whether a route is **static** (built ahead / cached) or **dynamic** (per-request), and whether data can **revalidate** on a timer (**ISR**).

## Mental model map

| Classic term | Idea | Typical App Router signals |
|--------------|------|-----------------------------|
| **SSR** — *Server-Side Rendering* | HTML (and RSC payload) produced **per request** (or whenever the route is dynamic). | `export const dynamic = 'force-dynamic'`, `fetch(..., { cache: 'no-store' })`, **`cookies()`** / **`headers()`** / **`searchParams`** on the page, etc. |
| **SSG** — *Static Site Generation* | Prerender at **build** (or fully static cache); same output until rebuilt or revalidated. | Default **`fetch`** caching in RSC, `export const dynamic = 'force-static'`, **`generateStaticParams`** for known paths. |
| **ISR** — *Incremental Static Regeneration* | Serve a **cached** page, then **refresh** it in the background after **N seconds**. | `fetch(url, { next: { revalidate: N } })`, or segment **`export const revalidate = N`**. |

Exact caching and static generation depend on **Next version**, **hosting** (Vercel, self-hosted Node, etc.), and **whether the segment is fully static**—always verify in the docs for your release.

## App Router vs Pages Router (quick)

| Pages Router | App Router equivalent (conceptual) |
|--------------|--------------------------------------|
| `getServerSideProps` | Dynamic Server Components + `fetch` / dynamic APIs |
| `getStaticProps` | Static segment + cached `fetch` or build-time data |
| `getStaticProps` + `revalidate` | `next.revalidate` or segment `revalidate` |

## Example in this repo

[`ServerSideRscFetchDemo.tsx`](../server-side/ServerSideRscFetchDemo.tsx) uses **`fetch(..., { next: { revalidate: 60 } })`** — **ISR-style** behavior for that component’s data (subject to route static/dynamic rules).

## Reference snippets

See **`RenderingModesExamples.tsx`**.

## Related

- [Server-side in the App Router](../server-side/README.md) — full server data, Server Actions, `fetch` defaults.  
- [Route Handlers](../route-handlers/README.md) — HTTP `route.ts` caching knobs.  
- [File-based routing](../file-based-routing/README.md) — segment layout and `page.tsx`.

## Further reading

- [Rendering and caching](https://nextjs.org/docs/app/building-your-application/rendering)  
- [Data fetching and caching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)

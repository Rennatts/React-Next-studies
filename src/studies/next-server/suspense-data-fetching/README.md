# Suspense for data fetching (Next.js App Router)

In the **App Router**, **React Suspense** is the main primitive for **streaming UI**: show fallbacks while **async Server Components** (or lazy client boundaries) resolve. Next also maps **`loading.tsx`** onto a Suspense boundary for the route segment.

## Mental model (RSC)

- An **`async` Server Component** that **`await`s** data behaves like a “suspending” unit: React can **flush** earlier HTML (shell + fallbacks) first, then **stream** more HTML when work completes.
- **`Suspense`** with a **`fallback`** declares where placeholders appear. **Several siblings** can resolve **in parallel** and stream in as they finish.
- **Nested** Suspense boundaries let an outer shell appear first, then an inner fallback, then inner content—useful for **nested layouts** and **avoiding one giant spinner** for the whole page.

## Next.js specifics

| Mechanism | What it does |
|-----------|----------------|
| **`loading.tsx`** | Special file: wraps the segment’s `page` in Suspense so navigations show instant feedback. |
| **`error.tsx`** | Error UI for the segment (pairs with Suspense/streaming; different concern). |
| **`async` RSC + `fetch`** | Common data pattern; Suspense fallback shows until the component’s awaits complete. |
| **Client `Suspense` + `use()`** | For client-side data or third-party suspense libraries; still `"use client"` and different caching rules. |

Use **`export const dynamic = 'force-dynamic'`** (or other dynamic signals) when you need **request-time** behavior and must not fully prerender slow demos at build time.

## Files in this folder

| File | Role |
|------|------|
| `SuspenseRscStreamingParts.tsx` | Async Server Components used inside Suspense on the study page. |
| `SuspenseDataFetchingExamples.tsx` | Client-only **code snippets** (patterns to copy); live streaming is on the route page. |

## Related in this repo

- [React Server Components](../server-components/README.md) — default server vs client boundaries.  
- [Server-side in the App Router](../server-side/README.md) — RSC, `fetch`, caching.  
- [Async App Router rendering](../../advanced-concepts/async-react-router/README.md) — `loading.tsx` / `error.tsx` at the route level.

## Further reading

- [Streaming with Suspense](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming) (Next.js)  
- [`<Suspense>`](https://react.dev/reference/react/Suspense) (React)

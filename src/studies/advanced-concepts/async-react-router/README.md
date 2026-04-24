# “Async React Router” (Next.js App Router async rendering)

In this project you’re using **Next.js App Router**. Many people informally call it “React router” because routing is expressed as React components and layouts, but the key idea here is: **routes can be async** via **Server Components**.

## Idea in one sentence

- In the App Router, a route segment can render **async Server Components**, and you can show UX states with `loading.tsx` and `error.tsx`.

## Core concepts

### 1) Async Server Components

A `page.tsx` (or any Server Component) can be `async` and `await` data:

- Runs on the server
- Avoids shipping fetch logic to the browser
- Can stream HTML as parts become ready

### 2) `loading.tsx`

If a route segment is waiting on async work, Next can render a `loading.tsx` fallback for that segment.

### 3) `error.tsx`

If a render throws within a segment, `error.tsx` can render a recovery UI (and provide a reset button).

### 4) Streaming + `Suspense`

You can wrap slower subtrees in `<Suspense fallback={...}>` to stream the page progressively.

## Example in this folder

We simulate a slow server fetch and show:

- Route-level `loading.tsx`
- Segment-level streaming via `<Suspense>`

| File | Role |
|------|------|
| `mockServerFetch.ts` | Fake async data with delays. |
| `AsyncRouteDemo.tsx` | Server Components that await and stream. |

## Related

- [File-based routing (App Router)](../../next-server/file-based-routing/README.md) — how `app/` folders and special files map to URLs.

## Try it

Run the app and open `/studies/advanced-concepts/async-react-router`.


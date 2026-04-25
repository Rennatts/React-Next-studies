# BFF (Backend for Frontend)

A **Backend for Frontend (BFF)** is a backend endpoint designed specifically for one frontend (web app, mobile app, partner UI). Instead of the UI calling many upstream services directly, it calls the BFF which:

- Aggregates data from one or more upstream APIs
- Transforms upstream payloads into **UI-friendly** shapes
- Applies frontend-specific authorization, caching, and defaults

## When a BFF helps

- Your UI needs data from **multiple** services and you want to avoid waterfall calls from the browser.
- You need to hide internal API shapes and expose a stable contract to the frontend.
- You want to keep secrets server-only (API keys, service tokens).
- You want different frontends to get different shapes without bloating a “one API fits all” backend.

## Trade-offs

- Another layer to own and deploy.
- If poorly designed, the BFF becomes a “god API” that mixes too many domains.
- Still needs observability and versioning discipline.

## How this demo is built (Next.js App Router)

This repo uses a Next.js **Route Handler** as a lightweight BFF:

- Upstream: `GET /api/studies/products` (mock products API)
- BFF: `GET /api/studies/bff` (calls upstream, then returns a UI model)

The BFF response is intentionally different:

- Upstream returns `priceCents` and pagination fields.
- BFF returns `{ title, price }` for cards and only minimal `meta`.

## Files in this folder

| File | Role |
|------|------|
| `BffDemo.tsx` | Client UI that calls the BFF endpoint and renders “cards”. |
| `src/app/api/studies/bff/route.ts` | The BFF Route Handler (server): calls upstream and reshapes response. |

## Related in this repo

- [Building an API layer](../api-layer/README.md) — typed client wrappers; this demo reuses `requestJson<T>()`.  
- [Route Handlers](../../next-server/route-handlers/README.md) — Next.js API endpoints under `app/**/route.ts`.  
- [Separation of concerns](../../project-architecture/separation-of-concerns/README.md) — keep transport vs UI responsibilities separate.

## Try it

Run the app and open `/studies/api/bff-backend-for-frontend`.


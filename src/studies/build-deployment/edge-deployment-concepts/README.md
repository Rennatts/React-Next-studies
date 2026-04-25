# Edge deployment concepts

“Edge” means running code **close to the user** (many geographically distributed points of presence) to reduce latency and enable request interception before it reaches your origin.

In Next.js, “Edge” usually refers to the **Edge runtime** (not Node.js) used by:

- `middleware.ts`
- Some Route Handlers / pages configured for Edge
- CDN-like caching layers around static assets

## Why edge exists

- **Lower latency** for global audiences (auth redirects, A/B routing, geolocation-based behavior).
- **Early request decisions** (redirects, rewrites, blocking) before hitting server rendering.
- **Offload** simple work from origin/serverless functions.

## Edge runtime vs Node runtime (critical differences)

Edge runtime is not full Node.js. Common constraints:

- No (or limited) access to Node APIs like `fs`, some crypto APIs differ, long-lived TCP connections are problematic.
- Execution model is closer to **Web APIs** (Request/Response, fetch).
- Keep edge code small and fast; think “router + guardrails”, not “business app”.

Related: [Edge vs Node.js runtime](../../next-server/edge-vs-node-runtime/README.md)

## What workloads fit edge well

- **Middleware auth gating**: redirect unauthenticated users before render.
- **Light personalization**: geo-based content variations (not full user dashboards).
- **Bot blocking / rate limiting** (lightweight checks).
- **Redirect maps** and URL normalization.

## What usually does NOT fit edge well

- Heavy server-side rendering work or large dependencies.
- DB access patterns that require persistent connections.
- CPU-heavy tasks (PDF generation, video processing).
- Anything needing Node-specific libraries.

Use Node/serverless functions or a dedicated backend for those.

## Caching mental model

Even without “edge runtime code”, you still benefit from edge via caching:

- **Static assets** (JS/CSS/fonts) served from CDN edges.
- **Static HTML** for prerendered routes can be cached and served at the edge.

Dynamic routes can still be accelerated with caching strategies, but correctness comes first.

## Edge + environment variables

- Edge code can read env vars, but remember: anything that ends up in client bundles (`NEXT_PUBLIC_*`) is public.
- Builds and prerendering can bake assumptions into artifacts; don’t treat env vars as magically “runtime-only” everywhere.

Related: [Environment variables](../environment-variables/README.md)

## Testing and debugging

- Edge bugs often show up only in production-like environments (headers, CDN behavior, cold starts).
- Prefer writing edge logic as small pure functions so it’s testable without the runtime.

## Related in this repo

- [Middleware (Next.js)](../../next-server/middleware/README.md) — the most common edge entry point.  
- [Edge vs Node.js runtime](../../next-server/edge-vs-node-runtime/README.md) — constraints and probes.  
- [Build process (Next.js build pipeline)](../build-process-next-build-pipeline/README.md) — static vs dynamic, where code executes.  
- [Deployment platform: Vercel (Next.js)](../vercel-nextjs/README.md) — how edge fits into a Next-native host.


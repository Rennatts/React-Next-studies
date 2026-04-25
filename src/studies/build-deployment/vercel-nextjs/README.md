# Deployment platform: Vercel (native for Next.js)

Vercel is the “default” hosting platform for Next.js because it runs the full App Router feature set (Server Components, Route Handlers, streaming, Edge runtime, image optimization) with minimal configuration.

This note explains the mental model: what gets deployed, what environments exist, and what knobs you typically touch.

## The three environments you’ll see

- **Preview**: one deployment per PR/branch commit (used for review).
- **Production**: deployment for the production branch (often `main`).
- **Development**: local (`next dev`) — not a Vercel environment, but worth keeping distinct in your head.

Each environment can have different **environment variables**.

## What gets deployed (conceptually)

When you deploy a Next.js app, Vercel hosts a mix of:

- **Static assets**: prebuilt files that can be served from the edge cache (JS/CSS, images, static HTML).
- **Server rendering**: routes that must run on the server at request time (dynamic pages).
- **Edge code** (optional): middleware or routes configured for the Edge runtime.

In Next build output, routes show as:

- `○` **Static** (prerendered)
- `ƒ` **Dynamic** (server-rendered on demand)

## Previews are “real builds”

Preview deployments still run `next build`. That means:

- Type errors fail the deploy
- Static prerendering can execute Server Components at build time
- `NEXT_PUBLIC_*` values are baked into the client bundle for that deployment

So if your preview fails but local dev works, look for build-time execution, missing env vars, or request-only APIs used in static routes.

## Environment variables and secrets

- Store secrets in Vercel **Environment Variables** (do not commit `.env` files with secrets).
- Only expose values to the browser via `NEXT_PUBLIC_*` (and treat them as public).
- Keep **Preview vs Production** values separate when needed (different API base URLs, different OAuth redirect URIs, etc).

Related: [Environment variables](../environment-variables/README.md)

## Common configuration knobs (practical)

### 1) Domains and URLs

- Production domain (custom domain)
- Preview URLs per deploy

Use a single source of truth for your “app base URL” when building absolute redirects (OAuth callbacks, email links).

### 2) Caching and dynamic/static behavior

You control “what can be cached” via Next primitives:

- `fetch` caching (`cache`, `revalidate`, `next: { revalidate }`)
- `export const dynamic = "force-dynamic"` when you must render per request
- Using `cookies()` / `headers()` makes routes dynamic

### 3) Images and fonts

- `next/image` runs on Vercel and often “just works”, but remote images must be allowlisted in `next.config` (`images.remotePatterns`).
- `next/font` self-hosts fonts and helps CLS; it’s part of build output.

### 4) Logs and debugging

- Server logs appear in Vercel logs for that deployment.
- Preview deploys are perfect for reproducing production-like behavior without touching prod.

## Edge vs serverless on Vercel (why it matters)

- **Edge runtime** is great for very fast request interception (middleware, light logic close to users).
- **Node/serverless** is better when you need Node APIs or heavier server work.

Choosing runtime affects what APIs you can use and how code behaves (e.g., filesystem access).

## Recommended workflow (simple)

- PR opens → Vercel Preview deploy → review and test
- Merge to `main` → Production deploy
- Rollback by redeploying a previous production deployment if needed

## Related in this repo

- [Build process (Next.js build pipeline)](../build-process-next-build-pipeline/README.md) — static vs dynamic routes, prerendering.  
- [CI/CD basics](../ci-cd-basics/README.md) — how checks connect to deploys.  
- [Environment variables](../environment-variables/README.md) — secrets and build-time vs runtime.
- [Edge deployment concepts](../edge-deployment-concepts/README.md) — edge runtime constraints and best-fit workloads.


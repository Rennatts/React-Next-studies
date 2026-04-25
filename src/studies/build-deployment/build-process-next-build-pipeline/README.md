# Build process (Next.js build pipeline)

This note describes what happens when you run:

```bash
npm run build
```

In this repo that maps to `next build`.

## Two modes: dev vs build

- **`next dev`**: fast iteration, on-demand compilation, different caching behavior, more runtime checks.
- **`next build`**: produces an optimized production build in `.next/` and runs **type checking** and other validations.

If something only breaks in build, it’s often because build **pre-renders** routes and executes more code ahead of time.

## High-level pipeline

At a conceptual level, a production build does:

1. **Compile** (SWC/webpack depending on config): TS/JS, JSX, CSS, assets.
2. **Tree-shake and minify** client bundles.
3. **Analyze routes** under `app/` to decide what can be **static** vs what must be **dynamic**.
4. **Type-check** the project (Next runs TypeScript checks during build).
5. **Generate artifacts** in `.next/` used by the runtime to serve pages and API routes.

The CLI output shows which routes are static (`○`) vs dynamic (`ƒ`) in the final build summary.

## What “static” vs “dynamic” means in App Router

Next can pre-render a route segment when the output can be determined without request-specific data.

Common signals that push a route to **dynamic**:

- Reading `cookies()` or `headers()`
- `fetch(..., { cache: "no-store" })`
- Other dynamic APIs or runtime-only dependencies
- Explicit `export const dynamic = "force-dynamic"`

Static routes are faster at runtime (served as prebuilt HTML), but only safe when the content does not depend on the request.

## Prerendering and “build-time execution”

During build, Next may execute Server Components to generate HTML for static routes. That means:

- Any server `fetch()` inside a static route can run during build.
- If it calls the public internet, builds can fail in restricted CI environments.
- Prefer local demo endpoints, mock data, or mark the route as dynamic when the demo is inherently “live”.

## `.next/` output (what it’s for)

`.next/` is the build output folder:

- Compiled server bundles for route segments (RSC/server rendering)
- Compiled client bundles
- Manifests and build metadata
- Prerendered HTML for static routes

You normally do not commit `.next/`.

## Fonts and images are part of the build story

- `next/font` downloads fonts at build time and serves them from your own origin (see the font optimization study).
- `next/image` may require build-time configuration (`images.remotePatterns`) for remote hosts (see the image optimization study).

## Where to look when builds fail

- **Type errors**: usually show a file and line; fix in source.
- **Prerender errors**: often a Server Component did something build can’t do (network, env, dynamic API). Decide whether to:
  - make it dynamic, or
  - move work behind a runtime boundary, or
  - replace with mock/local data.

## Related in this repo

- [File-based routing (App Router)](../../next-server/file-based-routing/README.md) — how routes are defined.  
- [Server-side in the App Router](../../next-server/server-side/README.md) — `fetch`, caching, and dynamic APIs.  
- [Environment variables](../environment-variables/README.md) — server vs client env and what gets baked into builds.  
- [CI/CD basics](../ci-cd-basics/README.md) — how build validation and deploy steps typically connect.  
- [Font optimization](../../performance-optimization/font-optimization/README.md) — build-time font handling.  
- [Image optimization](../../performance-optimization/next-image/README.md) — build config for images.


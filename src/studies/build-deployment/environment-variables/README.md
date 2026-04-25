# Environment variables (Next.js)

Environment variables (“env vars”) configure your app without hardcoding secrets into the repo. In Next.js, the most important rule is:

- **Server env vars are private**
- **`NEXT_PUBLIC_*` env vars are exposed to the browser bundle**

## Where env vars come from

### Local development (`.env*` files)

Common files:

- `.env.local` (machine-specific; usually gitignored)
- `.env.development.local`, `.env.production.local` (optional)
- `.env` (shared defaults; commit only if it contains **no secrets**)

The exact precedence is documented by Next, but the working mental model is:

- More specific files override less specific ones
- `*.local` overrides non-local variants

### Deployment platforms

On Vercel and most hosts, you set env vars in the dashboard/CLI. The runtime process receives them as `process.env.*`.

## Server vs client in App Router

### Server Components / Route Handlers

- Can read **private** env vars (database URLs, API secrets).
- Values can be used at request time for dynamic routes.

### Client Components

- **Cannot** safely read private env vars.
- Only `NEXT_PUBLIC_*` vars are available (and they are not secrets).

If you reference `process.env.MY_SECRET` in code that ends up in a Client Component bundle, you risk leaking the value (or it will be `undefined` depending on build rules).

## Build-time vs runtime env

Some env vars effectively become **build-time** decisions:

- Anything embedded in a client bundle (`NEXT_PUBLIC_*`)
- Any code path that gets executed during **static prerendering** at build time

If you change an env var after building, the running server can see the new value, but the **already-built client bundle** cannot magically update unless you rebuild/redeploy.

## Naming conventions

Use a clear scheme:

- `DATABASE_URL`, `REDIS_URL`, `SENTRY_DSN` (server-only)
- `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_API_BASE_URL` (public)

Avoid putting secrets in anything prefixed with `NEXT_PUBLIC_`.

## Validation (recommended)

Treat env vars as inputs that can be missing or malformed.

A simple pattern:

- Define a small `env.ts` module that reads `process.env`, validates, and exports typed values.
- Import that module only from server code when it contains secrets.

Even without a validation library, you can fail fast:

```ts
const must = (name: string) => {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
};
```

## Common mistakes

- Shipping secrets in `NEXT_PUBLIC_*`
- Using `NEXT_PUBLIC_API_BASE_URL` as an “API key” (it will be visible)
- Reading env vars in places that run during build/prerender and then wondering why CI fails
- Committing `.env` with real credentials

## Related in this repo

- [Build process (Next.js build pipeline)](../build-process-next-build-pipeline/README.md) — why builds can execute code and why client bundles bake in env.  
- [Route Handlers](../../next-server/route-handlers/README.md) — server-only endpoints can safely use secrets.  
- [Server-side in the App Router](../../next-server/server-side/README.md) — server rendering boundaries and secrets.


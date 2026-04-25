# CI/CD basics

**CI (Continuous Integration)** is the automation that runs on every change (push/PR) to prove the code still works.  
**CD (Continuous Delivery/Deployment)** is the automation that ships a build to an environment (preview/staging/prod).

The goal is predictable, repeatable releases with fast feedback.

## Typical pipeline stages

### 1) Validate (fast feedback)

Run on every PR:

- `npm ci` (clean install)
- **Lint**: `npm run lint`
- **Type check**: often part of `next build` in Next.js projects
- **Tests**: unit/integration (when present)
- Optional: formatting checks, bundle size checks

### 2) Build (produce an artifact)

- `npm run build` → `next build`
- Produces `.next/` output (what the runtime uses)
- If your build pre-renders routes, it may execute Server Components at build time

### 3) Deploy (environment-specific)

Common environments:

- **Preview**: per-PR deploy (great for review)
- **Staging**: shared environment closer to prod settings
- **Production**: real users

## CI vs CD responsibilities

- **CI** answers: “Is this change safe to merge?”
- **CD** answers: “Is this change safe to ship (and can we ship it repeatedly)?”

Some teams deploy previews in CI; some treat previews as CD.

## Secrets and environment variables

- CI/CD systems inject secrets at runtime (host settings), not in the repo.
- Never put secrets into client-exposed env (`NEXT_PUBLIC_*`).
- A pipeline usually needs different env values for preview vs staging vs prod.

See the env vars note in this folder.

## Common failure modes

- “Works on my machine”: relying on local `.env.local` or cached dependencies
- Builds failing only in CI because pre-rendering executes code that needs network access or missing env vars
- Flaky tests or non-deterministic builds
- Long pipelines: developers stop trusting checks

## Deployment strategies (conceptual)

- **Deploy on merge** (main branch) + quick rollback
- **Deploy on release tag** (more control)
- **Feature flags**: merge code behind flags, enable safely

## Observability after deploy (don’t skip)

Even a green pipeline can ship bugs. A minimal post-deploy checklist:

- error rate (Sentry/logs)
- key endpoints health
- performance (LCP, TTFB)

## Related in this repo

- [Build process (Next.js build pipeline)](../build-process-next-build-pipeline/README.md) — why builds may prerender and execute code.  
- [Environment variables](../environment-variables/README.md) — secrets, NEXT_PUBLIC, build-time vs runtime.  
- [Server-side in the App Router](../../next-server/server-side/README.md) — server boundaries that often affect CI builds.


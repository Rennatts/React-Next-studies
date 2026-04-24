# Middleware (Next.js)

**Middleware** runs **before** a request completes. It can inspect **`NextRequest`**, rewrite or redirect, set **headers** on the request/response, and return **`NextResponse`**. In Next.js it typically lives at the **project root**: **`middleware.ts`** next to `app/` (this repo: `src/middleware.ts` when using a `src/` directory).

## When it helps

- **Auth gates** — check a session cookie and redirect unauthenticated users.
- **A/B buckets or flags** — set a cookie or header for downstream Server Components / Route Handlers.
- **Locale or hostname routing** — rewrite to localized paths.
- **Security headers** — add CSP, HSTS, etc. (often also done at the edge platform layer).

## Important details

- **Edge runtime** — Next runs middleware on the **Edge** by default (no Node-only APIs like `fs` of the full Node runtime unless you opt into Node middleware where supported).
- **`matcher`** — **Scope** middleware so it does not run on every asset and API call. Omitting `matcher` runs on **all** routes (usually too broad).
- **Order** — Middleware runs **before** `headers()` / RSC render for matched requests; it is not a replacement for Server Components or Route Handlers for heavy business logic.

## Live demo in this repo

| File | Role |
|------|------|
| `src/middleware.ts` | Sets response headers when the URL matches **`/studies/next-server/middleware`** or deeper paths under that segment (`matcher` in file). |
| `src/app/studies/next-server/middleware/page.tsx` | Reads those headers via `headers()` and displays them. |

Open `/studies/next-server/middleware` after `next dev` or `next start` to confirm the header appears.

## Reference snippets

See **`MiddlewareExamples.tsx`** for `NextResponse.next`, `redirect`, `rewrite`, `matcher`, and `cookies()` patterns (copy-paste).

## Related

- [Auth flows (JWT, cookies, sessions)](../../security/auth-flows/README.md) — cookie-based sessions and middleware gates.  
- [Edge vs Node.js runtime](../edge-vs-node-runtime/README.md) — Route Handlers choose `runtime`; middleware is Edge-only.  
- [File-based routing](../file-based-routing/README.md) — URL segments; middleware matches **paths**, not file names.  
- [Server-side in the App Router](../server-side/README.md) — data and auth often pair with middleware.

## Further reading

- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)  
- [`NextRequest` / `NextResponse`](https://nextjs.org/docs/app/api-reference/functions/next-response)

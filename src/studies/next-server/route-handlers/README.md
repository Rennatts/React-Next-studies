# Route Handlers (App Router — API routes replacement)

In the **App Router**, HTTP endpoints are **`route.ts`** (or `route.js`) files next to `page.tsx`, not `pages/api/*.ts`. Each file exports **named functions** matching HTTP verbs: **`GET`**, **`POST`**, **`PUT`**, **`PATCH`**, **`DELETE`**, **`HEAD`**, **`OPTIONS`**.

## Pages Router vs App Router

| Pages Router | App Router |
|--------------|------------|
| `pages/api/hello.ts` → `/api/hello` | `app/api/hello/route.ts` → `/api/hello` |
| `default` export handler with `req, res` | Named exports: `export async function GET(req) { … }` |

Handlers always run on the **server**. They return **`Response`** / **`NextResponse`**, not JSX.

## Common patterns

- **`NextResponse.json(data, { status })`** — JSON APIs.
- **`request.json()`**, **`request.text()`**, **`request.formData()`** — read bodies (`POST` / `PUT`).
- **`NextRequest`** — extended `Request` with helpers like `nextUrl`, `cookies` (when imported from `next/server`).
- **Dynamic segments** — `app/items/[id]/route.ts` receives **`params`** (shape matches folder names).
- **Runtime** — optional `export const runtime = 'edge' | 'nodejs'` (see [Edge vs Node.js runtime](../edge-vs-node-runtime/README.md)).

Route Handlers are **not** Server Components: no React tree, no `use client`, but you can share modules with the rest of the server codebase.

## Live demos in this repo

| URL | What it shows |
|-----|----------------|
| `/studies/next-server/route-handlers/demo` | `GET` + `POST` on the same `route.ts`. |
| `/studies/next-server/route-handlers/demo/item/42` | `GET` with **`[id]`** param. |

The [study page](/studies/next-server/route-handlers) calls these and includes a small **client POST** example.

## Reference snippets

| File | Role |
|------|------|
| `RouteHandlersExamples.tsx` | Copy-paste patterns (GET, query, POST body, dynamic param, errors, Pages migration). |
| `RouteHandlersPostDemo.tsx` | Client **`fetch` POST** to the live `demo` Route Handler. |

## Related

- [Edge vs Node.js runtime](../edge-vs-node-runtime/README.md) — `runtime` on `route.ts`.  
- [Building an API layer](../../api/api-layer/README.md) — typed clients calling handlers or external APIs.  
- [File-based routing](../file-based-routing/README.md) — how `route.ts` participates in the URL tree.

## Further reading

- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)  
- [`NextResponse`](https://nextjs.org/docs/app/api-reference/functions/next-response)

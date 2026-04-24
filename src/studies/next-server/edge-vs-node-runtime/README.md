# Edge vs Node.js runtime (Next.js)

Next can execute server code on **Node.js** (full standard library, native addons, long CPU work within limits) or on the **Edge** (lightweight isolates, Web-standard APIs, geographically distributed, **no** arbitrary `fs` / `child_process`).

## Where the default is

| Surface | Typical default | Override |
|---------|-----------------|----------|
| **Server Components** & most **`page.tsx`** | **Node.js** | `export const runtime = 'edge'` on the segment |
| **`route.ts` (Route Handlers)** | **Node.js** | `export const runtime = 'edge'` in the same module |
| **`middleware.ts`** | **Edge** only | (no Node option in standard middleware) |

Exact behavior can change slightly between Next versions—always check the release notes for your version.

## When to pick Edge

- **Low latency** at the edge (redirects, small header rewrites, A/B cookies).
- **Middleware**-style logic in a Route Handler you explicitly run on Edge.
- Code that only needs **Web APIs** (`fetch`, `URL`, `crypto.subtle`, `TextEncoder`, …).

## When to stay on Node

- **`fs`**, **`path`**, native modules, Prisma with default engine, heavy CPU, large body parsing quirks, tooling that assumes Node.
- **Most app data layers** and ORMs unless the vendor documents Edge support.

## Live probes in this repo

Two Route Handlers under the study route:

| URL | Runtime | What it proves |
|-----|---------|------------------|
| `/studies/next-server/edge-vs-node-runtime/probe-node` | **Node** | Reads `package.json` via `fs` (fails on Edge). |
| `/studies/next-server/edge-vs-node-runtime/probe-edge` | **Edge** (`runtime` export) | JSON only; no Node-only modules. |

The study **page** fetches both and prints the JSON (see `page.tsx`).

## Reference snippets

See **`EdgeVsNodeRuntimeExamples.tsx`** for `runtime` export on `page` and `route`, and notes on middleware.

## Related

- [Middleware](../middleware/README.md) — always Edge.  
- [Server-side in the App Router](../server-side/README.md) — `fetch`, caching, Server Actions (usually Node).

## Further reading

- [Edge Runtime](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes)  
- [`runtime` segment config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#runtime)

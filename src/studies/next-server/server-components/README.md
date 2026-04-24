# React Server Components (Next.js App Router)

In the **App Router**, components are **Server Components by default**: they run on the **server**, can be **`async`**, can read **secrets** and **backend-only** APIs, and their logic is **not** shipped as client JavaScript (unless imported into a Client Component tree).

Mark a file or boundary with **`"use client"`** when you need **hooks**, **browser APIs**, or **event handlers** in that module’s component definitions.

## What Server Components can do

- **`await` data** in the component body (`async function Page()`).
- Call **`fetch`** (with Next’s caching semantics), databases, filesystem (where allowed), internal URLs.
- Read **`cookies()`**, **`headers()`**, **`connection()`** (and similar) — these also mark routes as **dynamic** when used at the top level.
- Render **Client Components** as children or pass **serializable props** (JSON-like) into them.

## What they cannot do (use a Client Component instead)

- **`useState`**, **`useEffect`**, other **React DOM hooks** in the same file (unless it is a client file).
- **`onClick`**, **`onChange`**, and other **synthetic events** on elements you define here.
- **`window`**, **`document`**, **`localStorage`**.

## Composition pattern

Keep **large regions server-rendered**; push **`"use client"`** to **small islands** (forms, widgets, charts that need hooks). Data flows **down** as props or **server-to-client** via initial HTML; mutations often use **Server Actions** or **Route Handlers**.

## Files in this folder

| File | Role |
|------|------|
| `ServerComponentsRscParts.tsx` | Async Server Components (clock string, small `fetch` demo). |
| `ServerComponentsClientIsland.tsx` | Minimal `"use client"` island (interactive + props from server). |
| `ServerComponentsExamples.tsx` | Copy-paste **code snippets** (patterns); live UI is on the study route. |

## Related

- [File-based routing (App Router)](../file-based-routing/README.md) — how `app/` maps to URLs and special files.  
- [Server-side in the App Router](../server-side/README.md) — `fetch` caching, dynamic APIs, Server Actions, Route Handlers in depth.  
- [Suspense for data fetching](../suspense-data-fetching/README.md) — streaming async RSC.

## Further reading

- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)  
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

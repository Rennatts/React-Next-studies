# Code splitting and lazy loading

**Code splitting** means shipping JavaScript in smaller chunks so users download only what they need for the current screen.

**Lazy loading** means loading a chunk *later* (often when a route opens, a tab becomes active, or a component mounts).

## Why it matters

- Faster initial page loads
- Less JavaScript parsed on first paint
- Better mobile performance

## Two common tools in this stack (Next.js + React)

### 1) `next/dynamic` (App Router friendly)

Use `dynamic()` to lazy-load a component and optionally show a loading UI.

Typical use cases:

- Heavy charts / editors / maps
- Modals that are rarely opened
- Below-the-fold widgets

### 2) `React.lazy` + `Suspense` (client components)

Useful when you want classic React lazy loading inside a Client Component tree.

Typical use cases:

- Splitting large subtrees inside a client-only feature area
- Lazy-loading a heavy panel behind a toggle

## Trade-offs

- More chunks can mean more network round trips (usually fine, but watch waterfalls)
- Lazy UI can “pop in” unless you reserve space (skeletons) or prefetch intentionally
- SSR behavior matters: `next/dynamic` can disable SSR for a component with `ssr: false` (sometimes necessary for browser-only libraries)

## Example in this folder

| File | Role |
|------|------|
| `HeavyWidget.tsx` | A deliberately “heavy-looking” client widget (simulated delay). |
| `LazyWidgets.tsx` | Demonstrates `next/dynamic` and `React.lazy` patterns. |

## Try it

Run the app and open `/studies/performance-optimization/code-splitting-lazy-loading`.

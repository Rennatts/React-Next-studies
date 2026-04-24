# Error boundaries

An **Error Boundary** is a React component that catches JavaScript errors in **its child component tree** and renders a fallback UI instead of crashing the whole app.

## Idea in one sentence

- **Error boundary**: catch render/lifecycle errors below a boundary and show a fallback.

## What error boundaries catch (and don’t catch)

They catch errors thrown during:

- Rendering
- Lifecycle methods (including effects in some cases, depending on where the error surfaces)

They do **not** catch errors thrown in:

- Event handlers (handle those with `try/catch` inside the handler)
- Async callbacks not tied to rendering (e.g. `setTimeout`, `fetch` promise chains) unless you re-throw during render
- Server-side code (Server Components / server actions)

## How they’re implemented

In React, error boundaries must be **class components** using:

- `static getDerivedStateFromError`
- `componentDidCatch`

## Example in this folder

| File | Role |
|------|------|
| `ErrorBoundary.tsx` | A reusable error boundary with reset. |
| `ErrorBoundariesDemo.tsx` | A component that can intentionally throw to demonstrate fallback. |

## Try it

Run the app and open `/studies/advanced-concepts/error-boundaries`.


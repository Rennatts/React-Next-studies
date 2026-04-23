# Container components (and presentational components)

This pattern comes from React (popularized around 2015 by Dan Abramov’s “Presentational and Container Components” article). **Next.js still uses React for UI**, so the same split applies—especially in **Client Components** (`"use client"`) where you fetch data, subscribe to stores, or hold local UI state.

## Idea in one sentence

- **Container**: knows *how* data is loaded and *what* to do with it (effects, callbacks, wiring). Often stateful or connected to the outside world.
- **Presentational (“dumb”) component**: knows *how things should look* from **props only**—easier to test and reuse.

This is a **separation of concerns**, not a rule enforced by React. You can merge layers when a screen is tiny; split when logic and markup fight each other.

## Files in this folder

| File | Role |
|------|------|
| `types.ts` | Shared types for the example domain (products). |
| `mockApi.ts` | Fake async API so the container can show loading / error without a real backend. |
| `ProductListView.tsx` | **Presentational**: receives `products`, `loading`, `error`, `onRetry`—no fetch. |
| `ProductListContainer.tsx` | **Container**: calls the mock API, owns request lifecycle, passes props to the view. |

## When to use it

- Lists or forms where **data loading** and **layout** would make one huge component.
- When you want to **storybook** or **unit test** UI with fixed props.
- When the same UI might be fed by different sources (REST, GraphQL, props from a parent).

## Next.js specifics

- **Server Components** can be “containers” for data fetching on the server without `"use client"`. This example uses **client-side** fetching to mirror the classic React pattern and to show loading states in the browser.
- If you move fetching to the server, you might inline a small presentational child or still split for clarity—same mental model.

## Try it

Run the app and open `/studies/design-patterns/container-components`, or import `ProductListContainer` from this folder into your own page.

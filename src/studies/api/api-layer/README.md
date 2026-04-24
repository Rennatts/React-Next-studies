# Building an API layer in React (Next.js)

An **API layer** is the thin boundary between your UI and your backend. Instead of calling `fetch()` everywhere, you centralize:

- Base URL and headers
- JSON parsing and error normalization
- Typed request/response shapes
- Abort/timeouts and retry decisions

## Idea in one sentence

- **API layer**: a small `request<T>()` function + typed endpoints so the rest of the app consumes *data*, not transport details.

## Goals

- **Consistency**: one way to do requests and handle errors
- **Type safety**: `request<T>()` returns typed data
- **Testability**: UI can be tested by mocking a single API module
- **Separation of concerns**: UI components render state; API layer talks HTTP

## What we implement in this folder

| File | Role |
|------|------|
| `apiClient.ts` | `request<T>()` wrapper over `fetch` (JSON, errors, abort). |
| `errors.ts` | `ApiError` (normalized error surface for UI). |
| `types.ts` | Shared types for the demo endpoint. |
| `ProductsDemo.tsx` | Client demo that loads products via the API layer. |

To keep this runnable, we also add a small **Route Handler** endpoint:

- `src/app/api/studies/products/route.ts`

## Suggested layering

- **`apiClient`**: transport + error normalization
- **`endpoints`**: `getProducts()`, `createOrder()`, etc. (one function per endpoint)
- **`hooks` (optional)**: `useProductsQuery()` built on top (or use TanStack Query)

## Try it

Run the app and open `/studies/api/api-layer`.


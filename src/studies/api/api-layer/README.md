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

## Base URL: best practice (Next.js)

In Next.js you usually have **two** scenarios.

### 1) Calling your own app’s API routes from the browser (same origin)

Use **relative URLs** like:

- `/api/studies/products`

This is the simplest and most robust option:

- Works in dev/prod without configuration
- Avoids CORS issues
- Automatically targets the current origin

In this repo, the API client defaults to this (base URL is an empty string).

### 2) Calling an external API (different origin)

Centralize the base URL in one place and load it from environment variables.

Recommended approach:

- **Client**: `NEXT_PUBLIC_API_BASE_URL` (must be public to be bundled)
- **Server**: `API_BASE_URL` (server-only)

Then have your API client build full URLs with a helper like `buildUrl("/v1/users")`.

This repo’s `apiClient.ts` exports:

- `API_BASE_URL` (resolved from the right env var depending on server vs browser)
- `buildUrl(path)` (joins base + path safely)

Notes:

- Don’t use `Math.random()`-style bases or hardcode `localhost` in code.
- Keep endpoint paths consistent (`/v1/...`) and version your API when needed.

## Try it

Run the app and open `/studies/api/api-layer`.


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

## Avoiding flickering loaders (UX)

“Flicker” happens when requests complete so fast that the UI flashes:

loading → loaded → loading → loaded

Common strategies (mix and match):

### 1) Delay showing the spinner

Only show a loader if the request takes longer than \(N\) ms (e.g. 200–400ms).

```tsx
const [loading, setLoading] = useState(false);
const [showSpinner, setShowSpinner] = useState(false);

useEffect(() => {
  if (!loading) {
    setShowSpinner(false);
    return;
  }
  const t = setTimeout(() => setShowSpinner(true), 250);
  return () => clearTimeout(t);
}, [loading]);
```

This keeps quick requests feeling instantaneous while still providing feedback for slower ones.

### 2) Keep previous data while revalidating

Instead of clearing data when you reload, keep the last successful result visible and show a subtle “refreshing” state.

Practical rule:

- **First load**: show skeleton/spinner
- **Refetch** (filters/polling): keep old data + small pending indicator

### 3) Use skeletons for layout stability

Skeletons prevent layout jumping (especially lists/cards) and feel smoother than a spinner for content-heavy UIs.

### 4) Mark expensive derived UI as non-urgent

For “type to filter” and similar interactions:

- Use `useDeferredValue` to defer derived UI
- Or `useTransition` to mark the expensive state update as non-urgent and show `isPending`

These reduce jank and avoid “busy flashing” during rapid updates.

### 5) Avoid toggling loaders on every micro-request

If you’re firing multiple requests quickly (search as you type):

- Debounce the request
- Cancel previous requests (`AbortController`)
- Coalesce multiple updates into one state change

## Error logging (what/where/how)

Error **handling** (showing a message, retries) and error **logging** (capturing diagnostics for you) are different concerns. A good API layer makes logging consistent.

### What to log

Aim for high-signal, low-risk data:

- **Location**: endpoint path + method
- **HTTP status** (if available)
- **A request id / correlation id** (if your backend sends one, e.g. `x-request-id`)
- **Timestamp** and a short **message**
- **Non-sensitive context**: feature flag, screen name, app version, user *role* (avoid user PII)

Avoid logging:

- Passwords/tokens
- Full request/response bodies that may contain PII
- Raw headers like `Authorization`

### Where to log

- **Client-side**: capture UI failures (network down, CORS, 4xx/5xx surfaced to UI). Use a service like Sentry/Datadog RUM, or your own logging endpoint.
- **Server-side** (Route Handlers / Server Components): log with server tooling (stdout + platform logs, or APM). Server logs can include more detail but still avoid secrets.

Practical rule:

- **Client logs** help you understand what users experienced.
- **Server logs** help you debug root causes.

### How to implement it (pattern)

Treat logging as an adapter:

- API client normalizes errors (`ApiError`)
- UI decides what to show
- Logger reports diagnostics (and can be swapped per environment)

Example logger shape:

```ts
type LogContext = {
  where: string; // "ProductsDemo.load" or "api.getProducts"
  url?: string;
  method?: string;
  status?: number;
};

export function logError(error: unknown, ctx: LogContext) {
  if (error instanceof Error) {
    // In real apps, replace with Sentry.captureException(error, { extra: ctx })
    console.error(ctx.where, { ...ctx, message: error.message, name: error.name });
    return;
  }
  console.error(ctx.where, { ...ctx, error });
}
```

### Logging `ApiError`

Because `ApiError` has `status` and `details`, you can log them (carefully):

- Prefer logging `status` + a backend-provided error code/message
- Only log `details` if you know it’s safe/sanitized

If you adopt a backend error format like `{ code, message }`, log `code` instead of entire bodies.

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

## Related

- [OAuth 2.0 basics](../../security/oauth-basics/README.md) — how **access tokens** are obtained before you attach them in the API client.  
- [Auth flows (JWT, cookies, sessions)](../../security/auth-flows/README.md) — where to attach **Bearer** tokens vs **cookies** in clients and servers.

## Try it

Run the app and open `/studies/api/api-layer`.


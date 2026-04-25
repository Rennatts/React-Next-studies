# Error handling patterns in APIs

Error handling is part contract, part UX. A good API makes it easy for clients to:

- show a useful message to users,
- react correctly (retry vs fix input vs re-auth),
- log enough diagnostics (without leaking secrets).

## Goals (what “good” looks like)

- **Stable envelope**: consistent JSON shape across endpoints.
- **Clear classification**: machine-readable code + human-readable message.
- **Right status codes**: enough signal for generic clients, proxies, and tooling.
- **Safe details**: useful for debugging, sanitized for clients.
- **Correlation**: request id for tracing across services.

## 1) Use HTTP status codes intentionally

Typical mapping:

- **400**: malformed request (missing/invalid JSON)
- **401**: not authenticated (missing/invalid credentials)
- **403**: authenticated but not allowed
- **404**: resource not found (or “not visible” in some security models)
- **409**: conflict (version mismatch, unique constraint)
- **422**: valid JSON but semantic validation failed (field errors)
- **429**: rate limited (include `Retry-After`)
- **500**: unexpected server failure
- **502/503/504**: upstream failure / overload / timeout (useful in BFF/gateway setups)

Rule of thumb:

- **4xx**: client can change the request and likely succeed.
- **5xx**: client can’t fix it; retry/backoff may help.

## 2) Standardize your error envelope

One practical JSON shape:

```json
{
  "error": {
    "code": "validation_failed",
    "message": "Please fix the highlighted fields.",
    "requestId": "req_123",
    "details": {
      "fieldErrors": { "email": ["Invalid email"] }
    }
  }
}
```

- **`code`**: stable, machine-readable (good for UI branching and analytics).
- **`message`**: safe, user-facing summary (or developer-facing if internal API).
- **`requestId`**: for support tickets and tracing.
- **`details`**: optional and **sanitized** (never secrets).

## 3) Prefer “problem+json” for public APIs (optional)

For external/public APIs, consider RFC 7807 (`application/problem+json`):

- `type`, `title`, `status`, `detail`, `instance`

Even if you don’t adopt it fully, the idea is the same: **structured + consistent**.

## 4) Validation errors: make them actionable

Validation failures are the most common errors users can fix. Return:

- a top-level `code` (e.g. `validation_failed`)
- `fieldErrors` keyed by field path
- optionally `globalErrors` for cross-field constraints

Example:

```json
{
  "error": {
    "code": "validation_failed",
    "message": "Invalid form.",
    "details": {
      "fieldErrors": {
        "email": ["Invalid email"],
        "password": ["Must be at least 12 characters"]
      }
    }
  }
}
```

## 5) Authentication/authorization errors: avoid over-sharing

- Prefer generic messages like “Not authorized” for **403**.
- Don’t leak whether a resource exists if that’s sensitive (sometimes 404 is used instead).
- For OAuth/OIDC, keep token errors and user-facing messages separate.

Related:

- [OAuth 2.0 basics](../../security/oauth-basics/README.md)
- [CSRF and XSS protection](../../security/csrf-xss/README.md)

## 6) Make retry behavior explicit

Clients need to know if retry makes sense.

- **429**: include `Retry-After`
- **503**: include `Retry-After` when overloaded/maintenance
- For idempotent operations, consider an **idempotency key** pattern (especially on POST payments/orders).

Client-side guidance:

- Retry network/5xx with backoff.
- Don’t auto-retry 4xx except 401 flows (refresh/re-auth).

## 7) Correlation IDs and observability

Include a request id in responses, e.g.:

- `x-request-id` header
- and/or `requestId` in the JSON error body

Minimum logging fields:

- method + path
- status
- request id
- stable error code

Avoid logging:

- credentials, tokens, raw Authorization headers
- full request/response bodies (often contain PII)

## 8) Error handling in a Next.js client (pattern)

In this repo, the API client normalizes failures into `ApiError`:

- `src/studies/api/api-layer/apiClient.ts`
- `src/studies/api/api-layer/errors.ts`

Pattern:

- API client throws `ApiError(status, details)`
- UI decides what to show (friendly message)
- logger reports diagnostics (status, request id, code)

## Related in this repo

- [Building an API layer](../api-layer/README.md) — normalized errors and `ApiError`.  
- [BFF (Backend for Frontend)](../bff-backend-for-frontend/README.md) — when upstream failures become **502** at the BFF boundary.  
- [Separation of concerns](../../project-architecture/separation-of-concerns/README.md) — keep transport errors distinct from UI concerns.

## Try it

Open `/studies/api/error-handling-patterns`.


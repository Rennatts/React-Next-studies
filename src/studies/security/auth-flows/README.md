# Auth flows: JWT, cookies, and sessions

This topic compares **common ways to prove “who is this user?”** to a server: **JWTs** (often stateless), **cookies** (often carrying a **session id** or the token itself), and **server-side sessions** (state on the server keyed by a cookie).

It is **framework-agnostic** first, with pointers to **Next.js** patterns (middleware, `cookies()`, Server Actions).

## JWT (JSON Web Token)

- **Shape**: signed (or encrypted) payload the server can verify **without** hitting a database on every request—if it trusts the signing key and validation rules.
- **Where it lives**: often the **`Authorization: Bearer <token>`** header for SPAs and mobile apps; sometimes inside an **httpOnly cookie** (still a JWT, different transport).
- **Trade-offs**: easy to scale read paths; **logout/revocation** needs extra design (short TTL + refresh, denylist, or rotate keys); **never** put secrets in the JWT payload unless the token is encrypted (JWE)—assume payload is readable.

## Cookies (transport)

- **HttpOnly cookie**: JavaScript on the page **cannot read** it—helps against **simple XSS token theft** (not all XSS classes).
- **Secure**: only sent over HTTPS in production.
- **SameSite** (`Lax` / `Strict` / `None`): mitigates some **CSRF** scenarios; `None` requires `Secure` and is common for cross-site flows—know why you chose it.
- **Domain / Path**: scope where the browser sends the cookie.

Cookies are a **delivery mechanism**; the value might be a **JWT**, a **random session id**, or opaque data.

## Sessions (server-side state)

- **Idea**: browser holds only a **session id** (usually in a cookie); server stores **user id, expiry, roles** in memory, Redis, DB, etc.
- **Pros**: **revoke** instantly by deleting the session row; rotate session id on privilege changes.
- **Cons**: needs **central store** or sticky sessions; every request may do a store lookup (cache helps).

## Choosing a pattern

| Need | Often lean toward |
|------|-------------------|
| Mobile / third-party SPAs calling your API | **Bearer JWT** (+ refresh strategy) |
| Web app you control, classic login | **HttpOnly session cookie** + server session store |
| Microservices passing user context | Short-lived **JWT** between services + gateway validation |

Mixing is normal (e.g. session cookie for web, JWT for API).

## Security reminders (short)

- **HTTPS** everywhere for auth cookies and tokens in transit.
- **Validate** issuer, audience, expiry, and signature for JWTs; prefer **short access** lifetimes.
- **CSRF**: session cookies for browser POSTs need tokens or SameSite strategy + understand your framework defaults.
- **XSS**: sanitize output; httpOnly cookies protect **cookie reads** from JS, not all attacks.

## Examples in this folder

| File | Role |
|------|------|
| `AuthFlowsExamples.tsx` | Copy-paste patterns (Bearer, Set-Cookie, session lookup, Next `cookies()`). |

## Related in this repo

- [CSRF and XSS protection](../csrf-xss/README.md) — deeper checklist: tokens, Origin checks, React sinks, CSP.  
- [OAuth 2.0 basics](../oauth-basics/README.md) — authorization code flow, PKCE, `state`, token exchange.  
- [Middleware](../../next-server/middleware/README.md) — gate routes from a cookie before render.  
- [Server-side in the App Router](../../next-server/server-side/README.md) — secrets stay server-only.  
- [Building an API layer](../../api/api-layer/README.md) — attaching auth to typed clients.

## Further reading

- [OWASP Session Management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)  
- [OWASP JWT](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)  
- [Next.js Authentication](https://nextjs.org/docs/app/building-your-application/authentication)

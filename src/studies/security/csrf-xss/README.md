# CSRF and XSS protection (web basics)

**Cross-Site Request Forgery (CSRF)** tricks a victim’s browser into sending a **state-changing** request the user did not intend (often using **cookies the browser attaches automatically**). **Cross-Site Scripting (XSS)** injects **script or HTML** into a context where the browser treats it as trusted app output—then attacker code runs in the victim’s origin.

This page is a **checklist + vocabulary** for React/Next apps. Threat models differ; validate against your stack and OWASP guides.

## CSRF (Cross-Site Request Forgery)

### What goes wrong

- User is signed in to `bank.example` via **session cookie**.
- User visits `evil.example`, which loads a page that **submits a form** or triggers a **GET** to `bank.example/transfer?...` (GET mutations are a separate smell—don’t do them).
- The browser **includes the session cookie** on that request. If the server only checks “cookie present,” it may perform the action.

CSRF is about **unwanted authenticated requests from the user’s browser**, not about stealing the cookie (that leans more toward XSS or network attacks).

### Mitigations (pick what fits your architecture)

| Approach | Idea |
|----------|------|
| **SameSite cookies** | `SameSite=Lax` (default in modern browsers for many cases) or `Strict` reduces cross-site **POST** navigation in common cases; `None` is for cross-site embedding and **requires** `Secure`—then you need **other** CSRF defenses for state-changing browser requests. |
| **CSRF token** (synchronizer) | Server issues a **secret per session** (or per form); **hidden field** or header must match server-side value on unsafe methods (`POST`, `PUT`, `PATCH`, `DELETE`). |
| **Double-submit cookie** | Cookie + matching header/body value; both must align. Still design carefully (subdomain takeover, cookie prefixes). |
| **Custom headers** | e.g. `X-Requested-With` or `Fetch-Metadata` patterns for **APIs**—cross-origin simple requests can’t set arbitrary headers the same way; combine with **CORS** and auth design. |
| **Origin / Referer checks** | Reject state-changing requests whose `Origin` (or `Referer` fallback) isn’t an allowlist. Useful as **defense in depth**; handle missing headers explicitly. |

**Framework note:** Many stacks issue **anti-CSRF tokens** for classic form posts. **Next.js Server Actions** are bound to your app’s origin and module graph; still follow Next and security docs for your version when mixing cookies, forms, and proxies.

### What CSRF defenses do *not* replace

- **Authentication** and **authorization** (CSRF only abuses *existing* sessions).
- **XSS**: if attacker JS runs in your origin, they can often read pages, exfiltrate tokens, or drive requests with same-origin semantics—**fix XSS first**.

## XSS (Cross-Site Scripting)

### Variants (short)

- **Reflected**: payload in URL/request bounced back in HTML without encoding.
- **Stored**: payload saved (DB, comment) and rendered to victims later.
- **DOM-based**: client-only sinks (e.g. `location.hash` → `innerHTML`) without sanitization.

### React’s default

- **`{userInput}` in JSX** is escaped as text—**safe for HTML injection** in the usual case.
- **Danger sinks**: `dangerouslySetInnerHTML`, passing untrusted strings into **`href` / `src` / event handlers** (`javascript:` URLs, inline handlers), **`eval`**, **`new Function`**, some **SVG**/`MathML` edges, **server components** that concatenate HTML strings.

### Mitigations

| Layer | Idea |
|-------|------|
| **Avoid raw HTML** | Prefer structured data and React nodes over HTML strings. |
| **Sanitize if you must** | Use a **maintained** library (e.g. DOMPurify in the browser) with an explicit allowlist; **never** “regex away” scripts. |
| **Content-Security-Policy (CSP)** | Restrict script sources, disallow inline script where possible, report violations—**defense in depth**, not a substitute for encoding. |
| **HttpOnly session cookies** | JS cannot read the cookie—**reduces token theft via simple XSS**; does **not** stop XSS from acting *as the user* inside the page. |
| **Subresource Integrity (SRI)** | For third-party scripts you load via `<script src>` tags. |

## Related in this repo

- [Auth flows (JWT, cookies, sessions)](../auth-flows/README.md) — `SameSite`, `HttpOnly`, cookie/session patterns.  
- [OAuth 2.0 basics](../oauth-basics/README.md) — `state` parameter against login CSRF.  
- [Route Handlers](../../next-server/route-handlers/README.md) — validating `POST` bodies and headers on the server.  
- [Middleware](../../next-server/middleware/README.md) — not a CSRF fix by itself; useful for auth gating.

## Further reading

- [OWASP CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)  
- [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)  
- [OWASP Content Security Policy](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)

# OAuth 2.0 basics

**OAuth 2.0** is a framework for **delegated authorization**: a **user** can let a **client app** access **resources** on a **resource server** without giving the client their password for that service. The **authorization server** issues **tokens** the client presents to APIs.

**OpenID Connect (OIDC)** builds on OAuth 2.0 and adds an **identity layer** (ID token, `openid` scope, UserInfo)—when people say “login with Google,” they often mean **OIDC** or a vendor profile that uses OAuth-style flows plus identity claims.

## Roles

| Role | Typical example |
|------|------------------|
| **Resource owner** | End user |
| **Client** | Your web app, SPA, or mobile app (has a `client_id`, sometimes `client_secret`) |
| **Authorization server** | Google, Okta, Auth0, Keycloak — issues codes and tokens |
| **Resource server** | Your API that accepts **access tokens** and enforces scopes |

## Authorization Code flow (web apps)

1. User clicks **“Sign in with …”**; browser opens the **authorization server’s** `/authorize` URL with `client_id`, `redirect_uri`, `response_type=code`, `scope`, **`state`**, and often **PKCE** parameters.
2. User consents; browser **redirects back** to your **`redirect_uri`** with a short-lived **`code`** (and returns `state`—you must **verify** it matches what you stored in session).
3. Your **backend** exchanges `code` for tokens at **`/token`** using `client_id` + **`client_secret`** (confidential client) or **PKCE** (public client), **never** in untrusted front-end only for confidential secrets.
4. You store **refresh token** securely (often server-side / httpOnly cookie) and use **access token** to call APIs until it expires.

This flow keeps long-lived secrets off the browser for **confidential** clients.

## PKCE (Proof Key for Code Exchange)

- **Why**: public clients (SPAs, mobile) **cannot** hold a `client_secret` safely.
- **How**: client generates **`code_verifier`** (random), sends **`code_challenge`** (hash) on `/authorize`; sends original **`code_verifier`** on `/token` so the server can verify the pair.
- **Today**: PKCE is recommended even for **confidential** clients in many setups.

## `state` and `redirect_uri`

- **`state`**: opaque value you generate before redirect; compare after return to prevent **login CSRF** / confused deputy.
- **`redirect_uri`**: must **exactly** match a pre-registered value at the authorization server—never take redirect targets from user input.

## Scopes

- **Scopes** limit what the **access token** is allowed to do (`read:email`, `api`, `openid`).
- Ask for **least privilege**; extra scopes mean larger blast radius if a token leaks.

## Other grant types (names only)

- **Client credentials** — machine-to-machine; no user; client authenticates as itself.
- **Device code** — TVs / CLI with limited input.
- **Resource Owner Password** — **avoid** for new apps; legacy pattern that trains users to give passwords to third-party clients.

## Examples in this folder

| File | Role |
|------|------|
| `OAuthBasicsExamples.tsx` | URLs, token exchange outline, `state`, PKCE placeholders, Next Route Handler sketch. |

## Related in this repo

- [CSRF and XSS protection](../csrf-xss/README.md) — `state` mitigates **login CSRF**; XSS still bypasses many cookie-only assumptions.  
- [Auth flows (JWT, cookies, sessions)](../auth-flows/README.md) — what you do with **access** / **refresh** tokens after OAuth.  
- [Route Handlers](../../next-server/route-handlers/README.md) — implement `/token` callback on your server.  
- [Middleware](../../next-server/middleware/README.md) — protect routes when session is missing.

## Further reading

- [OAuth 2.0 for Native Apps (RFC 8252)](https://datatracker.ietf.org/doc/html/rfc8252) — PKCE and public clients  
- [OAuth 2.0 Security Best Current Practice](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)  
- [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html)

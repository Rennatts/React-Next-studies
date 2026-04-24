# Development checklist: is the implementation “done”?

Pair this with the [design phase checklist](../design-phase-checklist/README.md): design answers **what** and **why**; development proves **it works** for real users, data, networks, and browsers. Use before merge, release, or handoff to QA.

Skip items that do not apply; record **N/A with reason** so reviewers do not assume you forgot them.

---

## 1. Responsiveness and layout

**What it is** — The UI **adapts** across viewports, zoom, and input modes without losing core tasks.

**Check**

- [ ] Layout verified at agreed **breakpoints** (not only one laptop width).
- [ ] **Reflow** does not hide critical actions (overflow, sticky footers, modals on small height).
- [ ] **Touch** targets and spacing work on real devices or emulated mobile.
- [ ] **Keyboard** does not obscure inputs (virtual keyboard inset on forms).
- [ ] **Zoom** (e.g. 200%) still allows completing primary flows where your org requires it.

**Why it matters** — Most “it works on my machine” bugs are layout and viewport assumptions.

---

## 2. Error handling

**What it is** — Predictable behavior when **something goes wrong**: network, server, validation, or client bugs.

**Check**

- [ ] **HTTP/API errors** map to user-visible messages (not raw stack traces in prod).
- [ ] **Retry** or **recovery** paths where appropriate (idempotent refetch, “try again”).
- [ ] **React error boundaries** (or framework equivalent) catch render errors without blanking the whole app when scoped.
- [ ] **Empty** and **partial failure** states (half-loaded lists, stale cache) are defined.
- [ ] **Logging** captures enough context for support (request id, feature flag state) without leaking secrets.

**Why it matters** — Unhandled errors erode trust and create noisy support incidents.

---

## 3. Data validation

**What it is** — **Correctness** of input and server data: types, ranges, required fields, and malicious input.

**Check**

- [ ] **Client validation** improves UX (immediate feedback) but **does not replace server validation**.
- [ ] **Server/API** validates authority, shape, and business rules (source of truth).
- [ ] **Shared schemas** (e.g. Zod, OpenAPI) used where possible to avoid drift.
- [ ] **Normalization** of API responses (null vs missing keys) handled safely in UI.
- [ ] **File uploads** (if any): size, type, virus scanning policy per product requirements.

**Why it matters** — Client-only validation is a security and data-integrity hole.

---

## 4. Browser compatibility

**What it is** — The app meets your **supported browser matrix** (versions, engines, “evergreen only,” etc.).

**Check**

- [ ] **Support policy** documented (e.g. last two Chrome, Safari, Firefox, Edge + iOS Safari).
- [ ] **Polyfills** only where needed; avoid shipping large legacy bundles “just in case.”
- [ ] **CSS features** have fallbacks or are behind `@supports` where required.
- [ ] **Safari / iOS** quirks checked (date inputs, 100vh, sticky, flex gaps) if you ship to mobile web.
- [ ] **Private / strict** modes (cookies, storage) tested if you rely on local persistence.

**Why it matters** — Baseline testing prevents “Safari only” release fires.

---

## 5. Accessibility in implementation

**What it is** — The **built** UI matches semantic HTML, keyboard, and assistive-tech expectations—not only the design spec.

**Check**

- [ ] **Roles and labels** for custom widgets (combobox, tabs) match the pattern you implemented.
- [ ] **Focus management** for dialogs, drawers, and route transitions.
- [ ] **Live regions** or status text for async updates where users need announcement.
- [ ] **Color** states are not the only signal (icons/text for success/error).
- [ ] Automated **lint/a11y** checks in CI where configured.

**Why it matters** — Design can specify a11y; code can still break it with wrong DOM or missing focus.

---

## 6. Performance

**What it is** — **Perceived speed** and resource cost: load, interaction, and memory.

**Check**

- [ ] **Critical path** assets reasonable; lazy-load heavy routes or components where planned.
- [ ] **Lists and tables** avoid rendering unbounded DOM (pagination, virtualization, or “show more”).
- [ ] **Images** sized and formats appropriate (responsive `srcset`, modern formats where supported).
- [ ] **Main thread** work chunked; avoid long synchronous work on interaction.
- [ ] **Core Web Vitals** or internal budgets checked on a throttled profile when the org tracks them.

**Why it matters** — Slow UI reads as broken, especially on mid-tier phones.

---

## 7. Security basics (web)

**What it is** — **Safe defaults** for typical product surfaces: XSS, CSRF, auth, and secrets.

**Check**

- [ ] **No secrets** in client bundles or public repos; env vars scoped correctly.
- [ ] **User-generated content** escaped or sanitized; `dangerouslySetInnerHTML` avoided or strictly audited.
- [ ] **Cookies** `Secure` / `HttpOnly` / `SameSite` as appropriate; CSRF strategy for cookie-based sessions.
- [ ] **Auth checks** on client **mirrored** on server for any protected action or data.
- [ ] **Dependencies** scanned or updated for known CVEs per team policy.

**Why it matters** — Most teams are not building banks, but basic hygiene prevents embarrassing incidents.

---

## 8. Testing

**What it is** — **Automated and manual** proof that critical paths still work after change.

**Check**

- [ ] **Unit / integration** tests for non-trivial logic and data transforms.
- [ ] **E2E** (or manual script) for top user journeys on staging.
- [ ] **Visual regression** where the team relies on it for UI-heavy features.
- [ ] **Regression** list for bugs fixed in this slice (so they do not return).

**Why it matters** — Checklists without tests become ceremony; tests make completion durable.

---

## 9. Internationalization and localization (when applicable)

**What it is** — **Strings, dates, numbers, and layout** behave for multiple locales.

**Check**

- [ ] **No hard-coded** user-visible strings that should be translated.
- [ ] **Date/time/timezone** rules correct for storage vs display.
- [ ] **RTL** layout verified if you support Arabic/Hebrew (mirroring, icons).
- [ ] **Plural and gender** rules handled by your i18n library where needed.

**Why it matters** — Retrofitting i18n is expensive; early keys save rework.

---

## 10. Observability, feature flags, and release

**What it is** — Operators can **see** health and **control** rollout.

**Check**

- [ ] **Logging** levels and messages appropriate; PII scrubbed per policy.
- [ ] **Metrics or tracing** wired for new endpoints if your platform requires it.
- [ ] **Feature flags** default and kill-switch documented.
- [ ] **Migration** steps for data or config if the release is not only code.
- [ ] **Rollback** story understood (revert deploy, toggle flag, or run down migration).

**Why it matters** — Shipping without observability is flying blind when something breaks at 2 a.m.

---

## How to use this with design

1. Run the **design phase checklist** first so scope and states are clear.
2. Use this **development checklist** at PR and release gates.
3. Keep both lists **version-controlled** or linked from your wiki so they evolve with the org.

## Related topics

- [Design phase checklist](../design-phase-checklist/README.md) — upstream readiness before build
- [Key concepts](../key-concepts/README.md) — tokens and patterns engineering implements
- [Example: Button](../button-example/README.md) — props, states, and a11y you mirror in code

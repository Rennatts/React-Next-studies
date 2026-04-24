# Example: documenting a `Button` component

This topic shows how a **real design system** typically documents a single primitive—here, **`Button`**. The pattern applies to inputs, dialogs, and other components: **intent**, **variants**, **states**, **accessibility**, **API**, and **usage rules**.

> **Study code:** `Button.tsx` implements a small subset of what this doc describes. It is for learning, not a drop-in production library.

## 1. Overview

| Field | Example content |
|-------|------------------|
| **Name** | `Button` |
| **Summary** | Triggers an action or navigates when used as a link styled as a button (separate pattern). |
| **Status** | Stable / Beta / Deprecated (with migration link) |
| **Platforms** | Web (React), Figma library “Actions / Button” |

**When to use** — Primary or secondary actions in forms, dialogs, toolbars, empty states.

**When not to use** — Destructive bulk actions without confirmation; purely navigational UI (prefer `Link` with text styles); icon-only actions without an accessible name (prefer `IconButton` with `aria-label`).

## 2. Anatomy (design ↔ code)

Typical pieces called out in Figma and mirrored in code:

- **Label** — Visible text; keep short (verb + object).
- **Container** — Hit target meets minimum touch size (often 44×44 CSS px on mobile).
- **Optional leading icon** — Decorative vs meaningful (if meaningful, label still required unless `aria-label` is set on the control).

## 3. Variants

| Variant | Intent | Typical visual |
|---------|--------|----------------|
| **Primary** | Main action in a region (one per logical group). | Filled, high contrast. |
| **Secondary** | Alternate positive path, “Back”, lower emphasis. | Outline or muted fill. |
| **Ghost** | Tertiary actions in dense UI (toolbars, tables). | Text-like, visible on hover/focus. |
| **Danger** | Irreversible or destructive action (pair with confirm pattern). | Error hue, still meets contrast. |

Document **one primary per surface** where possible to avoid competing calls to action.

## 4. Sizes

| Size | Use case |
|------|-----------|
| `sm` | Dense tables, inline filters |
| `md` | Default forms and dialogs |
| `lg` | Marketing hero, onboarding emphasis |

Sizes should map to **spacing tokens** (padding, font step), not arbitrary pixels per screen.

## 5. States

- **Default** — Resting.
- **Hover / active** — Pointer and press feedback (do not rely on hover alone for critical info).
- **Focus visible** — Keyboard focus ring meets contrast; never `outline: none` without a replacement.
- **Disabled** — Non-interactive; prefer **not** disabling without explanation where users are confused—sometimes use **loading** instead.
- **Loading** — `aria-busy="true"`, optional spinner; prevent double submit.

## 6. Accessibility

- Use **native `<button>`** (or `role="button"` only when semantically required and keyboard behavior is implemented).
- **Keyboard:** activatable with Enter / Space when focused.
- **Loading:** `aria-busy` and optionally `aria-disabled` with explanatory text if the spec allows.
- **Icon-only:** require `aria-label` (or visually hidden text).
- **Color** is not the only signal for danger—use label copy and patterns (confirm dialog).

## 7. Content guidelines

- Prefer **sentence case**: “Save draft”, not “SAVE DRAFT”.
- **Avoid** vague labels: “Submit” → “Pay $24” or “Create account”.
- **Destructive:** label the outcome: “Delete project”, not only “Delete”.

## 8. API (props)

Document for engineers (types, defaults, required):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "secondary" \| "ghost" \| "danger"` | `"primary"` | Visual style. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Padding and type scale. |
| `disabled` | `boolean` | `false` | Native disabled; not focusable for activation. |
| `loading` | `boolean` | `false` | Shows busy state; should disable activation. |
| `children` | `ReactNode` | — | Visible label. |
| … | Extends `ButtonHTMLAttributes` | — | `onClick`, `type`, `className`, etc. |

Include **code snippets** for common cases: form submit, dialog footer, table row action.

## 9. Do and don’t

**Do** — One primary per dialog; keep labels specific; pair `danger` with confirmation.

**Don’t** — Nest buttons; use a `<div>` with `onClick` instead of a button; rely on color alone for meaning; ship without focus styles.

## 10. Quality bar (for contributors)

- Unit tests or interaction tests for variants and disabled/loading.
- Visual regression baseline per variant × size.
- Changelog entry for breaking prop renames.

## Live demo

Open `/studies/design-system/button-example` to see a minimal implementation and interactive examples next to this structure.

## Related topics

- [Design phase checklist](../design-phase-checklist/README.md) — broader readiness before build (includes a11y and interaction depth)
- [Development checklist](../development-checklist/README.md) — what to verify once components are implemented in the app
- [Key concepts](../key-concepts/README.md) — tokens, components, patterns, and how they connect
- [Reusability and encapsulating styles](../reusability-and-styles/README.md) — why primitives need stable APIs and scoped styles
- [Audience](../audience/README.md) — who reads this style of documentation
- [Core principles](../core-principles/README.md) — single source of truth, accessibility, documentation as product

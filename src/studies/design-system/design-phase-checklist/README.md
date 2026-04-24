# Design phase checklist: is the design “complete”?

Use this checklist **before handoff** to engineering or before calling a slice “ready for build.” “Complete” does not mean every edge case is built—it means **decisions are explicit enough** that implementation and QA are not guessing.

Treat it as a **living gate**: skip items that do not apply, but document *why* (e.g. “desktop-only MVP”).

---

## 1. Accessibility

**What it is** — Inclusive defaults: people using keyboard, screen readers, zoom, high contrast, or reduced motion can perceive, operate, and understand the UI.

**Check**

- [ ] Color **contrast** meets your bar (often WCAG AA for text and interactive elements).
- [ ] **Focus order** and visible **focus states** are defined for modals, drawers, wizards, and lists.
- [ ] Every control has an **accessible name** (visible label, `aria-label`, or `aria-labelledby` where appropriate).
- [ ] **Touch targets** are large enough on mobile; spacing does not create accidental taps.
- [ ] **Motion** respects `prefers-reduced-motion` for non-essential animation.
- [ ] **Images and icons** that convey meaning have text alternatives or are marked decorative with rationale.

**Why it matters** — Late a11y fixes are expensive; many issues are cheaper to fix in design (spacing, labels, contrast) than in code rework.

---

## 2. Interaction

**What it is** — How the UI **behaves** when people act: clicks, taps, drags, keyboard, voice where relevant.

**Check**

- [ ] **States** are specified: default, hover, active, focus, disabled, read-only, invalid, loading, success.
- [ ] **Feedback** for async work: spinners, skeletons, optimistic UI rules, failure retry.
- [ ] **Errors** show what went wrong and what to do next (not only a red border).
- [ ] **Keyboard paths** match mouse paths for core tasks (submit, dismiss, navigate list).
- [ ] **Gestures** (swipe to delete, pull to refresh) have fallbacks or are out of scope explicitly.

**Why it matters** — “We’ll figure out states in dev” produces inconsistent UX and bugs in edge flows.

---

## 3. Context

**What it is** — **Where** this UI lives in the product and **what situation** the user is in (permissions, role, device, channel).

**Check**

- [ ] **Entry points** are listed (e.g. settings → billing, deep link from email).
- [ ] **Authorization** states: logged out, partial access, admin vs member.
- [ ] **Empty**, **loading**, and **error** states for lists and detail views.
- [ ] **Data volume**: zero / one / many rows; long names; missing avatars.
- [ ] **Offline or slow network** behavior is decided or explicitly “not in scope.”

**Why it matters** — Screens that look “finished” in one happy path often break in real contexts.

---

## 4. Completion (handoff readiness)

**What it is** — Coverage of **scope** and **artifacts** so engineering can estimate and build without blocking questions.

**Check**

- [ ] **All breakpoints** that ship in v1 are designed (or a single breakpoint is agreed with rationale).
- [ ] **Variants** (e.g. banner types, table density) are enumerated or cut with rationale.
- [ ] **Open questions** are resolved or logged as explicit follow-ups with owners.
- [ ] **Annotations** link to tokens/components (design system names, not only hex).
- [ ] **Flows** that cross multiple screens include a simple map or numbered steps.

**Why it matters** — “Almost done” designs stall sprints when dev discovers missing states mid-build.

---

## 5. Content

**What it is** — Words, numbers, dates, and tone—not lorem ipsum as the final spec.

**Check**

- [ ] **Final or near-final copy** for primary paths; placeholders labeled if TBD.
- [ ] **Truncation and overflow**: long emails, titles, and numbers in narrow columns.
- [ ] **Tone** matches brand (supportive errors vs terse errors—both are valid if intentional).
- [ ] **Localization** risks called out (string growth, RTL if relevant, date/number formats).
- [ ] **Legal / compliance** text placement reviewed where needed (disclaimers, consents).

**Why it matters** — Layout often breaks when real copy arrives; legal surprises force layout changes late.

---

## 6. Customization

**What it is** — What end users or tenants can **configure** (themes, density, columns) vs what is **fixed** by the product.

**Check**

- [ ] **User preferences** (dark mode, compact mode) are in or out of scope.
- [ ] **White-label / multi-tenant** branding limits (logo, accent only vs full theme).
- [ ] **Defaults** and **reset** behavior for customized views (tables, dashboards).
- [ ] **Admin vs end-user** customization boundaries are clear.

**Why it matters** — Unspecified customization leads to one-off CSS and security issues (e.g. arbitrary colors breaking contrast).

---

## 7. Resolution and responsive layout

**What it is** — How layout **adapts** across viewport sizes, density, and pixel density—not only “mobile and desktop.”

**Check**

- [ ] **Breakpoints** and what reflows at each (stack vs columns, hidden chrome, nav pattern).
- [ ] **Safe areas** (notches), **keyboard inset** on mobile forms, and **sticky** headers/footers behavior.
- [ ] **Image resolution** strategy (1x/2x, art direction, max width).
- [ ] **Tables**: horizontal scroll vs column hide vs card stack—decided per breakpoint.
- [ ] **Zoom** up to 200%: no clipped critical actions (WCAG-oriented teams often check this).

**Why it matters** — Responsive gaps are a top source of production bugs and support tickets.

---

## 8. Consistency with the design system

**What it is** — Alignment to **tokens and components** your org already ships.

**Check**

- [ ] Primitives **reuse** system `Button`, `Input`, spacing, and type ramps—or deviations are **documented with reason**.
- [ ] **New components** proposed for the system vs kept local to the feature are decided.
- [ ] **Do / don’t** from the system doc are respected for patterns (e.g. one primary CTA).

**Why it matters** — Consistency speeds build and reduces bespoke debt—when you break the system, do it deliberately.

---

## 9. Performance awareness (design-side)

**What it is** — Choices that affect **weight and runtime** even before engineering optimizes.

**Check**

- [ ] **Heavy media** (hero video, large carousels) justified; poster frames and fallbacks considered.
- [ ] **Above-the-fold** complexity is reasonable for target devices.
- [ ] **Lists** specify pagination vs infinite scroll vs virtualized assumptions.

**Why it matters** — Design can’t fix bad architecture alone, but it can avoid painting teams into slow UX corners.

---

## How to use this list

1. **Walk the checklist** with design + engineering + content in one short review.
2. **Export** checked items or notes into your ticket or Figma dev-mode description.
3. **Revisit** after usability tests or beta—”complete” for v1 can loosen or tighten for v2.

## Related topics

- [Development checklist](../development-checklist/README.md) — downstream engineering gate after design is approved
- [Audience](../audience/README.md) — who should join which parts of this review
- [Key concepts](../key-concepts/README.md) — tokens, patterns, and docs that underpin consistency
- [Example: Button](../button-example/README.md) — depth of spec for a single primitive

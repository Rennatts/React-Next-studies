# ARIA roles

ARIA roles help assistive technologies understand **what an element is** (button, navigation landmark, dialog, etc.). In React/Next.js, the best default is:

- Use **semantic HTML first** (`<button>`, `<nav>`, `<header>`, `<main>`, `<form>`, `<ul>`…)
- Add ARIA only when you can’t express the right semantics with HTML alone

## What a “role” actually does

A role maps an element into the accessibility tree as a certain **widget** or **structure**.

- **Correct role + name** ⇒ screen readers can announce it properly
- **Wrong role** ⇒ you can make a component *less* accessible (or actively misleading)

## The 3 ARIA rules of thumb

1) **Don’t add roles to elements that already have them**

- `<button>` already has role `button`
- `<a href>` already has role `link`
- `<input type="checkbox">` already has role `checkbox`

2) **If you add a role, you must also provide the expected keyboard behavior**

Example: `role="button"` on a `<div>` means you also need:

- `tabIndex={0}`
- Enter/Space keyboard activation
- focus styling

If that sounds like work… it is. Prefer `<button>`.

3) **Roles are not enough: most widgets need name + state**

- “Name”: `aria-label`, `aria-labelledby`, or visible text
- “State”: `aria-expanded`, `aria-pressed`, `aria-selected`, etc.

## Landmark roles (page structure)

Landmarks help users navigate quickly:

- `<header>` (optionally `role="banner"`)
- `<nav>` (role `navigation`)
- `<main>` (role `main`)
- `<footer>` (role `contentinfo`)
- `<aside>` (role `complementary`)

Prefer semantic elements; only add `role` if you’re not using them.

## Common widget roles (and better HTML)

- **Button**: use `<button>` not `role="button"`
- **Link**: use `<a href="...">` not `role="link"`
- **Checkbox**: use `<input type="checkbox">` not `role="checkbox"`
- **Text input**: use `<input>` + `<label>` not `role="textbox"` on a `<div>`

If you build custom UI controls, consider whether you can use a visually-hidden native control underneath, or a library with strong a11y defaults.

## Role + accessible name examples

- Visible text often becomes the name:
  - `<button>Save</button>` → “Save, button”
- For icon-only buttons, provide a label:
  - `<button aria-label="Close">…</button>`
- For composite widgets, use `aria-labelledby` to reference an element id.

## `aria-*` vs roles

- **Role**: what is it?
- **aria-label / aria-labelledby**: what is it called?
- **aria-describedby**: extra explanation / hint text
- **aria-expanded / aria-pressed**: what state is it in?

## A tiny Next.js/React demo in this repo

This folder includes a small demo component:

- `AriaRolesDemo.tsx`

It shows:

- semantic landmarks
- a correct icon-only button with `aria-label`
- a “bad idea” example (`div role="button"`) to highlight keyboard requirements

## Related in this repo

- [Reusable components vs domain components](../../project-architecture/reusable-vs-domain-components/README.md) — shared UI primitives should get accessibility details right.  
- [Separation of concerns](../../project-architecture/separation-of-concerns/README.md) — keep semantics/ARIA close to UI components, not data modules.

## Try it

Open `/studies/accessibility/aria-roles`.


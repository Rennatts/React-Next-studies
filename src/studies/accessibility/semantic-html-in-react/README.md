# Semantic HTML in React

The most effective accessibility technique in React is also the simplest:

**Use semantic HTML elements** before reaching for ARIA.

Semantic elements:

- give screen readers better defaults (role/name/state)
- give keyboard users correct behavior “for free”
- reduce the amount of ARIA you must maintain

## Prefer these elements (common mappings)

- **Actions**: `<button type="button">` (not `<div onClick>`)
- **Navigation**: `<a href="...">` (not `<span onClick>`)
- **Sections/landmarks**: `<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`
- **Lists**: `<ul>`/`<ol>` + `<li>` (not repeated `<div>`)
- **Forms**: `<label htmlFor>` + `<input>`/`<select>`/`<textarea>`
- **Structure**: headings `<h1>…<h6>` (don’t style random `<div>` as “heading”)

## Buttons vs links (a frequent mistake)

Rule:

- If it **changes data/UI state** → use a **button**
- If it **navigates** → use a **link**

Why it matters:

- Links support “open in new tab”, copy link address, browser status bar, etc.
- Buttons have correct keyboard activation patterns for actions.

## Labels: don’t rely on placeholders

For inputs:

- Use a visible `<label>` when possible.
- If you must hide it visually, keep it in the DOM (visually-hidden pattern) so the accessible name exists.

Placeholders are not a reliable label replacement (they disappear while typing and can be low-contrast).

## Don’t remove focus outlines

If you customize focus styling, ensure it is visible and consistent. Keyboard users depend on it.

## When ARIA is still needed

ARIA is helpful when:

- you build a custom composite widget (tabs, combobox, menu)
- you need to attach a hint/error description (`aria-describedby`)
- you need to expose state (`aria-expanded`, `aria-pressed`)

But ARIA should complement semantics, not replace them.

## Demo in this folder

- `SemanticHtmlDemo.tsx` compares semantic elements to common non-semantic patterns and shows the “semantic-first” equivalents.

## Related in this repo

- [ARIA roles](../aria-roles/README.md) — role/name/state fundamentals.  
- [Keyboard navigation](../keyboard-navigation/README.md) — semantic controls provide correct keyboard behavior.  
- [Screen reader behavior](../screen-reader-behavior/README.md) — what gets announced comes from semantics + ARIA.

## Try it

Open `/studies/accessibility/semantic-html-in-react`.


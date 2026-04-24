# Reusability and encapsulating styles

**Reusability** is shipping the same UI building block in many places without duplicating behavior and markup. **Encapsulation** is keeping **styles and implementation details** inside a boundary so changes do not accidentally break unrelated parts of the app.

A design system succeeds when both work together: **reusable primitives** with **stable, scoped styling** and clear public APIs.

## Reusability: what to reuse (and what not to)

### Reuse by default

- **Primitives** — `Button`, `Input`, `Dialog`, layout helpers (`Stack`, `Grid`) used across features.
- **Patterns** — documented compositions (empty state, filter bar) copied as **structure**, not as forked one-offs.
- **Tokens** — spacing, color, type **names** instead of raw values scattered in files.

### When duplication is reasonable

- **Different bounded contexts** — two “cards” that look similar but have incompatible lifecycles or APIs may deserve separate components until a real shared abstraction appears.
- **Experiments** — short-lived marketing pages sometimes stay local; promote to the system **after** the pattern stabilizes.

### Reuse through **API**, not through **internals**

Consumers should depend on **props and slots** (`children`, `startSlot`), not on internal DOM or class names. That boundary is what makes refactors inside the component safe.

## Encapsulating styles: goals

1. **Predictable** — changing a component’s styles should not repaint half the page.
2. **Local reasoning** — a reader can understand how something looks by opening **one module**.
3. **Themeable** — global changes (dark mode, brand) flow through **tokens**, not find-and-replace in every file.

## Common encapsulation techniques

| Approach | Idea | Trade-offs |
|----------|------|------------|
| **CSS Modules** (e.g. `Button.module.css`) | Build step generates **unique class names** per file; import classes as JS strings. | Simple mental model; works well in Next.js; no runtime cost. |
| **Utility-first (Tailwind)** | Small classes compose in markup; **design tokens** map to the config; use `@layer components` for repeated recipes. | Fast iteration; risk of **utility soup** without component wrappers or lint rules. |
| **CSS-in-JS** (styled-components, Emotion) | Styles colocated with component; **scoping** via generated class or rules. | Runtime cost (varies by lib); SSR/hydration setup matters in Next. |
| **Shadow DOM** (Web Components) | Browser-enforced **style boundary**. | Harder to theme with global tokens; event/composition quirks; less common in React app roots. |
| **BEM / namespaced classes** | Manual convention (`ds-button__icon`) reduces collisions. | Discipline-heavy; easier to leak globals than with Modules. |

Pick what matches your stack; the **design system** should document the **canonical** approach so product code does not mix five patterns.

## Tokens as encapsulation of *decisions*

Even without CSS Modules, **design tokens** encapsulate *meaning*: `color.action.primary` hides whether the value is `#000` or `oklch(...)`. Components reference **semantic** tokens so rebrands update **data**, not every stylesheet.

## Anti-patterns (style leakage)

- **Global element selectors** (`div { margin: 0 }`, `button { ... }`) that hit third-party or sibling features.
- **Deep combinators** from parent pages into library internals (`Page .ds-button span`).
- **`!important` chains** to win specificity wars instead of fixing structure.
- **Relying on markup structure** outside the component’s root for styling (brittle to refactors).

## React and Next.js notes

- Prefer **colocated** styles (`Component.module.css` or styled next to the file) owned by the component.
- Avoid parents styling **children’s internal nodes**; pass **variants** or **className** hooks documented as public API.
- For App Router, keep **server vs client** boundaries clear: client-only styling libs only in `"use client"` components when required.

## Relation to the rest of these notes

- [Key concepts](../key-concepts/README.md) — tokens and components in the bigger picture  
- [Example: Button](../button-example/README.md) — a small reusable primitive with explicit variants  
- [Core principles](../core-principles/README.md) — single source of truth and composability  
- [Mistakes to avoid](../mistakes-to-avoid/README.md) — what goes wrong when reuse and boundaries are skipped  

## Related code patterns in this repo

Implementation patterns (container/presentational, composition, etc.) live under **`src/studies/design-patterns/`**—they describe **how** to structure React; this page describes **how styles and reuse boundaries** behave in a system-minded codebase.

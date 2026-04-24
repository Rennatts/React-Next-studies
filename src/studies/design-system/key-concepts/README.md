# Key concepts of design systems

This page gathers **vocabulary and ideas** you will see in almost every mature system. Use it as a map; deeper behavior is product-specific.

## Mental model (how the pieces stack)

Most teams describe the same stack, bottom to top:

1. **Foundations** — global visual rules (ramps, scales, grids).
2. **Tokens** — named decisions that reference foundations (and each other).
3. **Components** — UI building blocks implemented with tokens.
4. **Patterns** — recommended compositions and flows using components.
5. **Product UI** — screens built from patterns and allowed exceptions.

Documentation and governance wrap all of the above; versioning applies especially to **tokens** and **components** consumers depend on.

## Foundations

**Foundations** are the global rules of the visual language: color ramps, type scales, spacing units, elevation (shadow) steps, grids, motion curves, icon style, and illustration guidance. They rarely appear directly in app code as one-off values; they **feed tokens** so products stay on-brand when foundations change.

## Design tokens

**Tokens** are **named design decisions** stored as data (JSON, YAML) or exposed as variables (CSS custom properties, Sass, Swift/Android resource generators).

- **Primitive (or global) tokens** — Raw scale: `color.blue.500`, `space.4`. Stable across themes.
- **Semantic tokens** — Intent: `color.surface.default`, `color.text.muted`, `space.section`. Map to primitives per theme (light/dark, brand A/B).
- **Aliases** — One semantic name points to another to reduce churn (`color.action.primary` → `color.brand.600`).

Tokens are the **contract** between design tools and code: change the token pipeline, and many screens update without hunting hex codes.

## Components

**Components** are reusable UI pieces with a documented API: `Button`, `TextField`, `Dialog`. They compose **states** (hover, focus, invalid), **variants** (primary, danger), and **accessibility** behavior (roles, keyboard).

Distinguish **primitive** components (small, general) from **composite** or **domain** components (DateRangePicker, PaymentMethodSelector) that may live in the system or in product code on top of primitives.

### Composition and API surface

Components expose a **stable API**: props, slots (`children`, `startIcon`), and sometimes **compound** subcomponents (`Menu`, `MenuItem`). A clear API reduces one-off overrides and keeps design intent expressible in code reviews.

## Layout, density, and grid

**Layout** concepts—breakpoints, columns, gutters—often live partly in **tokens** (spacing) and partly in **layout primitives** (`Stack`, `Inline`, `Grid`). **Density** (comfortable vs compact) may be a theme dimension that adjusts spacing and touch targets without forking every component. For concrete patterns—**structural layers**, **split** toolbars/rows, **column** gutters, **grid** (2D gaps and layout grids), **inline** (typographic flow), and **inline-bundle** chip/icon clusters—see [Spacing patterns](../spacing-patterns/README.md).

## Patterns

**Patterns** describe **how to combine components** for a user goal: “empty state,” “destructive confirm,” “filterable table,” “wizard stepper.” They often include **content**, **layout**, and **error handling** guidance—not only screenshots.

Patterns sit **above** individual components in the mental model: same `Button` + `Dialog`, different pattern copy and flow for delete vs archive.

## Documentation

The **docs site** (Storybook, Backlight, custom Next site) is where the system **ships**: live examples, props, accessibility notes, do/don’t, and changelog links. Treat it as a product with **search**, **version switchers**, and **onboarding paths** per role (see [Audience](../audience/README.md)).

## Theming and multi-brand

**Theming** swaps token values (light/dark, density, high contrast) while keeping **semantic names** stable in components. **Multi-brand** orgs may use separate token sets or brand dimensions with shared primitives—complexity grows quickly; document which layers are shared vs forked.

## Motion

**Motion** is part of the system: duration and easing tokens, reduced-motion preferences, and pattern rules (e.g. when dialogs enter). Treat animation as **functional**—feedback and hierarchy—not only decoration.

## Tooling and handoff

**Tooling** connects design and code: Figma variables ↔ token JSON, Storybook builds, visual regression, lint rules (e.g. ban raw hex in app code). **Handoff** improves when names in Figma match token and component names in the repo.

## Content in the system

**Microcopy**, **empty states**, and **error strings** are often documented alongside patterns so product teams do not invent inconsistent tone. Content designers are first-class consumers of the same catalog as UI designers.

## Versioning and distribution

Systems consumed as **packages** use **semver** (or documented exceptions): patch for fixes, minor for additive props, major for breaking API or token removals. Pair releases with **migration guides** and, when possible, **codemods** or deprecation warnings in dev.

## Accessibility (shift-left)

Accessibility is a **cross-cutting concept**: token contrast, focus rings, component roles, pattern-level flows (focus trap in dialogs). “Shift-left” means catching issues in **design and component review**, not only in late QA.

## Governance (light touch)

**Governance** covers **who can change what**: contribution RFCs, design critique for new primitives, breaking-change approval. It is a concept, not bureaucracy for its own sake—scale rules with org size (see [Team structure](../team-structure/README.md)).

## Related topics

- [What is a design system?](../README.md) — how these pieces fit the overall toolkit
- [Core principles](../core-principles/README.md) — values behind tokens, docs, and evolution
- [Design phase checklist](../design-phase-checklist/README.md) — design readiness before build
- [Development checklist](../development-checklist/README.md) — implementation readiness before release
- [Mistakes to avoid](../mistakes-to-avoid/README.md) — anti-patterns that undermine tokens, docs, and workflow
- [Reusability and encapsulating styles](../reusability-and-styles/README.md) — component APIs and scoped styling in practice
- [Style composition](../style-composition/README.md) — layering tokens, utilities, and variants
- [Spacing patterns](../spacing-patterns/README.md) — layers, split, columns, grid, inline, inline-bundle, semantic spacing roles
- [Example: Button](../button-example/README.md) — how one primitive is documented end-to-end

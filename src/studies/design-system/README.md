# Design system

Notes in this folder document **design systems** as a product and engineering discipline—not this app’s visual theme alone. Topics build from definitions toward tokens, components, and governance over time.

## What is a design system?

A **design system** is a **shared, versioned toolkit** that helps teams ship consistent interfaces at scale. It connects **how things look** (visual language), **how they behave** (interaction and motion), and **how they are built** (implementation) so design and engineering stay aligned.

In practice it is usually a combination of:

| Layer | Typical contents |
|-------|------------------|
| **Foundations** | Color, typography, spacing, elevation, grids, motion curves, iconography, illustration style |
| **Tokens** | Named decisions (e.g. `color.action.primary`) as data—often JSON or CSS variables—so themes and platforms stay in sync |
| **Components** | Buttons, inputs, dialogs, navigation patterns—documented APIs, states, and accessibility expectations |
| **Patterns** | Compositions for common flows (forms, empty states, errors, lists)—how components work together |
| **Documentation** | Usage, do’s and don’ts, rationale, and examples (often in a Storybook or similar site) |
| **Process** | Contribution, review, release cadence, deprecation, and adoption across products |

A design system is **not** only a Figma UI kit, and **not** only a component library: the value is the **contract** between design and code plus the **operating model** that keeps it trustworthy.

For a concise tour of **tokens, components, patterns, docs, theming, and versioning**, see [Key concepts](./key-concepts/README.md).

## Why teams invest in one

- **Consistency** — Users recognize patterns; brand and quality feel intentional.
- **Speed** — Reuse instead of reinventing buttons, forms, and layouts per feature.
- **Accessibility** — Baseline WCAG-minded defaults and tested components propagate everywhere.
- **Maintenance** — One place to fix a bug or refresh a token instead of scattered copies.

For a fuller treatment (users, business, teams, cost of absence, when ROI is highest), see **[Why a design system matters](./importance/README.md)**.

Honest trade-offs—cost, rigidity, adoption, upgrades—are covered in **[Downsides and trade-offs](./downsides/README.md)**. Common **execution mistakes** (scale-first builds, missing workflow docs, and more) are in **[Mistakes to avoid](./mistakes-to-avoid/README.md)**.

## Relationship to “design patterns” in code

In this repo, **design patterns** (container/presentational, compound components, etc.) are **implementation strategies**. A **design system** is the **vocabulary and kit** those patterns assemble—tokens, primitives, and documented rules. You can use solid React patterns *inside* system components, or outside them; the system describes *what* you should build toward, not only *how* to structure code.

**Who consumes** the kit and docs is covered under [Audience](./audience/README.md). **Who keeps it running** is covered under [Team structure](./team-structure/README.md).

## Topics in this section

- **[Why it matters](./importance/README.md)** — importance for users, the business, and teams; cost of not having a system.
- **[Downsides and trade-offs](./downsides/README.md)** — costs, rigidity, adoption friction, when benefits shrink.
- **[Mistakes to avoid](./mistakes-to-avoid/README.md)** — anti-patterns: scale-first build, training without artifacts, missing workflow/decision docs, drift, skipping tokens, weak ownership.
- **[Core principles](./core-principles/README.md)** — values that guide tokens, components, and governance.
- **[Key concepts](./key-concepts/README.md)** — foundations, tokens, components vs patterns, docs, theming, versioning, a11y, governance.
- **[Reusability and encapsulating styles](./reusability-and-styles/README.md)** — reusable primitives, stable APIs, scoped CSS approaches, tokens vs leakage.
- **[Style composition](./style-composition/README.md)** — composing tokens, layers, utilities, and variants; slots; anti-patterns vs encapsulation.
- **[Spacing patterns](./spacing-patterns/README.md)** — spacing as documented patterns: **layers**, **split**, **columns** (gutters), **grid** (2D rhythm), **inline** (line-box / text-adjacent), and **inline-bundle** (flex clusters with `gap`).
- **[Audience](./audience/README.md)** — designers, engineers, content, a11y, PM, QA, leadership, end users; how to serve them in docs.
- **[Design phase checklist](./design-phase-checklist/README.md)** — gate design before handoff: a11y, interaction, context, completion, content, customization, resolution, consistency, performance.
- **[Development checklist](./development-checklist/README.md)** — gate implementation: responsiveness, errors, validation, browsers, a11y in code, performance, security, testing, i18n, observability.
- **[Example: Button](./button-example/README.md)** — real-life component doc structure (variants, states, a11y, API) + `SystemButton` demo.
- **[Team structure](./team-structure/README.md)** — core roles, guilds, centralized vs federated, squad interaction, sizing.

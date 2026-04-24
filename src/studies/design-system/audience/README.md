# Audience of design systems

“Audience” means **everyone who relies on** the design system—directly or indirectly—not only the core platform team. Documentation, APIs, and process should acknowledge **different jobs** and **different depths** of engagement.

## Primary consumers (hands-on)

| Audience | What they need from the system |
|----------|--------------------------------|
| **Product / UI designers** | Figma (or equivalent) libraries, usage rules, do’s and don’ts, responsive and state specs, contribution paths |
| **Frontend engineers** | Component APIs, props, TypeScript types, installation/versioning, migration guides, Storybook or docs site, test patterns |
| **Mobile engineers** (when applicable) | Parity guidelines, native tokens or shared contracts, platform-specific escape hatches |
| **Content designers** | Voice and tone tied to components (errors, empty states, buttons), string patterns, localization notes |
| **Accessibility specialists** | Acceptance criteria per component, keyboard flows, audit history, how to file a11y bugs against the system |

These roles **compose most screens**; they are the main “customers” of tokens and primitives.

## Secondary stakeholders (informed users)

| Audience | What they need |
|----------|----------------|
| **Product managers** | High-level map of what exists, when to use system vs custom, rough effort for adoption or migration |
| **Engineering leads / architects** | Integration with stack (bundler, SSR, monorepo), versioning policy, performance and bundle impact |
| **QA** | Stable selectors where documented, expected states and visual regression baselines |
| **Brand / marketing** | Alignment of campaigns and landing pages with foundations without breaking product UI rules |
| **Leadership** | Outcomes (velocity, consistency, risk), not pixel detail—clear narrative and metrics |

They may not open Storybook daily, but decisions they make **shape adoption** and resourcing.

## End users (indirect audience)

People using your product **never** read your design system site, yet they are the **ultimate audience** for consistency, accessibility, and clarity. The system exists to make **their** experience more coherent and reliable; internal docs should keep that link explicit so trade-offs are not purely inward-facing.

## External and occasional audiences

- **Agencies and contractors** — Need onboarding packs, license/token export, and clear “in / out of system” boundaries.
- **Open-source or partner teams** — May need public docs, semver discipline, and changelogs.
- **New hires** — Benefit from learning paths: foundations → tokens → components → patterns.

## Serving multiple audiences in one docs site

- **Role-based entry points** (“Start here if you are a designer / engineer / PM”).
- **Progressive depth** — Overview pages with links to API detail, not one wall of props.
- **Search and naming** — Predictable token and component names beat clever branding inside the catalog.

## Related topics

- [Design phase checklist](../design-phase-checklist/README.md) — readiness gate before handoff (a11y, interaction, context, and more)
- [Development checklist](../development-checklist/README.md) — engineering gate after design: browsers, validation, errors, tests
- [Key concepts](../key-concepts/README.md) — vocabulary (tokens, patterns, docs) this audience reads
- [Example: Button](../button-example/README.md) — sample of component documentation shaped for these audiences
- [Why a design system matters](../importance/README.md) — outcomes this audience ultimately receives
- [Team structure](../team-structure/README.md) — who builds and maintains what this audience consumes
- [Core principles](../core-principles/README.md) — principles that shape docs and APIs for these readers
- [What is a design system?](../README.md) — definition and layers they interact with

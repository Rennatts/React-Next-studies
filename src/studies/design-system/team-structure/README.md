# Team structure for design systems

A design system needs **clear ownership** and **paths for contribution**. “Team structure” here means **who does the work**, **how they interact with product squads**, and **how decisions flow**—not a generic org chart for every company.

## Core platform team (typical)

Most mature programs anchor a **small, cross-functional platform team** responsible for the shared kit and its lifecycle:

| Role | Focus |
|------|--------|
| **Design system lead / PM** | Roadmap, prioritization, adoption metrics, stakeholder alignment, release communication |
| **Design technologist / “design engineer”** | Tokens, component APIs, Storybook/docs, implementation quality, handoff from design |
| **Product designer (IC or shared)** | Visual language, patterns, specs, critique of incoming contributions |
| **Frontend engineer(s)** | Library code, tests, bundling, CI, framework upgrades, performance |
| **Accessibility specialist** (dedicated or fractionally) | Audits, component acceptance criteria, training—especially in regulated or public sectors |

Exact titles vary; the point is **design + engineering + product thinking** in the same room, with time **protected** for system work—not only “20% Fridays.”

## Extended network

- **Chapter or guild** — Designers and engineers across squads who meet regularly, share patterns, and nominate work for the core team.
- **Contributors** — Feature teams who open PRs for new variants or docs; core team reviews and merges.
- **Executive sponsor** — Air cover for resourcing, cross-product mandates, and resolving priority conflicts.

## Centralized vs federated

- **Centralized** — One team owns most tokens and components; best when products are similar and you need strict consistency.
- **Federated** — A **core** maintains foundations and primitives; **product teams** own domain-specific components on top, with shared standards and review.
- **Hybrid** — Common in large orgs: core for primitives, federated “satellites” for verticals (e.g. marketing site vs app shell).

Pick the model that matches **how similar your surfaces are** and **how much autonomy** squads need.

## Interaction with product squads

- **Intake** — Clear channels (Slack, tickets, RFCs) for requests, bugs, and proposals.
- **Office hours or pairing** — Reduces “us vs platform” queue dynamics and teaches contribution.
- **SLAs** — Realistic expectations for reviews and releases so squads can plan.

## Decision rights (lightweight)

Avoid ambiguity on who approves what:

- **Tokens / brand** — Often design + brand leadership sign-off.
- **Primitive components** — Core team + a11y bar; breaking changes need migration notes.
- **Patterns** — May involve product design leads for complex flows.

You do not need a heavy RACI on day one; you **do** need written defaults so escalations are rare.

## Sizing

There is no universal ratio. Signals you are **understaffed**: endless backlog, slow reviews, squads forking components, docs always stale. Signals you might **over-centralize**: every small tweak needs a committee. Adjust headcount and federated scope as adoption grows.

## Related topics

- [Key concepts](../key-concepts/README.md) — what the platform team maintains (tokens, patterns, docs)
- [Audience](../audience/README.md) — who consumes what this team produces
- [Core principles](../core-principles/README.md) — values that shape how this team operates
- [Downsides and trade-offs](../downsides/README.md) — bottlenecks when structure is missing or wrong
- [Why a design system matters](../importance/README.md) — why funding this structure pays off

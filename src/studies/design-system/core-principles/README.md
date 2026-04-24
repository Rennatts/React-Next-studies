# Core principles

These principles guide how a design system is **defined**, **documented**, and **evolved**. They are intentionally high level; later notes can map them to tokens, components, and tooling.

## 1. Single source of truth

Decisions (colors, spacing scales, type ramps) should live in **one authoritative layer**—usually **design tokens** consumed by design tools and code. Duplicating hex codes or spacing magic numbers across files undermines trust and makes redesigns expensive.

## 2. Consistency over novelty

Prefer **reusing and extending** documented primitives before inventing one-off UI. Consistency reduces cognitive load for users and for teammates reviewing work. Novelty belongs where it truly differentiates the product, not in every button variant.

## 3. Accessibility is non-negotiable

Components ship with **keyboard support**, **focus order**, **labels**, **contrast**, and **state** (loading, error, disabled) accounted for—not as optional add-ons. Documentation should state expectations and link to testing practices.

## 4. Clarity and restraint

A smaller, well-documented set of tokens and components beats a large catalog that nobody can navigate. **Fewer, sharper choices** make the system easier to learn and harder to misuse.

## 5. Composability

Primitives should **combine predictably** (layout + content + actions) so product teams build screens from **lego-like pieces** without fighting the API. Favor flexible composition over rigid one-off templates where possible.

## 6. Scalability of process

The system must support **many contributors** and **multiple products**: naming conventions, versioning, changelogs, migration guides, and clear ownership. A system that only works when one hero maintains it is fragile.

## 7. Documentation as product

Docs are not an afterthought: they are how the system **ships**. Examples, props, do/don’t imagery, and rationale turn tokens and components into something teams can **adopt with confidence**.

## 8. Alignment with brand and content

Visual language, voice, and motion should reinforce **brand strategy** and **content design**—not compete with them. The system encodes brand decisions so they repeat correctly at scale.

## 9. Performance awareness

Heavy assets, unnecessary variants, and unbounded flexibility can slow apps. Principles and guidelines should encourage **lean defaults** and patterns that stay fast on real devices and networks.

## 10. Living evolution

Products change; the system **must change with them**—with deprecation paths, communication, and time budgeted for migrations. A frozen library that nobody updates becomes shelfware.

---

**See also:** [What is a design system?](../README.md) · [Why a design system matters](../importance/README.md) · [Downsides and trade-offs](../downsides/README.md) · [Mistakes to avoid](../mistakes-to-avoid/README.md) · [Key concepts](../key-concepts/README.md) · [Reusability and encapsulating styles](../reusability-and-styles/README.md) · [Audience](../audience/README.md) · [Example: Button](../button-example/README.md) · [Team structure](../team-structure/README.md)

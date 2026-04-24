# Mistakes to avoid when building a design system

These are **common anti-patterns**—often born of good intentions—that slow adoption, burn trust, or create shelfware. Use this list to **challenge plans** and to **retrospect** honestly after a quarter.

---

## 1. Building for hypothetical scale on day one

**The mistake** — Designing a **full enterprise catalog** (dozens of components, every edge case) before any product team ships with a **thin vertical slice**.

**Why it hurts** — You optimize for problems you do not yet have; real product needs rewrite your APIs anyway. Teams keep shipping outside the system while you polish unused widgets.

**Better** — Start with **tokens + a handful of primitives** used on one real surface, then expand with **proven demand** (see [Core principles](../core-principles/README.md): restraint and living evolution).

---

## 2. “Educating” before there is something to adopt

**The mistake** — Weeks of **workshops, decks, and roadshows** while the **package, Figma library, or docs site** is still empty or unstable.

**Why it hurts** — People cannot practice what does not exist; training without artifacts feels like theater and erodes credibility.

**Better** — Ship a **minimum credible kit** first, then teach **on real tasks** (“build this screen using `Button` + `Stack`”). Documentation and office hours follow the product.

---

## 3. Not discussing workflow

**The mistake** — Publishing components but never agreeing **how** work flows: intake for requests, design critique, PR review, release cadence, who approves breaking changes, how squads get unblocked.

**Why it hurts** — Everything becomes ad hoc; the platform team becomes a **black hole queue** or teams fork silently.

**Better** — Write down a **lightweight workflow** (even one page): how to propose a change, SLAs for review, and where to ask for help. Tie to [Team structure](../team-structure/README.md).

---

## 4. Not documenting decisions

**The mistake** — Token renames, API changes, and “we chose X over Y” live only in **Slack threads** or one person’s head.

**Why it hurts** — Six months later nobody knows **why**; migrations repeat debates; new hires fear touching anything.

**Better** — Short **ADRs or decision logs** (what, when, alternatives rejected) linked from the repo or docs. Changelogs are not optional for consumers.

---

## 5. Perfectionism before adoption

**The mistake** — Blocking release until every component matches an ideal visual spec, or until a11y audits are “all green” on components no one uses yet.

**Why it hurts** — The org learns nothing from real usage; feedback arrives too late.

**Better** — **Label maturity** (experimental / stable / deprecated), ship, measure adoption, iterate. Pair honesty in docs with a clear quality bar for **stable** tier.

---

## 6. Letting Figma and code drift apart

**The mistake** — Treating the **UI kit** as the system while the **code library** lags by months (or the reverse).

**Why it hurts** — Designers and engineers argue over “source of truth”; handoff quality collapses.

**Better** — Tie releases: **versioned** Figma files or variables mapped to the same **token build** the code consumes; one owner checks parity at release time.

---

## 7. Skipping tokens and jumping straight to components

**The mistake** — Shipping `Button` with **hard-coded hex and spacing** in every component file.

**Why it hurts** — Rebrands and themes become a rewrite; “system” is cosmetic.

**Better** — **Tokens first** (or in the same PR as the first primitives) so refactors are data changes, not archeology (see [Key concepts](../key-concepts/README.md)).

---

## 8. No clear ownership

**The mistake** — “Everyone owns it” so **no one** prioritizes fixes, docs, or releases when pressure hits.

**Why it hurts** — The library rots; security and a11y patches never ship.

**Better** — Named **core team or rotating owners** with protected capacity and a visible backlog.

---

## 9. Vanity metrics instead of adoption

**The mistake** — Celebrating **Storybook page views** or **npm downloads** while product repos still **duplicate** buttons and ignore the package.

**Why it hurts** — Leadership funds the wrong work; the system stays optional.

**Better** — Track **usage in product** (imports, token references, reduction of duplicate components) and **time to ship** a typical flow.

---

## 10. Copy-paste another org’s system without workflow fit

**The mistake** — Forking a famous open-source system **wholesale** without adapting **governance, naming, and contribution** to how *your* company decides and ships.

**Why it hurts** — Teams fight foreign conventions; you inherit complexity you do not need.

**Better** — Borrow **patterns**, not identity: align naming and process with your org, and document **exceptions** explicitly.

---

## How to use this list

- In **planning**, use it as a pre-mortem: “Which of these are we at risk of doing?”
- In **retro**, pick one mistake to reduce next quarter—not all ten at once.

## Related topics

- [Reusability and encapsulating styles](../reusability-and-styles/README.md) — positive techniques that counter “skip tokens” and leakage
- [Downsides and trade-offs](../downsides/README.md) — structural costs even when you avoid these mistakes
- [Core principles](../core-principles/README.md) — positive habits that counter many anti-patterns
- [Team structure](../team-structure/README.md) — ownership and workflow in practice

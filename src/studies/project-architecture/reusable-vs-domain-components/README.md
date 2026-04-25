# Reusable components vs domain components

In a product UI codebase, there are usually two broad component types:

- **Reusable (shared) components**: generic building blocks you can use across features without renaming them.
- **Domain (feature) components**: components that encode product language and rules (billing, onboarding, permissions…).

The point of this split is **change locality**: if “Billing needs X”, you should usually change **billing code**, not your shared library.

## Reusable (shared) components

### What they look like

- Named for **UI intent**, not business meaning: `Button`, `Input`, `Dialog`, `Tabs`, `Toast`.
- Configured via **props/variants/slots**, not via domain-specific enums.
- Have strong **accessibility** and consistent styling/token usage.
- Stable APIs (changing them should be rare and deliberate).

### What they should *not* contain

- Domain words: `Invoice`, `Subscription`, `Checkout`, `Admin`.
- Network calls.
- Permission rules (“only admins can click”) unless that concept is *purely generic* (rare).

### Typical location

```txt
src/shared/ui/
  Button.tsx
  Dialog.tsx
src/shared/lib/
  formatDate.ts
```

## Domain (feature) components

### What they look like

- Named for **business meaning**: `InvoiceStatusBadge`, `BillingPlanCard`, `CheckoutSummary`.
- Own domain rules and composition: “which fields show”, “which states exist”, “what labels mean”.
- Often assemble shared UI primitives into a stable domain view.
- Can change frequently because the product changes frequently.

### Typical location

```txt
src/features/billing/
  components/
    BillingPlanCard.tsx
    InvoiceStatusBadge.tsx
  BillingScreen.tsx
  api.ts
  types.ts
```

## The core rule of thumb

If a component would need to be **renamed** or **rethought** in another product, it’s probably **domain**.

If a component can be reused without explaining the business, it may be **shared**.

## A practical “3-layer” mental model

This tends to work well in React apps:

1. **Shared primitives** (`shared/ui`) — buttons, inputs, layout primitives
2. **Feature UI** (`features/<x>/components`) — domain compositions, feature-specific views
3. **Screens/routes** (`features/<x>/*Screen*` and `app/**/page.tsx`) — glue code and route boundaries

## Common mistakes

### 1) “Shared” becomes a dumping ground

Smell: `shared/` contains `BillingCard`, `CheckoutHeader`, `AdminUserRow`.

Fix: move those to `features/…` and keep shared strictly generic.

### 2) Over-generalizing too early

Smell: a generic `Card` takes 12 props to support one edge case from Billing.

Fix: keep a simple shared primitive, and build a domain wrapper in the feature:

- `shared/ui/Card`
- `features/billing/BillingPlanCard` (composes `Card`)

### 3) Shared components depend on feature code

Smell: `shared/ui/Dialog` imports `features/auth/*`.

Fix: enforce one-way dependencies: features can depend on shared; shared should not depend on features.

## Where does state and data fetching belong?

There is no single rule, but a useful default is:

- **Shared UI**: minimal or no app state; local UI state is okay (open/close, focus, animations).
- **Domain components**: can own domain state and orchestration (selected plan, validation rules).
- **Data fetching**: keep HTTP concerns in an **API layer** (and call it from feature code), rather than sprinkling `fetch()` in every leaf.

## Related in this repo

- [Separation of concerns](../separation-of-concerns/README.md) — why these boundaries matter.  
- [Feature-based vs layer-based structure](../feature-vs-layer-structure/README.md) — folder strategy for keeping shared small.  
- [Container components](../../design-patterns/container-components/README.md) — UI vs data wiring split.  
- [Building an API layer](../../api/api-layer/README.md) — transport concerns separated from UI.


# Separation of concerns (SoC)

**Separation of concerns** means structuring code so that each module has **one primary reason to change**. In UI apps, SoC is about keeping responsibilities like **rendering**, **data access**, **domain rules**, and **side effects** from being tangled into one “everything component”.

This is not the same as “many folders”. Good SoC improves:

- **Change locality**: a request changes one place, not ten.
- **Testability**: domain logic can be tested without a browser, network, or React.
- **Readability**: new contributors can predict where things live.

## The most useful boundaries in React/Next apps

### 1) UI rendering vs data loading

- **UI**: “given props/state, render markup”
- **Data loading**: “fetch, cache, normalize errors, retry, map DTOs”

Common shapes in this repo:

- **Container vs presentational** (client-side) — see [container components](../../design-patterns/container-components/README.md)
- **Server Components fetch** (server-side) — keep fetch on the server when possible

### 2) Domain rules vs framework code

Framework code (React components, route handlers, middleware) is mostly glue. Domain rules should be plain functions:

- pricing rules
- validation logic
- permission checks
- mapping API payloads → app models

This keeps your “business logic” portable and easier to change.

### 3) Side effects vs pure computation

Prefer “pure core, effectful edges”:

- **Pure**: data transformations, selectors, derived values
- **Effects**: network calls, `localStorage`, timers, subscriptions

This also makes React hook dependency problems rarer because pure functions don’t capture mutable state.

### 4) Transport models vs UI models

APIs return shapes optimized for transport. UI needs shapes optimized for rendering.

Good SoC often means:

- Keep **DTO types** near API clients / route handlers
- Convert to **domain/UI types** at the boundary

## Smells that SoC is breaking down

- A page component does: fetch + parse + validate + normalize errors + map + render + handle analytics + manage permissions
- Many files import a low-level helper directly (tight coupling) instead of a stable “facade”
- Every feature touches `shared/` on each change (shared becomes a dumping ground)
- “Utils” contains domain rules that only one feature cares about

## Practical patterns that improve SoC (without over-engineering)

### Thin route files

In Next App Router, keep routes thin:

```txt
src/app/(app)/billing/page.tsx        # routing + layout + metadata
src/features/billing/BillingScreen.tsx
```

### A small API layer (one place for HTTP concerns)

Centralize fetch and error normalization (timeouts, abort, JSON parsing, error shape). See:

- [Building an API layer](../../api/api-layer/README.md)

### Feature boundaries

Feature-based folder structure improves SoC by keeping “reasons to change” localized:

- [Feature-based vs layer-based structure](../feature-vs-layer-structure/README.md)

## Trade-offs

- Too little separation → big components, fragile edits, hard testing.
- Too much separation → “abstraction tax” (indirection, premature layers, tiny files that hide the flow).

Use the profiler of your own productivity: if you spend more time navigating than building, collapse layers; if changes keep breaking unrelated areas, strengthen boundaries.

## Related in this repo

- [Container components](../../design-patterns/container-components/README.md) — UI vs data loading split.  
- [Building an API layer](../../api/api-layer/README.md) — transport concerns separated from UI.  
- [Feature-based vs layer-based structure](../feature-vs-layer-structure/README.md) — where to place boundaries.  
- [Reusable components vs domain components](../reusable-vs-domain-components/README.md) — keep shared primitives generic; domain stays in features.  
- [Avoiding unnecessary re-renders](../../advanced-concepts/avoid-unnecessary-rerenders/README.md) — SoC helps performance by reducing “blast radius” of state.


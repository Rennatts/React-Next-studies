# Lifting state up and colocation strategies

**Collocation** keeps state in the **lowest owner** that can still satisfy the feature: if only one row cares about “expanded,” that flag usually lives **in the row**, not in the page.

**Lifting state up** moves state to a **common ancestor** when **multiple children** must read or write the same value, or when a parent must **coordinate** them (wizard steps, shared filters, controlled layout).

Neither is “always correct”—you choose based on **who needs the data** and **who should re-render**.

## Decision heuristics

1. **Start local** — If a single leaf owns the interaction, keep `useState` there until a sibling or parent truly needs the value.
2. **Lift to the lowest shared parent** — When two branches need the same source of truth, move state up only as far as the **nearest** common ancestor that should coordinate them.
3. **Split the tree (state boundary)** — If lifted state forces a big static region to re-render, extract the **stateful island** into a child and keep the chrome in a **stateless shell** (see [Lift components up](../lift-components-up/README.md)).
4. **Avoid prop drilling** — If the lift makes you pass props through many layers that do not use them, consider **composition** (`children`), **context**, or **URL/search params** for that slice of data.

## Demos elsewhere in this repo

- [State collocation](../state-collocation/README.md) — row toggles with render counters.
- [Lift components up](../lift-components-up/README.md) — shell vs stateful child re-render boundary.

## Examples on this page

See **`LiftingStateColocationExamples.tsx`** for small runnable patterns: colocated row state vs lifted expand (wider re-renders), shared count lifted to parent, and a thin shell around a stateful child.

## Further reading

- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)  
- [State as a Snapshot](https://react.dev/learn/state-as-a-snapshot) (why lift changes who updates together)

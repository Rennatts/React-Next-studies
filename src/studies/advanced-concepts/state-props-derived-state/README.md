# State vs props vs derived state

**Props** are inputs from a parent: read them to render; treat them as **immutable** from the child’s perspective (do not assign to `props.x`).

**State** is data **owned** by a component (`useState`, `useReducer`). Updating state schedules a re-render for that subtree.

**Derived state** is anything you can **compute during render** from props and/or state (a filtered list, a formatted string, a boolean flag). Prefer **variables** or **`useMemo`** (when expensive)—not a second piece of state kept in sync with `useEffect`.

## Rules of thumb

- If it can be computed from props + state **without** storing a past version for comparison, **derive it** in the render body (or memoize the derivation).
- If the parent must **own** the value (single source of truth), pass **`value` + `onChange`**—that is still “state,” but it lives in the parent; the child is **controlled**.
- If you need **local editable state seeded from a prop** when the prop identity changes (e.g. switching users), use **`key={propId}`** on the child to reset state, or a small reset pattern—avoid mirroring props into state with an effect **only** to copy the prop into state (redundant with rendering the prop).

## Examples

See **`StatePropsDerivedStateExamples.tsx`** on the study page: props-only child, local state, derived values, controlled inputs, and prop-to-state mirroring vs `key`.

## Related topics

- [State collocation](../state-collocation/README.md) — where to put state in the tree.
- [useMemo (avoid unnecessary work)](../use-memo-avoid-rerenders/README.md) — when derived values are costly to compute.
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) — official guidance on avoiding effect-driven “derived” updates.

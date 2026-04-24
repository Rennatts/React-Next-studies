# State collocation

**State collocation** means keeping state in the **lowest component in the tree** that still has everything it needs to own that state. If only one row cares whether it is expanded, that toggle usually belongs **inside the row**, not in a distant ancestor.

## Why it matters

When state updates, React re-renders the component that owns the state and, by default, **descends into its children** with new props. If you lift state too high:

- Unrelated siblings re-render on every update.
- You pay for wider subtree work and can trigger extra effects or child logic unless you add memoization.

Collocating state limits the blast radius: **only the subtree that actually depends on that state** re-renders.

## When to lift state anyway

Lift state **up** when multiple branches need the same value, when a parent must coordinate children, or when you are lifting for a deliberate API (controlled components, shared filters, URL sync, etc.). The goal is not “never lift”; it is **avoid lifting before you have a real shared need**.

## Relation to `React.memo` and hooks

- **Collocation** reduces how often ancestors update; it is often the first and clearest performance win.
- **`React.memo` / `useMemo` / `useCallback`** help when you already need shared state higher up or stable identities. They complement collocation; they do not replace thinking about where state should live.

## Demo

Open `/studies/advanced-concepts/state-collocation` and toggle rows in each mode. Watch the **list shell**, **sibling strip**, and **per-row render** counters.

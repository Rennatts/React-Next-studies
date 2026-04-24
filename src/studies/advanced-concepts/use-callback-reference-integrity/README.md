# `useCallback` for referential integrity (stable function identities)

`useCallback` returns a **memoized function** whose identity stays stable across renders **as long as its dependencies don’t change**.

## Idea in one sentence

- Use `useCallback` when a child (or hook dependency list) cares about **function identity**, not just behavior.

## Why referential integrity matters in React

In JavaScript, two functions that do the same thing are still **different objects**:

```ts
const a = () => 1;
const b = () => 1;
a === b; // false
```

React uses identity in a few important places:

- **`React.memo` children**: a new function prop identity can force a re-render even if “nothing meaningful changed”
- **`useEffect` / `useMemo` dependencies**: a new function identity can retrigger effects/memos
- **Libraries** that compare props by reference (less common, but it happens)

## When `useCallback` helps

Good cases:

- Passing callbacks to **`React.memo`** components
- Passing stable handlers into **custom hooks** that list the function in a dependency array
- Preventing expensive child trees from re-rendering due to recreated callbacks

## When `useCallback` does not help

Avoid using it as a default “performance sprinkle”:

- If the child isn’t memoized and isn’t expensive, `useCallback` adds complexity for little gain
- If dependencies change every render anyway, you don’t get stability

## Relationship to `useMemo`

- `useCallback(fn, deps)` ≈ `useMemo(() => fn, deps)`

Pick whichever reads clearer in context.

## Example in this folder

| File | Role |
|------|------|
| `UseCallbackReferenceDemo.tsx` | Compares inline handlers vs `useCallback` with `React.memo`. |

## Try it

Run the app and open `/studies/advanced-concepts/use-callback-reference-integrity`.

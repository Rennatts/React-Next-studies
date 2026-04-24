# Avoiding unnecessary work with `useMemo` (and when it affects renders)

`useMemo` memoizes a **computed value** between renders. It is **not** the same thing as preventing a component from rendering.

## Idea in one sentence

- **`useMemo`**: “don’t recompute this expensive value unless dependencies change.”

## What `useMemo` does *not* do

- It does **not** stop your component function from running when parent state changes.
- It does **not** replace `React.memo` for skipping child renders.

## When `useMemo` helps

Use it when you have:

- expensive pure calculations (filtering/sorting huge lists)
- object/array identities that you pass as props and want stable (`React.memo` children)

## When `useMemo` is usually unnecessary

Avoid wrapping everything “just in case”:

- tiny computations
- values that change every render anyway (deps always change)

Prefer measuring first (React DevTools Profiler).

## Relationship to `React.memo`

Common combo:

- Parent uses `useMemo` to keep props stable
- Child uses `React.memo` to skip re-renders when props are shallow-equal

## Example in this folder

| File | Role |
|------|------|
| `UseMemoAvoidRerendersDemo.tsx` | Shows expensive derived list with/without `useMemo` + a memoized child. |

## Try it

Run the app and open `/studies/advanced-concepts/use-memo-avoid-rerenders`.

# `useCallback` as ref (callback refs)

In React, `ref` can be either:

- An object ref: `const ref = useRef<T>(null)` used as `ref={ref}`
- A callback ref: `ref={(node) => { ... }}` where React calls your function with the DOM node (and later `null` on unmount)

When people say “useCallback as ref”, they usually mean:

- **Memoize a callback ref** with `useCallback` so its identity stays stable across renders.

## Idea in one sentence

- **Callback ref**: React calls your function with the element instance so you can capture it and run setup/teardown.

## Why callback refs are useful

- You can run logic immediately when the node appears (focus, measure, subscribe)
- You can clean up when the node disappears (React calls with `null`)
- You avoid a separate `useEffect` that depends on `ref.current` (which doesn’t trigger renders)

## Why memoize with `useCallback`

If you inline a new function each render:

- React treats it as a different ref callback
- It may call the previous ref with `null` and the new one with the node again

Using `useCallback` gives the ref callback a stable identity so it only runs when the node actually mounts/unmounts.

## Example in this folder

We capture an input node via a memoized callback ref, auto-focus it when shown, and display its width.

| File | Role |
|------|------|
| `UseCallbackRefDemo.tsx` | Toggle an input; callback ref handles focus and measurement. |

## Try it

Run the app and open `/studies/advanced-concepts/use-callback-ref`.


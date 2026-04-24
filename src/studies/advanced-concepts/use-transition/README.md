# `useTransition`

`useTransition` lets you mark state updates as **non-urgent**. React can keep urgent updates (like typing/click feedback) responsive while the transition work finishes.

## Idea in one sentence

- Use `startTransition` for expensive UI updates so React can render them without blocking urgent interactions.

## What you get from the hook

```tsx
const [isPending, startTransition] = useTransition();
```

- `isPending`: `true` while the transition work is in progress
- `startTransition(fn)`: run state updates inside `fn` as a transition

## When it helps

- Switching tabs/views that render expensive content
- Applying filters/sorts over large lists
- Updating derived UI where “event responsiveness” matters more than immediate completion

## `useTransition` vs `useDeferredValue`

- `useTransition`: you choose which state update is “non-urgent”
- `useDeferredValue`: React defers a derived value automatically

They can be used together, but often one is enough.

## Example in this folder

We update an expensive filtered list in a transition. The input updates immediately; the list update is deferred and shows an “Updating…” indicator while pending.

| File | Role |
|------|------|
| `UseTransitionDemo.tsx` | Interactive demo using `startTransition` + `isPending`. |

## Try it

Run the app and open `/studies/advanced-concepts/use-transition`.


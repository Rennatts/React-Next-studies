# Higher-Order Components (HOC)

A **Higher-Order Component** is a function that takes a component and returns a new component.

## Idea in one sentence

- **HOC**: `withX(Component) -> EnhancedComponent` (adds behavior, data, or props without modifying the original component).

## Why HOCs exist

HOCs were popular before hooks (and still appear in many libraries) as a way to:

- Reuse cross-cutting behavior (analytics, feature flags, permissions)
- Inject props (data, callbacks, derived values)
- Wrap UI with “chrome” (error boundaries, layout shells)

## Minimal shape

```tsx
function withX<P>(Component: React.ComponentType<P>) {
  return function WithX(props: P) {
    return <Component {...props} />;
  };
}
```

## Example in this folder

We’ll build a small HOC that injects a `userId` prop:

- `withUserId.tsx`: returns a component that passes a generated `userId` to the wrapped component.
- `ProfileCardView.tsx`: a presentational component that **requires** `userId`.
- `HocDemo.tsx`: toggles between the base view and the enhanced version.

## When to use HOCs today

- You’re integrating with a library that exposes an HOC API.
- You want to reuse logic **without hooks** (e.g. you’re wrapping class components).
- You want a consistent “enhancement pipeline” (compose multiple HOCs).

## Caveats (important)

- **Wrapper hell**: multiple HOCs can make React DevTools trees harder to read.
- **Props collisions**: if the HOC injects a prop, be clear whether callers can override it.
- **Typing**: in TypeScript, prefer HOCs that remove injected props from the public API.

## Alternatives

- **Custom hooks** for logic reuse (most common in modern React).
- **Composition** (children / slots) for UI reuse.
- **Render props** in some cases (older pattern, still useful).

## Try it

Run the app and open `/studies/design-patterns/hoc`.


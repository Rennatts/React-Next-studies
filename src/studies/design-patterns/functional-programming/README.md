# Functional programming in React

React’s programming model fits naturally with **functional programming (FP)** ideas:

- UI is a function of state: `UI = f(state)`
- Prefer **pure computation** and **immutable updates**
- Compose behavior from small functions

This topic focuses on practical FP principles you can apply while building React components.

## Key FP ideas (React-friendly)

### 1) Pure functions

A pure function:

- Returns the same output for the same input
- Has no side effects (doesn’t mutate external state, doesn’t do I/O)

In React, pure functions are great for:

- Reducers (`useReducer`)
- Derived calculations (`useMemo`, selectors)
- Helpers used during rendering

### 2) Immutability

React state should be treated as immutable:

- Don’t mutate arrays/objects in place
- Create new values using `map`, `filter`, `slice`, object spread, etc.

Why it matters:

- React can safely compare references to detect changes
- Your updates become predictable and easier to debug

### 3) Composition

Prefer composing small functions instead of building one giant “do-everything” handler:

- `filter` + `map` + `reduce` pipelines
- Reusable helpers (`formatName`, `isValidEmail`)
- Custom hooks as “logic composition”

### 4) Keep effects at the edges

Rendering should stay **pure**: given props/state, return UI.

Side effects (network calls, subscriptions, timers) belong in:

- `useEffect` (client)
- Server Components / server actions (server)
- Event handlers (imperative boundary)

## Example in this folder

We’ll use `useReducer` to manage a small list. The reducer is a **pure function**, and all updates are **immutable**.

| File | Role |
|------|------|
| `reducer.ts` | Pure reducer + action types. |
| `FunctionalProgrammingDemo.tsx` | UI that dispatches actions; derived data via `useMemo`. |

## Common pitfalls

- Mutating state: `arr.push(...)`, `obj.x = ...` inside updates
- Putting side effects in reducers (reducers must be pure)
- Overusing `useMemo`/`useCallback` when the bottleneck isn’t computation

## Try it

Run the app and open `/studies/design-patterns/functional-programming`.


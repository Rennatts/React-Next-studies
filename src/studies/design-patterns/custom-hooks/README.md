# Custom hooks

A **custom hook** is a JavaScript function whose name starts with `use` and that may call other hooks. It lets you **extract and reuse stateful logic** across components without changing your component tree.

## Idea in one sentence

- **Custom hook**: `useThing()` composes React hooks (`useState`, `useEffect`, …) and returns values or callbacks your UI can use.

## Why custom hooks exist

Before hooks, people reused logic with HOCs or render props. Custom hooks are usually **simpler to read and type**, and they avoid extra wrapper components.

Good uses:

- **Shared stateful behavior** (form field logic, pagination, toggles)
- **Subscriptions and side effects** (window size, media queries, WebSocket setup)
- **Data fetching patterns** (often paired with libraries like TanStack Query)

## Rules (same as built-in hooks)

Custom hooks must follow the [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks):

- Only call hooks at the **top level** of the hook or component (not inside loops, conditions, or nested functions unless that nested function is itself another hook).
- Only call hooks from **React functions** (components or custom hooks).

If you break these rules, React cannot match hook calls to state between renders.

## Naming and API shape

- **Name** with the `use` prefix (`useCounter`, `useMediaQuery`) so linters and humans recognize hook semantics.
- **Return value**: either a **small object** (named fields, easy to extend) or a **tuple** (`[value, setValue]`). Objects scale better when you add fields later.

## Example in this folder

| File | Role |
|------|------|
| `useCounter.ts` | Custom hook: count + increment / decrement / reset. |
| `CustomHooksDemo.tsx` | Client UI that consumes `useCounter` twice (independent state per call). |

Calling `useCounter()` in two different components (or twice in one component) gives **two separate pieces of state**—that is how hooks compose.

## When *not* to extract a hook

- The logic is **only used once** and stays tiny; inlining keeps navigation easier.
- You would only move **pure calculations** with no hooks—then a plain function is enough.

## Next.js (App Router)

Hooks run in the **browser** (or during client render). In the App Router, any file that uses hooks in the default export or at module top level for a **page** must be a **Client Component** (`"use client"`). The hook implementation can live in a separate module and be imported by that client component.

## Try it

Run the app and open `/studies/design-patterns/custom-hooks`.

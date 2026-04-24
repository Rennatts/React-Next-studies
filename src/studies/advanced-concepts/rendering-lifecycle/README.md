# Rendering lifecycle: render phase vs commit phase

React updates UI in **two broad stages** people talk about as **render** and **commit**. The names map loosely to **“decide what the tree should be”** vs **“apply that tree to the host environment (DOM, native, etc.) and run effects.”** Exact internals depend on the React version and concurrent features, but the **mental model** below is what you need for debugging `useEffect`, `useLayoutEffect`, and layout bugs.

## Render phase (reconciliation)

During **render**, React calls your **function components** (or class `render`) to **produce React elements**—a description of the UI. In this phase:

- **Keep components pure** — no subscriptions, no timers, no direct DOM reads/writes that assume the *previous* commit’s DOM is still the source of truth for *this* render’s decisions.
- **Render may run more than once** — **Strict Mode** in development intentionally **double-invokes** some render paths to surface side effects; production behavior differs. Do not rely on “render runs exactly once per update.”
- **State updates scheduled during render** (in rare patterns) can trigger another render before commit—usually you schedule updates from **effects** or **event handlers** instead.

Render answers: **“What should the UI be for this state/props?”**

## Commit phase

During **commit**, React **mutates the host tree** (e.g. creates/updates/deletes DOM nodes) to match the output of render, then runs **effects** in a defined order:

1. **`useLayoutEffect`** cleanup (from previous commit) for deleted/changed deps  
2. **`useLayoutEffect`** setup — **synchronously** after DOM mutations, **before the browser paints** the frame (same tick). Good for measuring layout or applying DOM tweaks the user should not see “flash.”
3. **`useEffect`** cleanup (previous)  
4. **`useEffect`** setup — **after paint** (async relative to commit; often next macrotask). Good for subscriptions, logging, or work that must not block paint.

Commit answers: **“Apply changes”** and **“run post-commit work.”**

## “Render” vs “paint”

- **Commit** includes DOM updates; **paint** is the browser’s step afterward.  
- **`useLayoutEffect`** runs **after DOM commit, before paint**.  
- **`useEffect`** runs **after paint** (conceptually; see React docs for precise scheduling).

## Why this matters

- **Flicker** — If you measure in `useEffect` and then set state to reposition, users may see one frame wrong. **`useLayoutEffect`** (or CSS-only layout) avoids that when you must read/write layout before paint.
- **Performance** — Heavy work in `useLayoutEffect` **blocks paint**; prefer **`useEffect`** or **defer** (`startTransition`, `requestIdleCallback`, etc.) when layout read is not required before paint.
- **Concurrent rendering** — React may **discard** render work before commit if something higher-priority interrupts. Side effects belong in **effects** or **event handlers**, not in render bodies.

## Related topics in this repo

- [useLayoutEffect](../use-layout-effect/README.md) — runs in the **layout** effect slice of commit.
- [useDeferredValue](../use-deferred-value/README.md) and [useTransition](../use-transition/README.md) — how concurrent features change **when** renders land.

## Further reading

- [React docs — render and commit](https://react.dev/learn/render-and-commit)  
- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)  
- [useLayoutEffect](https://react.dev/reference/react/useLayoutEffect)

## Example code

See [`RenderingLifecycleDemo.tsx`](./RenderingLifecycleDemo.tsx) (shown on the study page): remount a child with a **`key`** and watch **`useLayoutEffect`** run before **`useEffect`** relative to paint.

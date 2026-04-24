# Avoiding unnecessary re-renders

A **re-render** means React calls your function component again and reconciles the result. Most are **cheap**; optimize when profiling shows **hot paths** (large lists, heavy charts, frequent updates).

## What triggers a re-render (simplified)

- **State** changes in the component (or a hook it uses).
- **Context** value changes for a context the component reads.
- **Parent re-rendered** and the component is not skipped by **`React.memo`**, **`useMemo` for children** (unusual), or similar.

Server Components do not re-render like client components; this topic is about **Client Components** and client subtrees.

## Practical levers (in order of thinking)

1. **Measure** — React DevTools **Profiler** before adding `memo` everywhere.
2. **Colocate state** — keep updating state as **low** in the tree as possible so fewer ancestors run. See [State collocation](../state-collocation/README.md).
3. **`React.memo`** — skip re-renders when **props are shallow-equal** to the last render. Use on **pure** leaves that receive stable props.
4. **Stable prop identities** — `memo` is useless if you pass **new object/array/function** literals every parent render. Fix with **`useMemo` / `useCallback`**, constants moved **outside** the component, or **fewer props** (pass primitives).
5. **Expensive work inside render** — use **`useMemo`** so you do not redo heavy pure work; that is separate from skipping the component (see [useMemo study](../use-memo-avoid-rerenders/README.md)).
6. **Callbacks passed down** — if a **`memo`** child receives a function prop, parent often needs **`useCallback`** so the reference is stable when appropriate. See [useCallback (referential integrity)](../use-callback-reference-integrity/README.md).
7. **Context** — one giant context forces many consumers to re-render on any field change; **split contexts** or pass **derived stores** (e.g. selector libraries) when it hurts.

## Anti-patterns

- Wrapping every component in **`memo`** (noise, harder refactors) without unstable props or profiler evidence.
- **`useCallback` / `useMemo` “by default”** — they have a cost too; use when dependencies are stable and children care.
- Putting fast-updating state **above** a large subtree that does not need it.

## Example in this folder

| File | Role |
|------|------|
| `AvoidUnnecessaryRerendersDemo.tsx` | `React.memo` + primitive vs **fresh object** props; optional stable `useMemo` object. |

## Related in this repo

- [useMemo (expensive work + stable props)](../use-memo-avoid-rerenders/README.md)  
- [Rendering lifecycle (render vs commit)](../rendering-lifecycle/README.md)  
- [State collocation](../state-collocation/README.md)  
- [useCallback (referential integrity)](../use-callback-reference-integrity/README.md)  

## Try it

Open `/studies/advanced-concepts/avoid-unnecessary-rerenders`.

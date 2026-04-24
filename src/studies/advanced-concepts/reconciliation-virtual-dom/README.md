# Reconciliation and the virtual DOM

React keeps a **tree of UI descriptions** (traditionally called the **virtual DOM**): lightweight **React elements**—plain objects with `type`, `props`, and `key`—not heavy DOM nodes. On each update, React **reconciles** the new element tree with the previous one and computes the **smallest set of changes** to apply to the real DOM (or other hosts).

## Virtual DOM (element tree)

- **JSX** compiles to **`React.createElement(type, props, ...children)`** (or equivalent). Each call returns an **element**: a serializable description of “what to render.”
- The **real DOM** is updated only after reconciliation, during **commit** (see [rendering lifecycle](../rendering-lifecycle/README.md)).

## Reconciliation (diffing) at a high level

- React compares the **new** and **previous** element trees **by position** in the tree (and by **fiber** links internally).
- **Same `type` at the same place** → React **updates** that instance (props/children), and **reuses** the underlying DOM node when possible.
- **Different `type`** → React **unmounts** the old subtree and **mounts** the new one.
- **`key` on lists** → tells React which **logical item** matches which **previous** item when order changes. Wrong or missing keys cause **incorrect reuse** (state and DOM drift).

## Examples in this folder

Runnable demos and the same patterns in comments live in **`ReconciliationVirtualDomExamples.tsx`**. Open the study page or read that file in the editor.

## Related topics

- [Rendering lifecycle (render vs commit)](../rendering-lifecycle/README.md) — when the element tree becomes DOM updates.
- [Keys](../keys/README.md) — how `key` steers list reconciliation.

## Further reading

- [React docs — Describing the UI](https://react.dev/learn/describing-the-ui)  
- [Reconciliation (legacy deep dive)](https://legacy.reactjs.org/docs/reconciliation.html) — still useful for **keys** and **O(n) heuristics** intuition.

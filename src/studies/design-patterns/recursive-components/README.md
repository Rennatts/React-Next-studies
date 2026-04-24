# Recursive components (tree rendering) with functional programming

A **recursive component** renders a node and then renders the same component for that node’s children. This is a natural fit for **tree-shaped data** (folders, menus, comments, org charts).

## Idea in one sentence

- **Recursive component**: `TreeNode` renders one node, then maps children to `<TreeNode />` again.

## Why it’s “functional-programming friendly”

The rendering logic is a pure transformation from data to UI:

- **Pure recursion**: `render(node) = UI(node) + render(children)`
- **Composition**: small components that call each other
- **Immutability**: tree updates are easiest to reason about when you return **new** trees instead of mutating nodes in place

## Common use cases

- File explorers (folders → files)
- Nested navigation menus
- Comment threads
- JSON viewers

## Example in this folder

We render a folder-like tree. Interactions update the tree **immutably** using pure functions.

| File | Role |
|------|------|
| `types.ts` | `TreeNode` type and sample data. |
| `treeOps.ts` | Pure functions for immutable tree updates (toggle, rename, add child). |
| `RecursiveTreeDemo.tsx` | Client UI that renders the tree recursively and calls pure ops. |

## Pitfalls to watch

- **Performance**: big trees can re-render a lot. Consider memoization (`React.memo`) or virtualization for huge datasets.
- **Keys**: children must have stable `key`s (use a real id).
- **Stack depth**: extremely deep trees can hit recursion limits (rare for UI trees).

## Try it

Run the app and open `/studies/design-patterns/recursive-components`.


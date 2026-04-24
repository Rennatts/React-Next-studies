# Preventing re-renders by lifting components up

This pattern is sometimes called **moving components up** or **splitting by state boundary**: you keep **stateless layout** (headers, sidebars, slow lists that do not depend on the changing value) in a **parent** component, and move **state + the UI that truly depends on it** into a **child**.

## What changes in the tree

**Before:** one component returns both the expensive static region and the interactive subtree. Any `setState` in that component re-runs the whole function, so the static region’s render function runs again too.

**After:** a thin **shell** component with **no state** renders the static region and renders `{children}`. A **child** component owns the state. When the child updates, React re-renders the child (and its descendants); the **shell does not re-render**, so the static region is skipped.

This is composition: the page (or route segment) passes the stateful piece as `children` into the shell.

## Relationship to other ideas

- **State collocation** — keep state as low as the data model allows; this topic is about **where the stateless chrome sits** relative to that state.
- **`React.memo`** — still useful when you cannot split the tree further; lifting is often simpler when it matches your layout.
- **Server vs client** — in the App Router, default Server Components already avoid client re-renders; this pattern still matters inside `"use client"` boundaries.

## Demo

Open `/studies/advanced-concepts/lift-components-up` and click the counter in each mode. Compare **banner renders** and **shell renders** in the lifted layout.

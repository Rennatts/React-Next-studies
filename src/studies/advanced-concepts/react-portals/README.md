# React portals

A **portal** lets you render a piece of React UI into a **different place in the DOM** than where the component appears in the React tree.

Typical use cases:

- Modals / dialogs
- Tooltips / popovers
- Toasts / notifications

## Idea in one sentence

- **Portal**: render children into `document.body` (or a dedicated root) using `createPortal`.

## Why portals exist

Some UI needs to “escape” stacking contexts and overflow rules:

- A modal inside a `overflow: hidden` container should still overlay the whole page.
- Tooltips should render above other content even if their parent is clipped.

Portals keep your React composition clean (still in the same component tree) while placing the DOM nodes elsewhere.

## Important: portals don’t break React event bubbling

Even though the DOM nodes are elsewhere, React events still bubble through the **React tree**.

## Example in this folder

We render a small modal dialog via a portal:

| File | Role |
|------|------|
| `PortalModal.tsx` | A portal-backed modal with overlay + ESC close. |
| `ReactPortalsDemo.tsx` | Opens the modal and shows why portals help with layering. |

## Next.js note

Portals require `document`, so they must run in a **Client Component** (`"use client"`).

## Try it

Run the app and open `/studies/advanced-concepts/react-portals`.


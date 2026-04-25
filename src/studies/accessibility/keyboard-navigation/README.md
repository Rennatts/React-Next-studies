# Keyboard navigation

Keyboard navigation is a core accessibility requirement: users should be able to **reach**, **operate**, and **escape** UI using only the keyboard.

In practice, this usually means:

- **Tab / Shift+Tab** moves focus through interactive controls
- **Enter / Space** activates the focused control (depending on widget)
- **Arrow keys** navigate within composite widgets (menus, tabs, listboxes)
- **Escape** closes transient UI (dialogs, popovers)

## Start with semantic HTML (it gives you keyboard for free)

- Use `<button>` for actions (Space/Enter work automatically)
- Use `<a href>` for navigation (Enter works)
- Use `<label htmlFor>` + `<input>` for form controls (focus/activation built in)

If you build “custom controls” out of `<div>`/`<span>`, you must recreate keyboard interaction and focus behavior yourself.

## Tab order: how to avoid surprises

Rules of thumb:

- Keep DOM order aligned with visual order.
- Avoid positive `tabIndex` (like `tabIndex={5}`) — it creates confusing focus jumps.
- Use `tabIndex={0}` to make a non-interactive element focusable only when truly needed.

## Focus visibility (don’t remove outlines)

Users must be able to see where focus is. If you customize focus styles, ensure the result is clearly visible on both light/dark backgrounds.

## When UI opens/closes: manage focus

When you open a dialog/popup:

- move focus into it (typically the first interactive element)
- keep focus inside while it’s open (focus trap)
- close on Escape
- restore focus to the trigger when it closes

When you show inline validation errors:

- keep focus on the field, and expose error text via `aria-describedby`

## The “roving tabindex” pattern (for arrow-key navigation)

For widgets like tablists or menus:

- one item has `tabIndex={0}` (focusable)
- the rest have `tabIndex={-1}`
- arrow keys move the active index and update tabindex values

This prevents Tab from getting “stuck” on every item in a long list while still enabling arrow navigation inside.

## A small demo in this repo

This folder includes a demo component:

- `KeyboardNavigationDemo.tsx`

It shows:

- focus restoration (open/close a modal-ish panel)
- a basic roving tabindex list that supports ArrowUp/ArrowDown + Home/End

## Related in this repo

- [ARIA roles](../aria-roles/README.md) — roles + names + states you’ll often pair with keyboard behavior.  
- [Reusable components vs domain components](../../project-architecture/reusable-vs-domain-components/README.md) — shared components are where keyboard support should live.  

## Try it

Open `/studies/accessibility/keyboard-navigation`.


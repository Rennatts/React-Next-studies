# `useDeferredValue`

`useDeferredValue` lets you **defer** updating a value so React can keep urgent updates (like typing) responsive.

## Idea in one sentence

- Use `useDeferredValue` to keep input/UI responsive while slower, derived UI updates lag slightly behind.

## When it helps

Good cases:

- Filtering/sorting large lists while typing
- Rendering expensive previews (markdown, charts) from user input
- Any “typeahead” UI where you want to avoid keystroke jank

## Mental model

- **Immediate value**: updates right away (urgent)
- **Deferred value**: updates “soon” (non-urgent)

Your UI can render cheap parts from the immediate value and expensive parts from the deferred value.

## Example in this folder

We filter a large list of items. The input uses the immediate value, while the expensive filtered list uses the deferred one.

| File | Role |
|------|------|
| `UseDeferredValueDemo.tsx` | Interactive demo showing immediate vs deferred query. |

## Try it

Run the app and open `/studies/advanced-concepts/use-deferred-value`.


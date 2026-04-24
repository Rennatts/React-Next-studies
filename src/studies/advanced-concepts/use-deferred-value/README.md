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

## Examples in this folder

| File | Role |
|------|------|
| `UseDeferredValueExamples.tsx` | Snippets + patterns: same-component defer, deferring a **prop** in a child, `isStale`. |
| `UseDeferredValueDemo.tsx` | Larger list (~4k rows): immediate `query` in the input, deferred value driving the filter. |

## Try it

Run the app and open `/studies/advanced-concepts/use-deferred-value`.


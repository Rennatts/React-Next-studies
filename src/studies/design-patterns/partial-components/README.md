# Partial components (partial application of props)

A **partial component** is a specialized component created from a more generic one by **pre-filling some props**.

In functional programming terms, it’s **partial application**:

- Given a function \(f(props)\), create a new function \(g(props)\) where some inputs are fixed.

In React:

- Start with a reusable base component (e.g. `Button`)
- Create “preset” components that lock in certain props (e.g. `PrimaryButton`, `DangerButton`)

## Idea in one sentence

- **Partial component**: `const Primary = partial(Button, { variant: "primary" })`

## Why it’s useful

- Keeps UI consistent (variants are centralized)
- Reduces repetition (no more `variant="primary"` everywhere)
- Makes intent obvious at call sites (`<DangerButton />` reads better than `<Button tone="danger" />`)

## Trade-offs

- Too many presets can bloat your API surface
- If presets diverge, you may end up re-implementing logic instead of reusing it

## Example in this folder

We build a small `Button` and a `partial` helper to create preset components.

| File | Role |
|------|------|
| `Button.tsx` | Base button that supports variants and sizes. |
| `partial.tsx` | Helper to prefill props (TypeScript hides the prefilled keys). |
| `PartialComponentsDemo.tsx` | Uses `PrimaryButton`, `DangerButton`, etc. |

## Try it

Run the app and open `/studies/design-patterns/partial-components`.


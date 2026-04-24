# Composition vs inheritance (React)

React models UI as **trees of components**. The team’s long-standing guidance is **prefer composition**—assemble behavior with **`children`**, **slot props**, **wrappers**, **hooks**, and **context**—instead of building deep **class hierarchies** to specialize how components render.

## Composition (typical in React)

- **`children`**: the parent decides what goes inside a shell (`<Card>…</Card>`).
- **Slot props**: `header`, `footer`, `actions` as `ReactNode` for fixed layout positions.
- **Wrappers**: one component renders another’s output inside extra markup or providers.
- **Hooks**: share stateful logic without `extends`; each component calls the same hook.
- **Context**: share cross-cutting data without threading props through every layer.

## Inheritance

- **`extends React.Component`**: still valid, but **subclassing another team component** to override `render` is rare and awkward compared to passing different children or props.
- **TypeScript `extends` on types / interfaces**: fine for **typing**; not the same as UI inheritance.
- **Non-React classes** (domain models, parsers): inheritance can be appropriate there; this doc is about **structuring React UI and reusable behavior**.

## Examples

Runnable demos live in **`CompositionVsInheritanceExamples.tsx`** on the study page.

## Related topics

- [Component composition](../../design-patterns/composition-components/README.md) — `children`, slots, render props in depth.
- [Compound components](../../design-patterns/compound-components/README.md) — related composition pattern.

## Further reading

- [React docs — Passing JSX as `children`](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)  
- [Legacy note — Composition vs Inheritance](https://legacy.reactjs.org/docs/composition-vs-inheritance.html) (still a clear mental model)

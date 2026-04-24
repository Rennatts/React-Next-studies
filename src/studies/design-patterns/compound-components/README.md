# Compound components

**Compound components** are a composition pattern where a parent component provides shared state and behavior, and child components “plug in” to that state.

Typical API:

```tsx
<Tabs defaultValue="a">
  <Tabs.List>
    <Tabs.Trigger value="a">A</Tabs.Trigger>
    <Tabs.Trigger value="b">B</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Panel value="a">...</Tabs.Panel>
  <Tabs.Panel value="b">...</Tabs.Panel>
</Tabs>
```

## Idea in one sentence

- **Compound components**: parent owns wiring (often via context), children declare structure.

## Why it’s useful

- Flexible layout: callers decide ordering and nesting of parts
- Clear domain language: `Tabs.Trigger`, `Accordion.Item`, etc.
- Avoids threading many props through multiple layers

## How it works (most common implementation)

- Parent creates a **context** with current state + actions
- Subcomponents read that context with `useContext`
- Optional: enforce usage by throwing if a subcomponent is used outside the parent

## Example in this folder

We implement an `Accordion` as compound components:

- `Accordion` (state + context provider)
- `AccordionItem` (groups a trigger + panel)
- `AccordionTrigger` (selects an item)
- `AccordionPanel` (renders only when selected)

| File | Role |
|------|------|
| `Accordion.tsx` | Compound components implementation. |
| `CompoundComponentsDemo.tsx` | Renders multiple accordion items. |

## Caveats

- Context updates can re-render many children (usually fine; optimize if necessary)
- The API is flexible, but misuse can become hard to reason about—keep it small

## Try it

Run the app and open `/studies/design-patterns/compound-components`.


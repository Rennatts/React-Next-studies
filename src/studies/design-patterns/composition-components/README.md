# Component composition (composition over inheritance)

In React, “composition” means building UI by **combining components** (often via `children`), instead of trying to “inherit” behavior.

## Idea in one sentence

- **Composition**: make small building blocks and let parents assemble them with `children`, “slots”, or render props.

## Why it matters

- Keeps components **generic** and reusable
- Avoids deep prop drilling of “layout decisions”
- Scales better than inheritance (React doesn’t really use component inheritance patterns)

## Common composition techniques

### 1) `children` (the default “slot”)

```tsx
function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}
```

### 2) Named “slots” via props

```tsx
function Page({ header, footer }: { header: React.ReactNode; footer: React.ReactNode }) {
  return (
    <>
      <header>{header}</header>
      <main>...</main>
      <footer>{footer}</footer>
    </>
  );
}
```

### 3) Render props (function as child)

Useful when the parent owns state but delegates rendering.

```tsx
function Toggle({ children }: { children: (on: boolean) => React.ReactNode }) {
  const [on, setOn] = useState(false);
  return <>{children(on)}</>;
}
```

## Example in this folder

We implement a small `Card` that accepts:

- `children` for the body
- `header` and `footer` slots
- an optional `actions` slot (buttons)

| File | Role |
|------|------|
| `Card.tsx` | The composable UI building block. |
| `Tabs.tsx` | A “compound components” example: `Tabs`, `TabsTrigger`, `TabsPanel`. |
| `CompositionDemo.tsx` | Shows different ways to assemble the card. |

## Try it

Run the app and open `/studies/design-patterns/composition-components`.


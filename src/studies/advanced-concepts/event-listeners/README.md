# Event listeners in React (and cleanup)

Attaching DOM event listeners from React is common for:

- Keyboard shortcuts (`keydown`)
- Click-away detection
- Window resize / scroll
- Media query listeners

## Idea in one sentence

- Add listeners in an effect, and always **remove them in cleanup**.

## The correct shape

```tsx
useEffect(() => {
  const onKeyDown = (e: KeyboardEvent) => { ... };
  window.addEventListener("keydown", onKeyDown);
  return () => window.removeEventListener("keydown", onKeyDown);
}, []);
```

## Common pitfalls

### 1) Re-subscribing every render

If your handler is recreated each render and included in dependencies, the effect can:

- remove + add listeners frequently
- cause bugs if you forget cleanup

### 2) Stale closures

If your handler captures state from an old render, it might read outdated values.

Common fix patterns:

- Keep the handler stable and store latest values in a `ref`
- Or re-subscribe intentionally when dependencies change (still with proper cleanup)

### 3) Listeners outside the browser

In Next.js App Router, anything touching `window` / `document` must be in a **Client Component** (`"use client"`).

## Example in this folder

We implement a tiny “keyboard counter” and show two approaches:

- **Resubscribe approach**: effect depends on state
- **Ref approach**: stable listener reads latest state from a ref

| File | Role |
|------|------|
| `EventListenersDemo.tsx` | Live demo with key bindings and safe cleanup. |

## Try it

Run the app and open `/studies/advanced-concepts/event-listeners`.


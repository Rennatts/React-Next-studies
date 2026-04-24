# `startTransition`

`startTransition` marks updates inside its callback as **non-urgent** (transition priority). React can **interrupt** or **delay** that work so **urgent** updates—typing, clicks—stay responsive.

## `startTransition` vs `useTransition`

| API | What you use |
|-----|----------------|
| **`useTransition()`** | Returns `[isPending, startTransition]`. Use when you want **`isPending`** for loading UI. |
| **`startTransition` from `'react'`** | Same scheduling, **no `isPending`**. Use when you only need to wrap updates (e.g. in a library callback) or already track pending state elsewhere. |

```tsx
import { startTransition, useTransition } from "react";

const [isPending, startTransitionFromHook] = useTransition();

startTransition(() => setQuery(next)); // named import
startTransitionFromHook(() => setQuery(next)); // from hook — same effect
```

## When it helps

- Expensive list filter/sort, tab switches, route-like view changes.
- Batching several `setState` calls that should not block a high-priority update that just happened in the same event.

## Examples

See **`StartTransitionExamples.tsx`** on this study page. For a heavier list demo, the page also embeds **`UseTransitionDemo`** from the [useTransition](../use-transition/README.md) topic.

## Related

- [Concurrent rendering](../concurrent-rendering/README.md) — urgent vs non-urgent mental model.
- [useDeferredValue](../use-deferred-value/README.md) — defer a **value** instead of wrapping **setters**.

## Further reading

- [useTransition](https://react.dev/reference/react/useTransition)  
- [startTransition](https://react.dev/reference/react/startTransition)

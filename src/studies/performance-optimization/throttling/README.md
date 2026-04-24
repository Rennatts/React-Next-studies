# Throttling

**Throttling** limits how often a function runs: over a sliding or fixed time window, the handler runs **at most once per interval**, even if the underlying event fires hundreds of times per second.

It is a **rate-limiting** strategy for work tied to high-frequency sources: `scroll`, `resize`, `pointermove`, `touchmove`, `wheel`, game loops, or rapid user input where you only need periodic samples.

## Throttle vs debounce

| | **Throttle** | **Debounce** |
|---|--------------|--------------|
| **Goal** | Run on a steady cadence while events keep coming | Run **once** after events **pause** |
| **Typical use** | Keep UI in sync with scroll/resize; sample drag | Wait until user stops typing before a search request |
| **While events fire continuously** | Handler still runs periodically | Handler is postponed until the burst ends |

Use **throttle** when missing intermediate updates would feel wrong (e.g. a sticky header that should follow scroll). Use **debounce** when the **last** value after idle time is what matters (e.g. validating a form field, autosave draft). For debounce-focused notes and a demo, see [Debouncing](../debouncing/README.md).

## Leading vs trailing

- **Leading (first fire):** run immediately on the first event in a “cooldown,” then ignore events until the interval elapses. Feels responsive; you may skip the **latest** position in a burst until the next allowed call.
- **Trailing (last fire):** after the last event in a burst, run once more when the window settles (often combined with a max rate). Useful when the **final** state must be applied (e.g. scroll end snap).

Libraries often expose options for both edges. Pick based on whether **first** or **last** sample matters more for your UX.

## Minimal patterns in JavaScript

**Time-since-last-run (leading-style):** simple and predictable for demos.

```ts
function throttle<Args extends unknown[]>(
  fn: (...args: Args) => void,
  waitMs: number,
): (...args: Args) => void {
  let last = 0;
  return (...args: Args) => {
    const now = performance.now();
    if (now - last >= waitMs) {
      last = now;
      fn(...args);
    }
  };
}
```

**Fixed window (at most one call per `waitMs`):** the classic “first event in the window runs, then block until the window ends.”

```ts
function throttleLeading<Args extends unknown[]>(
  fn: (...args: Args) => void,
  waitMs: number,
): (...args: Args) => void {
  let inCooldown = false;
  return (...args: Args) => {
    if (inCooldown) return;
    inCooldown = true;
    fn(...args);
    setTimeout(() => {
      inCooldown = false;
    }, waitMs);
  };
}
```

Production code often adds **trailing** invocation with `setTimeout`/`clearTimeout`, cancellation on unmount, and `requestAnimationFrame` for layout reads (see below).

## React considerations

1. **Stable function identity** — If you pass a throttled handler to a memoized child or to a native listener you re-subscribe often, create the throttled function once (e.g. `useMemo` / `useRef` + lazy init) so you do not reset the throttle timer on every render.

2. **Effects and DOM listeners** — Attach in `useEffect`, throttle the listener, and **remove** the listener on cleanup. If the throttled callback reads props/state, either depend on those values intentionally (and accept a new throttle when they change) or read **refs** updated each render to avoid stale data without resubscribing.

3. **`requestAnimationFrame` for scroll/layout** — For visual updates tied to scroll or resize, scheduling one update per frame with `requestAnimationFrame` often replaces hand-rolled throttles and aligns with the browser’s paint cycle. Throttle is still right for **non-visual** side effects (analytics, network) that should not run every frame.

4. **Built-in and library options** — Underscore/Lodash `throttle`, dedicated utilities, or platform APIs (where available) are fine; understand **wait**, **leading**, and **trailing** semantics before picking defaults.

## Pitfalls

- **Dropped intermediate values** — Throttling means you intentionally skip calls; do not throttle logic that must observe every event (e.g. precise gesture recognition) unless you also buffer or use a different model.
- **Timers on unmount** — Trailing-edge throttles may schedule `setTimeout`; clear them when the component unmounts or when the handler is replaced.
- **Server Components** — Throttling applies to **client** interactions; keep throttled handlers in `"use client"` components or event handlers on the client.

## Demo

See `/studies/performance-optimization/throttling` for a small pointer-move example comparing **raw** event frequency to a **throttled** handler.

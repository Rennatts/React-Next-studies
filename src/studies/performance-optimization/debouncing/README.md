# Debouncing

**Debouncing** schedules a function to run **after** a stream of events has **quieted down** for a chosen duration. Each new event **resets** the timer, so the handler runs **once** (or rarely) with the **latest** arguments—typically after the user pauses typing, dragging a slider, or finishes resizing a window.

Use it when only the **final** value in a burst matters: search-as-you-type, form validation, autosave, layout calculations after resize end, or coalescing analytics beacons.

## Debounce vs throttle

| | **Debounce** | **Throttle** |
|---|----------------|--------------|
| **Goal** | Run **once** after a **pause** in events | Run on a **steady maximum rate** while events continue |
| **Typical use** | API search after typing stops | Scroll-driven UI, pointer sampling |
| **While events fire continuously** | Timer keeps resetting; handler waits | Handler still fires on a cadence |

For a longer comparison, see [Throttling](../throttling/README.md).

## Leading vs trailing (and “max wait”)

- **Trailing (default in most helpers):** run after the last event and the wait window has passed. Best match for “user stopped typing.”
- **Leading:** run immediately on the first event in a burst, then suppress until the burst ends and the wait elapses. Useful for instant feedback plus a single trailing commit—many libraries expose `leading` / `trailing` flags.
- **Max wait:** cap how long you wait in a single burst (e.g. lodash `debounce` `maxWait`). Without it, continuous input could defer the handler indefinitely.

## Minimal trailing debounce in TypeScript

```ts
function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  waitMs: number,
): (...args: Args) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return (...args: Args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      fn(...args);
    }, waitMs);
  };
}
```

For **cancellation** on unmount, keep the timer id in a **ref** (or return a `cancel()` from your helper) and `clearTimeout` in a `useEffect` cleanup or when replacing the debounced work.

## React patterns

1. **Controlled inputs** — Update local state on every `onChange` for responsive typing; call a debounced function with the latest value for expensive work (network, heavy derived data).

2. **Stable debounced callback** — Build the debounced function once per logical `waitMs` (e.g. `useMemo` with `[waitMs]`) so you do not reset the idle timer on unrelated renders. If the debounced body must see fresh props, use a **ref** updated each render for the latest closure, or re-create the debouncer when those dependencies change intentionally.

3. **Async / fetch** — Debounce triggers a fetch that may resolve out of order. **Abort** the previous request when a new one starts, or ignore stale responses with a generation counter or `AbortController`.

4. **Submit / blur** — If the user submits before the trailing timer fires, **flush** pending work (run the handler immediately and clear the timer) so you do not drop the last value.

5. **Accessibility** — Very long waits feel sluggish. Prefer a moderate `waitMs`, instant local UI, and optional “Search” for explicit commits.

## Pitfalls

- **Lost updates** if you never wait long enough in a continuous burst without `maxWait`.
- **Stale closures** if the debounced function closes over old state; prefer refs or stable deps.
- **Uncleared timers** on unmount causing `setState` on unmounted components—always clear in cleanup.

## Demo

Open `/studies/performance-optimization/debouncing` and type in the field: compare **input change events** to **debounced “commits”** after you pause.

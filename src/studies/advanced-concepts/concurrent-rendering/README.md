# Concurrent rendering

**Concurrent rendering** is React’s ability to **prepare several versions of the UI** and **choose what to commit** based on priority. Work can be **split**, **paused**, and **resumed** so urgent updates (typing, clicks) are not stuck behind large re-renders.

You do not opt into “a concurrent mode” flag in app code for most features—**React 18+** uses a concurrent **renderer** by default. What you *do* use are APIs that mark updates as **non-urgent** or **deferred** relative to user input.

## Urgent vs non-urgent updates

- **Urgent** — direct responses to input: controlled `value`, hover highlights, animations driven by the latest pointer position.
- **Non-urgent / transition** — recomputing a huge list, switching heavy tabs, anything that can **lag behind** the latest input without feeling broken.

## APIs you reach for

| API | Role |
|-----|------|
| **`useTransition` / `startTransition`** | You **choose** which `setState` runs at transition priority; read **`isPending`** for UI while the transition catches up. |
| **`useDeferredValue`** | Keep input “live” while a **derived** value (e.g. filter query) used for expensive work **lags** one step behind. |

## Relationship to render vs commit

The **render** phase can still be discarded or retried before **commit** when concurrent features are in play; avoid side effects in render. See [rendering lifecycle](../rendering-lifecycle/README.md).

## Examples

Runnable patterns live in **`ConcurrentRenderingExamples.tsx`**. For larger demos, see also:

- [useTransition](../use-transition/README.md)  
- [useDeferredValue](../use-deferred-value/README.md)

## Further reading

- [React Concurrent Features](https://react.dev/blog/2022/03/29/react-v18#what-is-concurrent-react)  
- [useTransition](https://react.dev/reference/react/useTransition)  
- [useDeferredValue](https://react.dev/reference/react/useDeferredValue)

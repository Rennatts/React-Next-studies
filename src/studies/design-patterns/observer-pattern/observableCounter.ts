export type Unsubscribe = () => void;

type Listener = () => void;

/**
 * Minimal "subject" implementing the Observer pattern.
 * - Observers subscribe with a listener
 * - Subject notifies all listeners on changes
 *
 * We shape it so React can consume it via `useSyncExternalStore`.
 */
function createObservableCounter(initial = 0) {
  let value = initial;
  const listeners = new Set<Listener>();

  const subscribe = (listener: Listener): Unsubscribe => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const notify = () => {
    listeners.forEach((l) => l());
  };

  const getSnapshot = () => value;

  const increment = () => {
    value += 1;
    notify();
  };

  const decrement = () => {
    value -= 1;
    notify();
  };

  const reset = () => {
    value = initial;
    notify();
  };

  return { subscribe, getSnapshot, increment, decrement, reset };
}

export const observableCounter = createObservableCounter(0);


# Observer pattern (pub/sub) in React

The **Observer pattern** lets one piece of code (a “subject”) notify many dependents (“observers”) when something changes.

In UI terms:

- **Subject**: a store / event emitter / observable value
- **Observers**: components (or other code) that subscribe and update when the subject changes

## Idea in one sentence

- **Observer**: `subscribe(listener) → unsubscribe`, and the subject calls listeners on updates.

## Why it’s useful in React

- Share state outside React component trees (e.g. global store, WebSocket events)
- Decouple producers and consumers (many observers, one subject)
- Provide a simple “evented” API

## React integration: `useSyncExternalStore`

If you expose a subscription API (observer), React’s recommended way to read it is:

- `useSyncExternalStore(subscribe, getSnapshot)`

This avoids subtle tearing issues and works with concurrent rendering.

## Example in this folder

We build a tiny observable counter store:

- `observableCounter.ts`: subject + `subscribe`, `getSnapshot`, `increment`, `decrement`
- `ObserverDemo.tsx`: two observer components reading the same store value

## Try it

Run the app and open `/studies/design-patterns/observer-pattern`.


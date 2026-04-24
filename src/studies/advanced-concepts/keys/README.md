# Keys in React

React uses **keys** to match elements in a list between renders. A good key makes updates predictable and prevents UI bugs.

## Idea in one sentence

- **Key**: a stable identity for a list item across renders.

## What keys do

When you render:

```tsx
items.map((item) => <Row key={item.id} item={item} />)
```

React uses `key` to decide which previous child corresponds to which next child.

That affects:

- Which DOM nodes are reused
- Which component instances keep their state
- Which items look “edited” when you reorder/remove/insert

## The most common bug: using the array index as key

Index keys break when the list order changes (insert at top, sort, filter), because identities shift:

- item that *was* index 2 becomes index 3 → React thinks it’s a different item
- UI state (like input text) can “jump” to the wrong row

Index keys are only safe when:

- The list is **static** (never reorders, inserts, removes), and
- Items are not stateful / interactive

## Good key sources

- Database id
- Stable slug
- Generated UUID stored with the item when it’s created (not regenerated on every render)

Avoid:

- `Math.random()` in render
- `Date.now()` in render
- Anything that changes between renders for the same logical item

## Example in this folder

This demo shows why index keys are dangerous using a reorderable list with inputs.

| File | Role |
|------|------|
| `KeysDemo.tsx` | Toggle between “bad” index keys and “good” id keys. |

## Try it

Run the app and open `/studies/advanced-concepts/keys`.


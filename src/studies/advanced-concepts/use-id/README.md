# `useId`

`useId` generates a **stable, unique-ish** id string that is consistent between **server render and client hydration**.

It’s designed for:

- Accessible labeling (`label` → `input` via `htmlFor`/`id`)
- ARIA relationships (`aria-describedby`, `aria-controls`, …)

## Idea in one sentence

- Use `useId` for DOM ids needed for accessibility, especially in SSR apps.

## Why not `Math.random()` or `Date.now()`?

In Next.js (SSR), using random ids during render can create **hydration mismatches** because:

- Server and client will generate different values

`useId` avoids that by coordinating ids across server/client rendering.

## Important notes

- `useId` is **not** meant as a database key or a stable identifier for persisted data.
- Don’t use `useId` for React list `key`s.

## Example in this folder

We build a small field component that wires up:

- `label` → `input`
- `help text` → `aria-describedby`

| File | Role |
|------|------|
| `UseIdDemo.tsx` | Shows a reusable field component powered by `useId`. |

## Try it

Run the app and open `/studies/advanced-concepts/use-id`.


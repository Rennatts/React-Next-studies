# `useLayoutEffect`

`useLayoutEffect` is like `useEffect`, but it runs **synchronously after React commits DOM updates** and **before the browser paints**.

## Idea in one sentence

- Use `useLayoutEffect` when you must **measure or mutate layout** before paint to avoid flicker.

## When to use it

Good cases:

- Measuring DOM size/position (`getBoundingClientRect`) and updating state that affects layout
- Applying imperative layout changes that must happen before paint (rare)

Prefer `useEffect` for everything else (data fetching, subscriptions, logging), because:

- `useLayoutEffect` can block painting and hurt performance if overused

## Next.js note

`useLayoutEffect` requires the browser (DOM), so it must be in a **Client Component** (`"use client"`).

## Example in this folder

We measure an element width and set the font size so the text “fits”. With `useEffect`, you can see a brief mismatch; with `useLayoutEffect`, the measurement and update happen before paint.

| File | Role |
|------|------|
| `UseLayoutEffectDemo.tsx` | Toggle between `useEffect` and `useLayoutEffect` for the same measurement logic. |

## Try it

Run the app and open `/studies/advanced-concepts/use-layout-effect`.


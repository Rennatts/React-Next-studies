# About this repository

This project is a **personal Next.js and React study workspace**. It is not a production application; it is a structured place to learn concepts with **runnable examples** and **topic-level documentation**.

## Goals

- Organize learning by **topic folders** under `src/studies/`.
- Keep **explanations next to code** (each topic has a `README.md` and supporting components).
- Use **Next.js App Router** for pages that demonstrate patterns, while remembering that **Next.js builds on React**—patterns like container components apply the same way to client components.

## Layout conventions

| Location | Purpose |
|----------|---------|
| `docs/ABOUT_THIS_PROJECT.md` | This file: what the repo is for and how to extend it. |
| `src/studies/<area>/<topic>/` | Notes (`README.md`) + example modules for that topic. |
| `src/app/studies/...` | Optional routes that **render** a topic’s examples in the browser. |

## How to add a new topic

1. Create `src/studies/<category>/<topic-slug>/`.
2. Add `README.md` with: what you are learning, why it matters, and how the files map to the idea.
3. Add small, focused `.tsx` / `.ts` examples.
4. If a live demo helps, add `src/app/studies/<category>/<topic-slug>/page.tsx` and link it from the home page (`src/app/page.tsx`).

## Conventions for assistants (Cursor / Copilot)

When helping in this repo:

- Prefer **editing or adding files inside the matching topic folder** instead of scattering examples in unrelated app code.
- **Update the topic `README.md`** when introducing new concepts or files so the folder stays self-contained.
- Keep the **root `README.md`** aligned with `docs/ABOUT_THIS_PROJECT.md` (short summary + pointer to docs).

## Node version

Next.js 14 expects **Node.js ≥ 18.17** (see `package.json` → `engines`). Upgrade with nvm, fnm, or your system package manager if `npm run build` complains about the Node version.

## Commands

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:3000`) and use the home page links to open study demos.

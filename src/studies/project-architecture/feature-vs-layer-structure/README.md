# Feature-based vs layer-based folder structure

This note documents two common ways to organize a React/Next codebase:

- **Layer-based**: group by technical role (components, hooks, services, utils…)
- **Feature-based**: group by product capability (billing, auth, settings…)

Neither is “always right”. The goal is to make the codebase **easy to navigate**, keep changes **localized**, and avoid “where does this file go?” debates.

## Layer-based structure

### Typical shape

```txt
src/
  components/
  hooks/
  lib/            # shared helpers (date, fetch wrapper, env parsing…)
  services/       # API clients, domain services
  styles/
  types/
  app/            # Next routes (App Router)
```

### Strengths

- Easy to find “all hooks” or “all components”.
- Works well early when the app is small and “features” are not clear yet.

### Weaknesses

- A single feature change often touches many folders (UI + hooks + services + types).
- Encourages “god folders” like `components/` that become unsearchable over time.
- Boundaries are fuzzy: is it a hook, a service, a util, or a helper?

## Feature-based structure

### Typical shape

```txt
src/
  features/
    billing/
      components/
      hooks/
      api.ts
      types.ts
      index.ts
    auth/
      components/
      api.ts
  shared/
    ui/
    lib/
    types/
  app/            # Next routes import from features/shared
```

### Strengths

- Changes tend to stay inside one feature folder (better “locality of change”).
- Makes ownership clearer (teams can own `features/billing/`).
- Helps avoid accidental cross-feature coupling (imports become obviously “cross-boundary”).

### Weaknesses

- Requires naming discipline (what counts as a feature vs shared?).
- Without guardrails, features can start importing each other in messy ways.
- Some teams over-split early and create too many small “features” before the domain is stable.

## A practical hybrid (recommended for most apps)

Most real projects land on a hybrid:

- **Feature folders** for product capabilities.
- A **small shared** area for true cross-cutting primitives.
- A rule of thumb: *if it changes because of one feature, keep it in that feature*.

One useful split:

- **`shared/ui/`**: truly generic UI primitives (Button, Input, Dialog)
- **`shared/lib/`**: generic helpers (formatting, fetch wrapper, env helpers)
- **`features/<name>/`**: anything that encodes domain rules or product language

## How this maps to Next.js App Router

In the App Router, route files live under `src/app/`. You can still keep most code feature-based by making route pages thin:

```txt
src/app/(app)/billing/page.tsx        # imports a feature screen
src/features/billing/BillingScreen.tsx
```

This keeps routing concerns (“URL + layout + metadata”) separate from feature UI and logic.

## Heuristics for deciding “shared” vs “feature”

- If it contains **domain language** (invoice, subscription, entitlement), it’s probably **feature**.
- If you’d reuse it in a different product with no renaming, it might be **shared**.
- If a change request is “billing needs X”, prefer changing `features/billing` rather than `shared/`.

## Related in this repo

- [File-based routing (App Router)](../../next-server/file-based-routing/README.md) — route groups like `(group)` for organization.  
- [State collocation](../../advanced-concepts/state-collocation/README.md) — keep state close to where it’s used; similar “locality” idea.  
- [Building an API layer](../../api/api-layer/README.md) — keep transport logic in one place regardless of folder strategy.


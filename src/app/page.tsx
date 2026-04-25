import Link from "next/link";

const topics = [
  {
    title: "Container components",
    description:
      "Split data/effects (container) from markup driven by props (presentational). Classic React pattern in Next.",
    href: "/studies/design-patterns/container-components",
    category: "Design patterns",
  },
  {
    title: "Controlled vs uncontrolled components",
    description:
      "React form inputs: controlled (state-driven) vs uncontrolled (DOM-driven) and when to pick each.",
    href: "/studies/design-patterns/controlled-uncontrolled-components",
    category: "Design patterns",
  },
  {
    title: "Higher-Order Components (HOC)",
    description:
      "Enhance components via functions: withX(Component) → EnhancedComponent, plus trade-offs and modern alternatives.",
    href: "/studies/design-patterns/hoc",
    category: "Design patterns",
  },
  {
    title: "Custom hooks",
    description:
      "Extract reusable stateful logic with use*-named functions; Rules of Hooks, API shape, and App Router notes.",
    href: "/studies/design-patterns/custom-hooks",
    category: "Design patterns",
  },
  {
    title: "Functional programming in React",
    description:
      "Pure functions, immutable updates, composition, and reducers—FP ideas that fit React’s mental model.",
    href: "/studies/design-patterns/functional-programming",
    category: "Design patterns",
  },
  {
    title: "Recursive components",
    description:
      "Render tree-shaped data via recursion; pair with pure functions and immutable updates for predictable state changes.",
    href: "/studies/design-patterns/recursive-components",
    category: "Design patterns",
  },
  {
    title: "Component composition",
    description:
      "Composition over inheritance: build flexible UI using children and slot-like props (header/actions/footer).",
    href: "/studies/design-patterns/composition-components",
    category: "Design patterns",
  },
  {
    title: "Partial components",
    description:
      "Create preset components by pre-filling props (partial application): PrimaryButton, DangerButton, etc.",
    href: "/studies/design-patterns/partial-components",
    category: "Design patterns",
  },
  {
    title: "Compound components",
    description:
      "Parent provides state via context; subcomponents (Trigger/Panel/etc) compose the UI structure.",
    href: "/studies/design-patterns/compound-components",
    category: "Design patterns",
  },
  {
    title: "Observer pattern",
    description:
      "Pub/sub subject-observer model; React subscription via useSyncExternalStore for external stores.",
    href: "/studies/design-patterns/observer-pattern",
    category: "Design patterns",
  },
  {
    title: "What is a design system?",
    description:
      "Foundations, tokens, components, patterns, and process—why a system is more than a Figma kit or component library.",
    href: "/studies/design-system",
    category: "Design system",
  },
  {
    title: "Why a design system matters",
    description:
      "User trust, shipping speed, brand and a11y at scale, lower cost of change—and what goes wrong without a shared system.",
    href: "/studies/design-system/importance",
    category: "Design system",
  },
  {
    title: "Design system — downsides and trade-offs",
    description:
      "Ownership cost, rigidity, adoption friction, upgrade tax, central bottlenecks, and when ROI is weak—plus mitigation.",
    href: "/studies/design-system/downsides",
    category: "Design system",
  },
  {
    title: "Design system — mistakes to avoid",
    description:
      "Anti-patterns: build-for-scale-first, workshops without a kit, no workflow or ADRs, perfectionism, Figma/code drift, skipping tokens, weak ownership, vanity metrics.",
    href: "/studies/design-system/mistakes-to-avoid",
    category: "Design system",
  },
  {
    title: "Design system — core principles",
    description:
      "Single source of truth, consistency, accessibility, composability, documentation as product, and living evolution.",
    href: "/studies/design-system/core-principles",
    category: "Design system",
  },
  {
    title: "Design system — key concepts",
    description:
      "Foundations, tokens, components vs patterns, documentation, theming, semver, accessibility shift-left, governance.",
    href: "/studies/design-system/key-concepts",
    category: "Design system",
  },
  {
    title: "Design system — reusability & encapsulated styles",
    description:
      "Reusable primitives and public APIs; CSS Modules, utilities, CSS-in-JS, Shadow DOM; tokens; avoiding global style leakage.",
    href: "/studies/design-system/reusability-and-styles",
    category: "Design system",
  },
  {
    title: "Design system — style composition",
    description:
      "Compose tokens, cascade layers, Tailwind recipes, and variant maps; slots vs leakage; invalid variant pairs and a11y.",
    href: "/studies/design-system/style-composition",
    category: "Design system",
  },
  {
    title: "Design system — spacing patterns",
    description:
      "Layers, split, columns, grid, inline, inline-bundle, pad, center, media-wrapper, cover (min-height shell, flex-1 main); semantic tokens; gap vs padding vs margin.",
    href: "/studies/design-system/spacing-patterns",
    category: "Design system",
  },
  {
    title: "Design system — audience",
    description:
      "Who the system serves: designers, engineers, content and a11y, PMs, QA, leadership, end users, and how docs should meet them.",
    href: "/studies/design-system/audience",
    category: "Design system",
  },
  {
    title: "Design system — design phase checklist",
    description:
      "Know if design is ready for handoff: a11y, interaction, context, completion, content, customization, resolution, DS consistency, performance.",
    href: "/studies/design-system/design-phase-checklist",
    category: "Design system",
  },
  {
    title: "Design system — development checklist",
    description:
      "Pre-merge/release gate: responsive layout, errors, client+server validation, browsers, a11y in code, perf, security, tests, i18n, observability.",
    href: "/studies/design-system/development-checklist",
    category: "Design system",
  },
  {
    title: "Design system — Button (real-life doc)",
    description:
      "Document a Button like production DS docs: overview, variants, sizes, states, a11y, API table, do/don’t, plus SystemButton demo.",
    href: "/studies/design-system/button-example",
    category: "Design system",
  },
  {
    title: "Design system — team structure",
    description:
      "Core platform roles, contributor guilds, centralized vs federated models, decision rights, and squad handoffs.",
    href: "/studies/design-system/team-structure",
    category: "Design system",
  },
  {
    title: "React portals",
    description:
      "Advanced concept: render modals/overlays into document.body using createPortal (without breaking React events).",
    href: "/studies/advanced-concepts/react-portals",
    category: "Advanced concepts",
  },
  {
    title: "Error boundaries",
    description:
      "Catch render-time errors in part of the tree and render a fallback UI instead of crashing the whole page.",
    href: "/studies/advanced-concepts/error-boundaries",
    category: "Advanced concepts",
  },
  {
    title: "Keys in React",
    description:
      "How React reconciles lists using keys; see why using array indices can cause state to jump after reordering.",
    href: "/studies/advanced-concepts/keys",
    category: "Advanced concepts",
  },
  {
    title: "Event listeners",
    description:
      "Add DOM listeners in effects with cleanup; avoid stale closures with ref patterns or intentional resubscription.",
    href: "/studies/advanced-concepts/event-listeners",
    category: "Advanced concepts",
  },
  {
    title: "useLayoutEffect",
    description:
      "Measure/mutate layout before paint to avoid flicker; compare useEffect vs useLayoutEffect for DOM measurements.",
    href: "/studies/advanced-concepts/use-layout-effect",
    category: "Advanced concepts",
  },
  {
    title: "Rendering lifecycle (render vs commit)",
    description:
      "Reconciliation vs DOM commit: when render runs, when useLayoutEffect vs useEffect fire, paint, and Strict Mode caveats.",
    href: "/studies/advanced-concepts/rendering-lifecycle",
    category: "Advanced concepts",
  },
  {
    title: "Reconciliation and virtual DOM",
    description:
      "React elements as UI descriptions, diffing and DOM reuse, keys in lists, and when subtrees remount.",
    href: "/studies/advanced-concepts/reconciliation-virtual-dom",
    category: "Advanced concepts",
  },
  {
    title: "useId",
    description:
      "Generate stable, SSR-safe ids for labels and ARIA attributes; avoid Math.random() hydration mismatches.",
    href: "/studies/advanced-concepts/use-id",
    category: "Advanced concepts",
  },
  {
    title: "useCallback as ref",
    description:
      "Callback refs let you capture DOM nodes on mount/unmount; memoize with useCallback to keep ref identity stable.",
    href: "/studies/advanced-concepts/use-callback-ref",
    category: "Advanced concepts",
  },
  {
    title: "useCallback (referential integrity)",
    description:
      "Keep stable function identities for React.memo children and hook dependency lists; avoid unnecessary re-renders.",
    href: "/studies/advanced-concepts/use-callback-reference-integrity",
    category: "Advanced concepts",
  },
  {
    title: "useMemo (avoid unnecessary work)",
    description:
      "Memoize expensive derived values; pair with React.memo when stable props help skip child re-renders.",
    href: "/studies/advanced-concepts/use-memo-avoid-rerenders",
    category: "Advanced concepts",
  },
  {
    title: "Avoiding unnecessary re-renders",
    description:
      "React.memo, stable props vs inline objects, colocation and context mindset; live tick vs accent with optional useMemo theme.",
    href: "/studies/advanced-concepts/avoid-unnecessary-rerenders",
    category: "Advanced concepts",
  },
  {
    title: "State vs props vs derived state",
    description:
      "Props as inputs, owned state, values derived at render, controlled fields, key reset for drafts, and redundant prop mirrors.",
    href: "/studies/advanced-concepts/state-props-derived-state",
    category: "Advanced concepts",
  },
  {
    title: "Composition vs inheritance",
    description:
      "children, slot props, wrappers, and hooks for reuse—instead of subclassing components for UI specialization.",
    href: "/studies/advanced-concepts/composition-vs-inheritance",
    category: "Advanced concepts",
  },
  {
    title: "Lifting state up and colocation strategies",
    description:
      "Keep state as low as possible until sharing needs it; lift to the lowest common parent and split stateless shells from stateful islands.",
    href: "/studies/advanced-concepts/lifting-state-colocation-strategies",
    category: "Advanced concepts",
  },
  {
    title: "State collocation",
    description:
      "Keep state in the lowest owner that needs it so siblings do not re-render; lift only when sharing requires it.",
    href: "/studies/advanced-concepts/state-collocation",
    category: "Advanced concepts",
  },
  {
    title: "Lift components up (re-renders)",
    description:
      "Put stateless chrome in a parent shell and state in a child so static UI does not re-render on each update.",
    href: "/studies/advanced-concepts/lift-components-up",
    category: "Advanced concepts",
  },
  {
    title: "Concurrent rendering",
    description:
      "Urgent vs transition updates, interruptible work, and compact useTransition / useDeferredValue list filtering examples.",
    href: "/studies/advanced-concepts/concurrent-rendering",
    category: "Advanced concepts",
  },
  {
    title: "useDeferredValue",
    description:
      "Defer expensive derived UI so typing stays responsive; filter large lists using a deferred query.",
    href: "/studies/advanced-concepts/use-deferred-value",
    category: "Advanced concepts",
  },
  {
    title: "startTransition",
    description:
      "Named import vs useTransition hook: non-urgent updates, batching setState, isPending, and tab-style switches.",
    href: "/studies/advanced-concepts/start-transition",
    category: "Advanced concepts",
  },
  {
    title: "useTransition",
    description:
      "Mark expensive state updates as non-urgent with startTransition; show pending UI with isPending.",
    href: "/studies/advanced-concepts/use-transition",
    category: "Advanced concepts",
  },
  {
    title: "Async App Router rendering",
    description:
      "Async Server Components, route loading.tsx, error.tsx, and streaming with Suspense in Next.js App Router.",
    href: "/studies/advanced-concepts/async-react-router",
    category: "Advanced concepts",
  },
  {
    title: "Feature-based vs layer-based structure",
    description:
      "Project architecture: organize by technical layers vs by product features; trade-offs and a pragmatic hybrid for Next.js apps.",
    href: "/studies/project-architecture/feature-vs-layer-structure",
    category: "Project architecture",
  },
  {
    title: "Separation of concerns",
    description:
      "Project architecture: keep UI, data loading, domain rules, and side effects separate so modules have one reason to change.",
    href: "/studies/project-architecture/separation-of-concerns",
    category: "Project architecture",
  },
  {
    title: "Reusable vs domain components",
    description:
      "Project architecture: keep shared UI primitives generic; put business-meaning components in features so changes stay local.",
    href: "/studies/project-architecture/reusable-vs-domain-components",
    category: "Project architecture",
  },
  {
    title: "Building an API layer",
    description:
      "API studies: centralize fetch, normalize errors, and add typed endpoint functions for consistent UI data access.",
    href: "/studies/api/api-layer",
    category: "API",
  },
  {
    title: "API layer with React Query",
    description:
      "Use TanStack Query on top of the API client to get caching, refetching, and better async state management.",
    href: "/studies/api/api-layer-react-query",
    category: "API",
  },
  {
    title: "BFF (Backend for Frontend)",
    description:
      "API study: a Next.js Route Handler acting as a BFF that reshapes upstream data into a UI-friendly contract.",
    href: "/studies/api/bff-backend-for-frontend",
    category: "API",
  },
  {
    title: "Error handling patterns in APIs",
    description:
      "API studies: pick status codes, standardize an error envelope, return actionable validation errors, and add request ids for tracing.",
    href: "/studies/api/error-handling-patterns",
    category: "API",
  },
  {
    title: "Auth flows — JWT, cookies, sessions",
    description:
      "Bearer vs httpOnly cookies, server-side sessions, refresh outline, XSS/CSRF reminders, and Next.js cookies/middleware snippets.",
    href: "/studies/security/auth-flows",
    category: "Authentication and security",
  },
  {
    title: "OAuth 2.0 basics",
    description:
      "Delegated auth: roles, authorization code + PKCE, state and redirect URI, scopes, OIDC note, and callback/token sketches.",
    href: "/studies/security/oauth-basics",
    category: "Authentication and security",
  },
  {
    title: "CSRF and XSS protection",
    description:
      "Forged cross-site requests vs script injection: SameSite and tokens, Origin checks, React escaping, dangerous sinks, and CSP.",
    href: "/studies/security/csrf-xss",
    category: "Authentication and security",
  },
  {
    title: "Next.js — server (overview)",
    description:
      "Hub for App Router server topics: where to read notes under next-server/ and jump into the server-side study.",
    href: "/studies/next-server",
    category: "Next.js (server)",
  },
  {
    title: "Next.js — file-based routing (App Router)",
    description:
      "How app/ maps to URLs: page, layout, loading, error, route handlers, dynamic segments, route groups, and metadata.",
    href: "/studies/next-server/file-based-routing",
    category: "Next.js (server)",
  },
  {
    title: "Next.js — layouts and nested layouts",
    description:
      "layout.tsx nesting, shared chrome and {children}, template vs layout, plus live sky/amber strips and a nested-demo route.",
    href: "/studies/next-server/layouts-and-nested-layouts",
    category: "Next.js (server)",
  },
  {
    title: "Next.js — middleware",
    description:
      "Edge middleware.ts, matcher, NextResponse, redirects/rewrites, request headers; live headers on the study route.",
    href: "/studies/next-server/middleware",
    category: "Next.js (server)",
  },
  {
    title: "Next.js — Edge vs Node.js runtime",
    description:
      "Segment runtime config, Route Handlers on Edge vs Node, fs on Node only, live probe-edge and probe-node JSON.",
    href: "/studies/next-server/edge-vs-node-runtime",
    category: "Next.js (server)",
  },
  {
    title: "Next.js — Route Handlers",
    description:
      "App Router route.ts: GET/POST, dynamic params, NextResponse.json; live demos and Pages Router migration notes.",
    href: "/studies/next-server/route-handlers",
    category: "Next.js (server)",
  },
  {
    title: "Next.js — SSR, SSG, and ISR",
    description:
      "Classic rendering modes mapped to App Router: dynamic vs static, fetch cache and revalidate, generateStaticParams.",
    href: "/studies/next-server/rendering-ssr-ssg-isr",
    category: "Next.js (server)",
  },
  {
    title: "Next.js — server-side in the App Router",
    description:
      "Server Components default, async RSC, fetch caching and revalidate, dynamic APIs, Server Actions vs Route Handlers, secrets, and the client boundary.",
    href: "/studies/next-server/server-side",
    category: "Next.js (server)",
  },
  {
    title: "React Server Components (Next.js)",
    description:
      "Default RSC in the App Router, async server pages, client islands, serializable props, and live fetch + clock demos.",
    href: "/studies/next-server/server-components",
    category: "Next.js (server)",
  },
  {
    title: "Suspense for data fetching (Next.js)",
    description:
      "Streaming with Suspense and async RSC, parallel boundaries, nested fallbacks, loading.tsx, and App Router patterns.",
    href: "/studies/next-server/suspense-data-fetching",
    category: "Next.js (server)",
  },
  {
    title: "Code splitting and lazy loading",
    description:
      "Performance optimization: split bundles and lazy-load heavy UI with next/dynamic and React.lazy + Suspense.",
    href: "/studies/performance-optimization/code-splitting-lazy-loading",
    category: "Performance optimization",
  },
  {
    title: "Throttling",
    description:
      "Rate-limit scroll, resize, and pointer handlers; throttle vs debounce, edges, and React listener patterns.",
    href: "/studies/performance-optimization/throttling",
    category: "Performance optimization",
  },
  {
    title: "Debouncing",
    description:
      "Run expensive work after input pauses; trailing vs leading, max wait, React cleanup, and fetch cancellation.",
    href: "/studies/performance-optimization/debouncing",
    category: "Performance optimization",
  },
  {
    title: "Image optimization (next/image)",
    description:
      "Next.js Image: lazy vs priority LCP, width/height and fill, sizes, placeholders, and remotePatterns for CDN URLs.",
    href: "/studies/performance-optimization/next-image",
    category: "Performance optimization",
  },
  {
    title: "Font optimization (next/font)",
    description:
      "Self-hosted Google and local fonts: display swap, subsets, CSS variables, route layout vs colocated loaders.",
    href: "/studies/performance-optimization/font-optimization",
    category: "Performance optimization",
  },
  {
    title: "Build process (Next.js build pipeline)",
    description:
      "Build & deployment: what next build does, static vs dynamic routes, prerendering, and the .next output folder.",
    href: "/studies/build-deployment/build-process-next-build-pipeline",
    category: "Build & deployment",
  },
  {
    title: "Environment variables (Next.js)",
    description:
      "Build & deployment: server vs client env vars, NEXT_PUBLIC exposure, build-time vs runtime behavior, and safe validation patterns.",
    href: "/studies/build-deployment/environment-variables",
    category: "Build & deployment",
  },
  {
    title: "CI/CD basics",
    description:
      "Build & deployment: CI checks, build artifacts, preview/staging/prod deploys, secrets handling, and post-deploy monitoring.",
    href: "/studies/build-deployment/ci-cd-basics",
    category: "Build & deployment",
  },
  {
    title: "Deployment platform: Vercel (Next.js)",
    description:
      "Build & deployment: how Vercel deploys Next.js (static vs dynamic vs edge), preview/prod environments, env vars, and caching mental model.",
    href: "/studies/build-deployment/vercel-nextjs",
    category: "Build & deployment",
  },
  {
    title: "Edge deployment concepts",
    description:
      "Build & deployment: edge runtime vs Node constraints, best-fit workloads (middleware), caching, and how edge fits on Next-native hosts.",
    href: "/studies/build-deployment/edge-deployment-concepts",
    category: "Build & deployment",
  },
] as const;

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-10 px-6 py-16">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Next.js + React studies
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Study workspace
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          This app holds small demos and notes organized by topic under{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/
          </code>
          . See{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            docs/ABOUT_THIS_PROJECT.md
          </code>{" "}
          for how the repository is meant to be used.
        </p>
      </header>

      <section aria-labelledby="topics-heading" className="space-y-4">
        <h2
          id="topics-heading"
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Topics
        </h2>
        <ul className="space-y-3">
          {topics.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className="block rounded-xl border border-zinc-200 p-4 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/40"
              >
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {t.category}
                </p>
                <p className="mt-1 font-medium text-zinc-900 dark:text-zinc-50">
                  {t.title}
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {t.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

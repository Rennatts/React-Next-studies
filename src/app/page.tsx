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

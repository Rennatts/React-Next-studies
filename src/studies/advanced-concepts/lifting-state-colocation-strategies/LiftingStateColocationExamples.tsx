"use client";

/**
 * Lifting state up vs colocation — small patterns + render probes.
 */

import { useRef, useState, type ReactNode } from "react";

function Section({
  id,
  title,
  code,
  children,
}: {
  id: string;
  title: string;
  code: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/40"
    >
      <div className="space-y-1">
        <h3 id={id} className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h3>
        <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-white p-3 text-[11px] leading-snug text-zinc-800 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200">
          <code>{code.trim()}</code>
        </pre>
      </div>
      {children}
    </section>
  );
}

function RenderProbe({ label }: { label: string }) {
  const n = useRef(0);
  n.current += 1;
  return (
    <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
      {label} render passes: {n.current}
    </p>
  );
}

/** --- 1. Collocated: each row owns open --- */

function CollocatedRow({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded border border-zinc-200 bg-white p-2 dark:border-zinc-600 dark:bg-zinc-900">
      <button
        type="button"
        className="text-left text-sm font-medium text-zinc-900 dark:text-zinc-50"
        onClick={() => setOpen((o) => !o)}
      >
        {title} {open ? "▼" : "▶"}
      </button>
      {open ? <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">Details for {title}…</p> : null}
    </div>
  );
}

function CollocatedListDemo() {
  return (
    <div className="space-y-2">
      <RenderProbe label="List parent" />
      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        Toggling a row updates only that row’s subtree; the list parent does not own <code className="font-mono">open</code>, so
        it does not re-render.
      </p>
      <div className="space-y-2">
        <CollocatedRow title="Row A" />
        <CollocatedRow title="Row B" />
      </div>
    </div>
  );
}

/** --- 2. Lifted expand in parent: parent re-renders on every toggle --- */

const ROWS = ["Row A", "Row B"] as const;

function LiftedExpandListDemo() {
  const [openTitle, setOpenTitle] = useState<string | null>(null);
  return (
    <div className="space-y-2">
      <RenderProbe label="List parent (owns openTitle)" />
      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        Same UI shape, but state lives in the parent—every toggle bumps the parent render count even though only one row
        opened. Prefer colocation unless siblings or the parent need this value.
      </p>
      <div className="space-y-2">
        {ROWS.map((title) => {
          const open = openTitle === title;
          return (
            <div
              key={title}
              className="rounded border border-zinc-200 bg-white p-2 dark:border-zinc-600 dark:bg-zinc-900"
            >
              <button
                type="button"
                className="text-left text-sm font-medium text-zinc-900 dark:text-zinc-50"
                onClick={() => setOpenTitle(open ? null : title)}
              >
                {title} {open ? "▼" : "▶"}
              </button>
              {open ? (
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">Details for {title}…</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** --- 3. Lift for sharing: two consumers --- */

function LiftedSharedDemo() {
  const [n, setN] = useState(0);
  return (
    <div className="space-y-3">
      <RenderProbe label="Parent (owns n)" />
      <div className="flex flex-wrap items-center gap-3 rounded-md border border-emerald-200 bg-emerald-50/80 p-3 text-sm dark:border-emerald-900 dark:bg-emerald-950/30">
        <button
          type="button"
          className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs text-white dark:bg-zinc-100 dark:text-zinc-900"
          onClick={() => setN((x) => x + 1)}
        >
          Increment
        </button>
        <span className="font-mono text-emerald-900 dark:text-emerald-100">Panel A: {n}</span>
        <span className="font-mono text-emerald-900 dark:text-emerald-100">Panel B: {n}</span>
      </div>
      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        Both panels must show the same number—state must live in a **common ancestor** and flow down as props.
      </p>
    </div>
  );
}

/** --- 4. State boundary: shell stays static --- */

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-sky-200 bg-white dark:border-sky-900 dark:bg-zinc-900">
      <header className="border-b border-sky-100 px-3 py-2 text-xs font-medium text-sky-900 dark:border-sky-900 dark:text-sky-100">
        Static header (no state here)
      </header>
      <RenderProbe label="Shell" />
      <div className="p-3">{children}</div>
    </div>
  );
}

function CounterIsland() {
  const [n, setN] = useState(0);
  return (
    <div className="space-y-2">
      <RenderProbe label="Counter island" />
      <button
        type="button"
        className="rounded-md bg-zinc-900 px-3 py-1.5 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
        onClick={() => setN((x) => x + 1)}
      >
        Count: {n}
      </button>
    </div>
  );
}

function ShellBoundaryDemo() {
  return (
    <div className="space-y-2">
      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        Counter state lives in <code className="font-mono">CounterIsland</code>. The shell wraps it with layout; clicks
        should not increase the shell’s render count (see also the dedicated lift-components-up study).
      </p>
      <PageShell>
        <CounterIsland />
      </PageShell>
    </div>
  );
}

export function LiftingStateColocationExamples() {
  return (
    <div className="space-y-8">
      <Section
        id="ex-collocate"
        title="1. Collocate — state next to the UI that uses it"
        code={`
function Row() {
  const [open, setOpen] = useState(false);
  return <button onClick={() => setOpen(!open)}>…</button>;
}
// Parent list has no open state → parent does not re-render per row
`}
      >
        <CollocatedListDemo />
      </Section>

      <Section
        id="ex-lifted-wrong"
        title="2. Lift only when needed — otherwise the parent pays"
        code={`
function List() {
  const [openId, setOpenId] = useState<string | null>(null);
  // Every toggle re-renders List + all row subtrees (unless memoized)
}
`}
      >
        <LiftedExpandListDemo />
      </Section>

      <Section
        id="ex-shared"
        title="3. Lift state up — multiple children need the same value"
        code={`
function Parent() {
  const [n, setN] = useState(0);
  return (
    <>
      <PanelA value={n} />
      <PanelB value={n} onInc={() => setN(n + 1)} />
    </>
  );
}
`}
      >
        <LiftedSharedDemo />
      </Section>

      <Section
        id="ex-shell"
        title="4. State boundary — stateless shell, stateful child"
        code={`
function PageShell({ children }) {
  return (
    <div>
      <header>…static…</header>
      {children}
    </div>
  );
}
<PageShell><CounterIsland /></PageShell>
`}
      >
        <ShellBoundaryDemo />
      </Section>
    </div>
  );
}

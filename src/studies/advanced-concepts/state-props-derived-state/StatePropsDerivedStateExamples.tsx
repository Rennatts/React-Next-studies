"use client";

/**
 * State vs props vs derived state — runnable examples + snippets.
 */

import { useEffect, useState, type ReactNode } from "react";

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

/** --- 1. Props: inputs from parent --- */

function Greeting({ name }: { name: string }) {
  return (
    <p className="rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-950 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-100">
      Hello, <strong>{name}</strong> — this string came from props (parent owns it).
    </p>
  );
}

function PropsDemo() {
  const [name, setName] = useState("Renata");
  return (
    <div className="space-y-3">
      <label className="block text-sm text-zinc-700 dark:text-zinc-300">
        Parent state (lifted source of truth)
        <input
          className="mt-1 block w-full max-w-md rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <Greeting name={name} />
    </div>
  );
}

/** --- 2. Local state: owned inside the component --- */

function LocalCounter() {
  const [n, setN] = useState(0);
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        onClick={() => setN((x) => x + 1)}
      >
        Local count: {n}
      </button>
      <span className="text-xs text-zinc-500">Parent does not hold this number.</span>
    </div>
  );
}

function StateDemo() {
  const [parentTick, setParentTick] = useState(0);
  return (
    <div className="space-y-3">
      <button
        type="button"
        className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-600"
        onClick={() => setParentTick((t) => t + 1)}
      >
        Re-render parent only (tick {parentTick})
      </button>
      <LocalCounter />
    </div>
  );
}

/** --- 3. Derived: compute in render --- */

function DerivedNameDemo() {
  const [first, setFirst] = useState("Ada");
  const [last, setLast] = useState("Lovelace");
  const displayName = `${first} ${last}`.trim();

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <label className="text-sm text-zinc-700 dark:text-zinc-300">
          First
          <input
            className="ml-1 rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
          />
        </label>
        <label className="text-sm text-zinc-700 dark:text-zinc-300">
          Last
          <input
            className="ml-1 rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800"
            value={last}
            onChange={(e) => setLast(e.target.value)}
          />
        </label>
      </div>
      <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100">
        <strong>Derived</strong> (no extra <code className="font-mono text-xs">useState</code> for this):{" "}
        <code className="font-mono text-xs">{displayName || "(empty)"}</code>
      </p>
    </div>
  );
}

/** --- 4. Controlled: state in parent, props are value + onChange --- */

function ControlledField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <label className="block text-sm text-zinc-700 dark:text-zinc-300">
      {label}
      <input
        className="mt-1 block w-full max-w-md rounded border border-zinc-300 px-2 py-1 dark:border-zinc-600 dark:bg-zinc-800"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function ControlledDemo() {
  const [email, setEmail] = useState("you@example.com");
  return (
    <div className="space-y-2">
      <ControlledField label="Email (controlled)" value={email} onChange={setEmail} />
      <p className="text-xs text-zinc-500">Parent state: {email}</p>
    </div>
  );
}

/** --- 5. Draft seeded from prop: prefer key reset over effect mirror --- */

function DraftNote({ initialBody }: { initialBody: string }) {
  const [body, setBody] = useState(initialBody);
  return (
    <textarea
      className="mt-1 min-h-[5rem] w-full max-w-md rounded border border-zinc-300 p-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
      value={body}
      onChange={(e) => setBody(e.target.value)}
      aria-label="Draft body"
    />
  );
}

function KeyedDraftDemo() {
  const [docId, setDocId] = useState<"a" | "b">("a");
  const seed = docId === "a" ? "Draft A…" : "Draft B…";

  return (
    <div className="space-y-3">
      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        Switching documents should load a fresh draft. Using <code className="font-mono text-xs">key=&#123;docId&#125;</code>{" "}
        remounts the editor so <code className="font-mono text-xs">useState(initial)</code> runs again—no{" "}
        <code className="font-mono text-xs">useEffect</code> needed only to copy <code className="font-mono text-xs">initialBody</code> into state.
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${
            docId === "a"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "border border-zinc-300 dark:border-zinc-600"
          }`}
          onClick={() => setDocId("a")}
        >
          Doc A
        </button>
        <button
          type="button"
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${
            docId === "b"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "border border-zinc-300 dark:border-zinc-600"
          }`}
          onClick={() => setDocId("b")}
        >
          Doc B
        </button>
      </div>
      <DraftNote key={docId} initialBody={seed} />
    </div>
  );
}

/** --- 6. Redundant prop mirror (works but unnecessary) --- */

function RedundantMirror({ source }: { source: number }) {
  const [copy, setCopy] = useState(source);
  useEffect(() => {
    setCopy(source);
  }, [source]);
  return (
    <p className="text-sm text-amber-900 dark:text-amber-100">
      Mirrored with effect: <strong>{copy}</strong> — you could render <code className="font-mono text-xs">source</code>{" "}
      directly unless you need intermediate editing semantics.
    </p>
  );
}

function MirrorComparisonDemo() {
  const [n, setN] = useState(0);
  return (
    <div className="space-y-3">
      <button
        type="button"
        className="rounded-md bg-zinc-900 px-3 py-1.5 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
        onClick={() => setN((x) => x + 1)}
      >
        Parent value: {n}
      </button>
      <RedundantMirror source={n} />
      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        The effect only copies prop → state. Prefer deriving in render or lifting the single source of truth instead of
        duplicating data.
      </p>
    </div>
  );
}

export function StatePropsDerivedStateExamples() {
  return (
    <div className="space-y-8">
      <Section
        id="ex-props"
        title="1. Props — parent-owned values passed down"
        code={`
function Greeting({ name }: { name: string }) {
  return <p>Hello, {name}</p>;
}
// Parent: const [name, setName] = useState("Ada");
// <Greeting name={name} />
`}
      >
        <PropsDemo />
      </Section>

      <Section
        id="ex-state"
        title="2. State — local to this subtree"
        code={`
function LocalCounter() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}
`}
      >
        <StateDemo />
      </Section>

      <Section
        id="ex-derived"
        title="3. Derived state — compute, do not duplicate"
        code={`
const [first, setFirst] = useState("Ada");
const [last, setLast] = useState("Lovelace");
const displayName = \`\${first} \${last}\`.trim();
// Avoid: useState + useEffect only to keep displayName in sync
`}
      >
        <DerivedNameDemo />
      </Section>

      <Section
        id="ex-controlled"
        title="4. Controlled component — state lives in parent"
        code={`
<ControlledField
  label="Email"
  value={email}
  onChange={setEmail}
/>
`}
      >
        <ControlledDemo />
      </Section>

      <Section
        id="ex-key"
        title="5. Reset local state when a prop identity changes — use key"
        code={`
<DraftNote key={docId} initialBody={seed} />
`}
      >
        <KeyedDraftDemo />
      </Section>

      <Section
        id="ex-mirror"
        title="6. Anti-pattern: effect only to mirror props into state"
        code={`
const [copy, setCopy] = useState(source);
useEffect(() => setCopy(source), [source]);
// Often replace with: render \`source\` or key={sourceId} for drafts
`}
      >
        <MirrorComparisonDemo />
      </Section>
    </div>
  );
}

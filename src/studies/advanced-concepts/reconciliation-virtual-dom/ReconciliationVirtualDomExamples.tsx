"use client";

/**
 * Reconciliation + virtual DOM — runnable examples.
 *
 * 1) Elements are plain objects (virtual DOM descriptions).
 * 2) Same component position → update in place; ref to DOM node stays stable.
 * 3) Lists: key={id} preserves row identity when reordering; key={index} does not.
 */

import {
  createElement,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/** --- Example 1: element shape (virtual DOM description) --- */

function ElementShapeDemo() {
  const snapshot = useMemo(() => {
    const el = createElement(
      "div",
      { className: "rounded border p-2", id: "sample" },
      "Hello",
    );
    return {
      type: el.type,
      props: {
        ...el.props,
        children: "Hello",
      },
    };
  }, []);

  return (
    <div className="space-y-2">
      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        <code className="font-mono text-xs">createElement(&quot;div&quot;, props, &quot;Hello&quot;)</code>{" "}
        returns an object like this (conceptually your &quot;virtual DOM&quot; node):
      </p>
      <pre className="max-h-48 overflow-auto rounded-lg border border-zinc-200 bg-white p-3 text-xs leading-relaxed dark:border-zinc-700 dark:bg-zinc-950">
        {JSON.stringify(snapshot, null, 2)}
      </pre>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Internally React adds fields such as <code className="font-mono">$$typeof</code> for safety; the
        important part is <strong>type + props</strong>, not a live DOM node.
      </p>
    </div>
  );
}

/** --- Example 2: reconciliation reuses the same DOM node --- */

function TrackedBox({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [note, setNote] = useState<string>("Update the parent counter and watch this message.");

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    setNote(
      `This div is the same host node across updates (ref object stable: ${node === ref.current ? "yes" : "no"}). Text prop from parent: "${text}".`,
    );
  }, [text]);

  return (
    <div className="space-y-2">
      <div
        ref={ref}
        className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100"
      >
        {text}
      </div>
      <p className="text-xs text-zinc-600 dark:text-zinc-400">{note}</p>
    </div>
  );
}

function ReuseDomNodeDemo() {
  const [n, setN] = useState(0);
  return (
    <div className="space-y-3">
      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        Same <code className="font-mono text-xs">TrackedBox</code> position and element{" "}
        <code className="font-mono text-xs">type</code> → React <strong>updates</strong> the existing
        instance instead of destroying the DOM subtree on each tick.
      </p>
      <button
        type="button"
        className="rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        onClick={() => setN((x) => x + 1)}
      >
        Parent count: {n}
      </button>
      <TrackedBox text={`Rendered with n = ${n}`} />
    </div>
  );
}

/** --- Example 3: keys and list reconciliation --- */

type Item = { id: string; title: string };

const INITIAL: Item[] = [
  { id: "a", title: "Row A" },
  { id: "b", title: "Row B" },
];

function KeyedRow({ item }: { item: Item }) {
  const [value, setValue] = useState(() => `typed in ${item.id}`);
  return (
    <div className="flex flex-wrap items-center gap-2 rounded border border-zinc-200 bg-white p-2 dark:border-zinc-600 dark:bg-zinc-900">
      <span className="text-xs font-medium text-zinc-500">{item.title}</span>
      <input
        className="min-w-[12rem] flex-1 rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label={`Input for ${item.id}`}
      />
    </div>
  );
}

function ListKeyDemo() {
  const [items, setItems] = useState<Item[]>(INITIAL);
  const [useStableKey, setUseStableKey] = useState(true);

  const swap = useCallback(() => {
    setItems((prev) => (prev.length < 2 ? prev : [prev[1], prev[0]]));
  }, []);

  return (
    <div className="space-y-3">
      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        Each row keeps <strong>local state</strong> in <code className="font-mono text-xs">KeyedRow</code>.
        Swap order: with <code className="font-mono text-xs">key=&#123;item.id&#125;</code> the input moves
        with its row; with <code className="font-mono text-xs">key=&#123;index&#125;</code>, React reconciles
        by position and <strong>reuses the wrong component state</strong> for the wrong item.
      </p>
      <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-800 dark:text-zinc-200">
        <input
          type="checkbox"
          checked={useStableKey}
          onChange={(e) => setUseStableKey(e.target.checked)}
          className="rounded border-zinc-400"
        />
        Use stable <code className="font-mono text-xs">key=&#123;item.id&#125;</code> (recommended)
      </label>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          onClick={swap}
        >
          Swap A ↔ B
        </button>
        <button
          type="button"
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-600"
          onClick={() => setItems(INITIAL)}
        >
          Reset list
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={useStableKey ? item.id : index}>
            <KeyedRow item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** --- Example 4: changing type or key remounts --- */

function MountCounter({ name }: { name: string }) {
  const renders = useRef(0);
  renders.current += 1;
  return (
    <p className="text-sm text-zinc-700 dark:text-zinc-300">
      <code className="font-mono text-xs">{name}</code> render passes this mount (Strict Mode in dev may
      double): <strong>{renders.current}</strong>
    </p>
  );
}

function RemountBoundaryDemo() {
  const [which, setWhich] = useState<"div" | "span">("div");
  const [key, setKey] = useState(0);

  return (
    <div className="space-y-3">
      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        Different <code className="font-mono text-xs">type</code> or a new <code className="font-mono text-xs">key</code>{" "}
        tells React to tear down and create a fresh subtree.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-600"
          onClick={() => setWhich((t) => (t === "div" ? "span" : "div"))}
        >
          Toggle wrapper: {which}
        </button>
        <button
          type="button"
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-600"
          onClick={() => setKey((k) => k + 1)}
        >
          Bump remount key: {key}
        </button>
      </div>
      {which === "div" ? (
        <div key={key} className="rounded border border-amber-200 bg-amber-50 p-2 dark:border-amber-800 dark:bg-amber-950/30">
          <MountCounter name="Inside div" />
        </div>
      ) : (
        <span key={key} className="block rounded border border-amber-200 bg-amber-50 p-2 dark:border-amber-800 dark:bg-amber-950/30">
          <MountCounter name="Inside span" />
        </span>
      )}
    </div>
  );
}

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
    <section aria-labelledby={id} className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/40">
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

export function ReconciliationVirtualDomExamples() {
  return (
    <div className="space-y-8">
      <Section
        id="ex-vdom"
        title="1. Element objects (virtual DOM)"
        code={`
const el = createElement("div", { className: "box", id: "x" }, "Hello");
// el.type === "div"
// el.props → { className: "box", id: "x", children: "Hello" }
`}
      >
        <ElementShapeDemo />
      </Section>

      <Section
        id="ex-reuse"
        title="2. Same type + same place → update in place"
        code={`
// Parent re-renders with new props; child stays same position.
<TrackedBox text={\`n = \${n}\`} />
`}
      >
        <ReuseDomNodeDemo />
      </Section>

      <Section
        id="ex-keys"
        title="3. List reconciliation and key"
        code={`
{items.map((item, index) => (
  <li key={item.id}>   {/* stable identity */}
    <KeyedRow item={item} />
  </li>
))}
// vs key={index} — breaks when order changes
`}
      >
        <ListKeyDemo />
      </Section>

      <Section
        id="ex-remount"
        title="4. Different type or key → remount"
        code={`
{which === "div" ? (
  <div key={key}><MountCounter /></div>
) : (
  <span key={key}><MountCounter /></span>
)}
`}
      >
        <RemountBoundaryDemo />
      </Section>
    </div>
  );
}

"use client";

/**
 * Composition vs inheritance — React favors composing trees, not subclassing components.
 */

import { useCallback, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";

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

/** --- 1. children: parent supplies arbitrary subtree --- */

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-sky-200 bg-white p-3 dark:border-sky-900 dark:bg-zinc-900">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-sky-800 dark:text-sky-200">{title}</h4>
      <div className="mt-2 text-sm text-zinc-800 dark:text-zinc-200">{children}</div>
    </div>
  );
}

function ChildrenDemo() {
  return (
    <Panel title="Notifications">
      <p>Anything the parent passes as children becomes the body—no subclass of Panel required.</p>
      <ul className="mt-2 list-disc pl-4 text-xs text-zinc-600 dark:text-zinc-400">
        <li>Compose lists, forms, or charts here.</li>
      </ul>
    </Panel>
  );
}

/** --- 2. Named slots: explicit layout holes --- */

function ArticleLayout({
  kicker,
  title,
  actions,
  body,
}: {
  kicker: ReactNode;
  title: ReactNode;
  actions: ReactNode;
  body: ReactNode;
}) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
      <header className="flex flex-wrap items-start justify-between gap-2 border-b border-zinc-100 p-3 dark:border-zinc-800">
        <div>
          <div className="text-[10px] font-medium uppercase text-zinc-500">{kicker}</div>
          <div className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{title}</div>
        </div>
        <div className="flex shrink-0 gap-1">{actions}</div>
      </header>
      <div className="p-3 text-sm text-zinc-700 dark:text-zinc-300">{body}</div>
    </article>
  );
}

function SlotsDemo() {
  return (
    <ArticleLayout
      kicker="Study"
      title="Composition with slot props"
      actions={
        <>
          <button
            type="button"
            className="rounded border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-600"
          >
            Share
          </button>
          <button
            type="button"
            className="rounded bg-zinc-900 px-2 py-1 text-xs text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Save
          </button>
        </>
      }
      body={
        <p>Slots are props of type ReactNode—composition with a clearer API than one giant children tree.</p>
      }
    />
  );
}

/** --- 3. Wrapper: decorate any subtree --- */

function Highlight({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-md border-2 border-amber-400 bg-amber-50 p-2 dark:border-amber-600 dark:bg-amber-950/40">
      {children}
    </div>
  );
}

function WrapperDemo() {
  return (
    <Highlight>
      <p className="text-sm text-amber-950 dark:text-amber-100">
        Wrappers add chrome around <strong>whatever</strong> the parent composes in—same pattern as error boundaries,
        providers, or layout shells.
      </p>
    </Highlight>
  );
}

/** --- 4. Flexible “icon button” without subclassing Button --- */

function Button({
  children,
  leftIcon,
  ...rest
}: { children: ReactNode; leftIcon?: ReactNode } & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-3 py-1.5 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
      {...rest}
      type="button"
    >
      {leftIcon ? <span className="flex shrink-0 items-center">{leftIcon}</span> : null}
      {children}
    </button>
  );
}

function IconSlotDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Plain</Button>
      <Button leftIcon={<span aria-hidden>★</span>}>With icon slot</Button>
    </div>
  );
}

/** --- 5. Share logic with a hook (not extends) --- */

function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn((v) => !v), []);
  return { on, toggle };
}

function SoundToggle() {
  const { on, toggle } = useToggle(false);
  return (
    <button
      type="button"
      className="rounded border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-600"
      onClick={toggle}
    >
      Sound: {on ? "on" : "off"}
    </button>
  );
}

function LightsToggle() {
  const { on, toggle } = useToggle(true);
  return (
    <button
      type="button"
      className="rounded border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-600"
      onClick={toggle}
    >
      Lights: {on ? "on" : "off"}
    </button>
  );
}

function HookShareDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <SoundToggle />
      <LightsToggle />
    </div>
  );
}

export function CompositionVsInheritanceExamples() {
  return (
    <div className="space-y-8">
      <Section
        id="ex-children"
        title="1. children — open extension point"
        code={`
function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h4>{title}</h4>
      {children}
    </div>
  );
}
// <Panel title="…"><p>Anything here</p></Panel>
`}
      >
        <ChildrenDemo />
      </Section>

      <Section
        id="ex-slots"
        title="2. Named slots — multiple composition points"
        code={`
<ArticleLayout
  kicker={…}
  title={…}
  actions={<>…buttons…</>}
  body={<p>…</p>}
/>
`}
      >
        <SlotsDemo />
      </Section>

      <Section
        id="ex-wrapper"
        title="3. Wrapper components — decorate a subtree"
        code={`
<Highlight>
  <p>Inner content stays unaware of the border.</p>
</Highlight>
`}
      >
        <WrapperDemo />
      </Section>

      <Section
        id="ex-icon"
        title="4. Specialize with props, not class extends"
        code={`
// Prefer optional slots / variants:
<Button leftIcon={<Star />}>Save</Button>
// Not: class IconButton extends Button { … }
`}
      >
        <IconSlotDemo />
      </Section>

      <Section
        id="ex-hook"
        title="5. Share behavior — custom hook instead of a base class"
        code={`
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn(v => !v), []);
  return { on, toggle };
}
`}
      >
        <HookShareDemo />
      </Section>
    </div>
  );
}

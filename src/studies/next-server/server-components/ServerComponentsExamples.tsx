"use client";

/**
 * Reference snippets for Server vs Client Components in the Next.js App Router.
 */

import type { ReactNode } from "react";

function Section({ id, title, code }: { id: string; title: string; code: string }) {
  return (
    <section
      aria-labelledby={id}
      className="space-y-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/40"
    >
      <h3 id={id} className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h3>
      <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-white p-3 text-[11px] leading-snug text-zinc-800 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200">
        <code>{code.trim()}</code>
      </pre>
    </section>
  );
}

function Note({ children }: { children: ReactNode }) {
  return <p className="text-xs text-zinc-600 dark:text-zinc-400">{children}</p>;
}

export function ServerComponentsExamples() {
  return (
    <div className="space-y-6">
      <Note>
        Live demos above run in this repo’s study route. Below is “copy shape” reference code—adjust paths and data
        layers to your app.
      </Note>

      <Section
        id="ex-default-server"
        title="1. Default: Server Component (no directive)"
        code={`
// app/dashboard/page.tsx
export default async function Page() {
  const rows = await db.query("select …");
  return <ul>{rows.map((r) => <li key={r.id}>{r.title}</li>)}</ul>;
}
`}
      />

      <Section
        id="ex-async"
        title="2. Async RSC + fetch"
        code={`
export default async function Page() {
  const res = await fetch("https://api.example.com/items", {
    next: { revalidate: 60 },
  });
  const items = await res.json();
  return <ItemList items={items} />;
}
`}
      />

      <Section
        id="ex-client-boundary"
        title='3. Opt into the client with "use client"'
        code={`
"use client";

import { useState } from "react";

export function Counter() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}
`}
      />

      <Section
        id="ex-compose"
        title="4. Server page composes a client island"
        code={`
import { Counter } from "./Counter";

export default async function Page() {
  const title = await getTitle();
  return (
    <main>
      <h1>{title}</h1>
      <Counter initial={0} />
    </main>
  );
}
`}
      />

      <Section
        id="ex-serializable"
        title="5. Props from server → client must be serializable"
        code={`
// OK: string, number, plain objects/arrays of JSON-like values
<ClientChart data={points} label="Q1" />

// Avoid: class instances, functions (except Server Actions passed specially), symbols
`}
      />
    </div>
  );
}

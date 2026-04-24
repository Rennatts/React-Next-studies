"use client";

/**
 * Next.js App Router — layouts & nested layouts (reference snippets).
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

export function LayoutsNestedLayoutsExamples() {
  return (
    <div className="space-y-6">
      <Note>
        Colored strips on this study route come from real <code className="font-mono text-xs">layout.tsx</code> files
        under <code className="font-mono text-xs">src/app/studies/next-server/layouts-and-nested-layouts/</code>.
      </Note>

      <Section
        id="ex-root"
        title="1. Root layout (required): html + body"
        code={`
// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`}
      />

      <Section
        id="ex-segment"
        title="2. Segment layout: shared chrome for a folder"
        code={`
// src/app/dashboard/layout.tsx
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside>
        <Link href="/dashboard">Home</Link>
        <Link href="/dashboard/settings">Settings</Link>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}

// src/app/dashboard/page.tsx       → /dashboard
// src/app/dashboard/settings/page.tsx → /dashboard/settings
// Both pages render inside <main>{children}</main>; aside stays mounted.
`}
      />

      <Section
        id="ex-nested"
        title="3. Nested layout: another layout.tsx deeper"
        code={`
// src/app/dashboard/projects/layout.tsx
export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h2>Projects</h2>
      {children}
    </div>
  );
}

// src/app/dashboard/projects/page.tsx      → /dashboard/projects
// src/app/dashboard/projects/[id]/page.tsx → /dashboard/projects/123
`}
      />

      <Section
        id="ex-children"
        title="4. Where the next segment appears"
        code={`
// Parent layout always renders {children} where the child segment goes.
export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <header>…</header>
      {children}
    </section>
  );
}
`}
      />

      <Section
        id="ex-template"
        title="5. template.tsx vs layout.tsx (short)"
        code={`
// layout.tsx  — state in layout subtree persists across child navigations
// template.tsx — remounts on navigation (new instance each time)
`}
      />

      <Section
        id="ex-metadata"
        title="6. Metadata in layouts (optional)"
        code={`
// src/app/dashboard/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

// Deeper routes can export their own metadata; Next merges by convention.
`}
      />
    </div>
  );
}

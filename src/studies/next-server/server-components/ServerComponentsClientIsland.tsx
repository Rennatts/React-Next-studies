"use client";

import { useState } from "react";

/** Small client boundary: receives only serializable props from a Server Component parent. */
export function ServerComponentsClientIsland({ serverLabel }: { serverLabel: string }) {
  const [n, setN] = useState(0);
  return (
    <div className="rounded-lg border border-violet-200 bg-violet-50/90 p-3 text-sm text-violet-950 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-100">
      <p className="font-mono text-xs font-semibold">Client island</p>
      <p className="mt-1 text-xs">
        Prop from server: <strong>{serverLabel}</strong>
      </p>
      <button
        type="button"
        className="mt-2 rounded-md bg-violet-900 px-3 py-1.5 text-xs text-white hover:bg-violet-800 dark:bg-violet-200 dark:text-violet-950 dark:hover:bg-violet-100"
        onClick={() => setN((c) => c + 1)}
      >
        Client clicks: {n}
      </button>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

export function HeavyWidget({ title }: { title: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {title}
      </p>
      <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
        This component simulates “expensive initialization” before rendering its main UI.
      </p>
      <div className="mt-3 rounded-lg bg-zinc-50 p-3 text-sm text-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-200">
        {ready ? "Ready ✅" : "Initializing…"}
      </div>
    </div>
  );
}

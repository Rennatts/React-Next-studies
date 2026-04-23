"use client";

import { useMemo, useState } from "react";
import { ProfileCardView } from "./ProfileCardView";
import { withUserId } from "./withUserId";

export function HocDemo() {
  const [mode, setMode] = useState<"base" | "hoc">("hoc");

  const Enhanced = useMemo(() => withUserId(ProfileCardView), []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setMode("base")}
          className={[
            "rounded-md px-3 py-2 text-sm font-medium",
            mode === "base"
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
          ].join(" ")}
        >
          Base component
        </button>
        <button
          type="button"
          onClick={() => setMode("hoc")}
          className={[
            "rounded-md px-3 py-2 text-sm font-medium",
            mode === "hoc"
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
          ].join(" ")}
        >
          Enhanced via HOC
        </button>
      </div>

      {mode === "base" ? (
        <div className="space-y-2">
          <ProfileCardView title="Base: caller must pass userId" userId="user_manual_123" />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Here, the parent decides the <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">userId</code>.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <Enhanced title="HOC: userId injected by withUserId()" />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            The enhanced component&apos;s public props no longer include{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">userId</code>.
          </p>
        </div>
      )}
    </div>
  );
}


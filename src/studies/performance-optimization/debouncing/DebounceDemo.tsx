"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const WAIT_MS = 400;

export function DebounceDemo() {
  const [query, setQuery] = useState("");
  const [rawChanges, setRawChanges] = useState(0);
  const [debouncedCommits, setDebouncedCommits] = useState(0);
  const [lastCommitted, setLastCommitted] = useState("");

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const scheduleCommit = useCallback((value: string) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = undefined;
      setDebouncedCommits((c) => c + 1);
      setLastCommitted(value);
    }, WAIT_MS);
  }, []);

  useEffect(
    () => () => {
      clearTimeout(timeoutRef.current);
    },
    [],
  );

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Performance optimization
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Type quickly, then pause. Each <code className="text-xs">onChange</code> increments{" "}
          <span className="font-medium">raw changes</span>. The{" "}
          <span className="font-medium">debounced commits</span> counter moves only after{" "}
          {WAIT_MS}ms without a new keystroke (trailing edge).
        </p>
      </div>

      <label className="grid gap-2">
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
          Simulated search field
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => {
            const v = e.target.value;
            setQuery(v);
            setRawChanges((c) => c + 1);
            scheduleCommit(v);
          }}
          placeholder="Type here…"
          className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:ring-zinc-700"
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Raw onChange events</p>
          <p className="text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
            {rawChanges}
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Debounced commits ({WAIT_MS}ms idle)
          </p>
          <p className="text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
            {debouncedCommits}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 px-3 py-2 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        <span className="font-medium text-zinc-800 dark:text-zinc-200">Last committed value: </span>
        <span className="break-all font-mono text-zinc-700 dark:text-zinc-300">
          {lastCommitted.length > 0 ? JSON.stringify(lastCommitted) : "—"}
        </span>
      </div>
    </div>
  );
}

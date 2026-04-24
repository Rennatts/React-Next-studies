"use client";

import { useMemo, useState } from "react";

type Row = { id: string; label: string };

const initial: Row[] = [
  { id: "a", label: "Ada" },
  { id: "b", label: "Brendan" },
  { id: "c", label: "Carol" },
];

function moveToTop<T>(arr: T[], index: number) {
  const next = arr.slice();
  const [item] = next.splice(index, 1);
  next.unshift(item);
  return next;
}

export function KeysDemo() {
  const [useIndexKeys, setUseIndexKeys] = useState(true);
  const [rows, setRows] = useState<Row[]>(initial);

  const hint = useMemo(
    () =>
      useIndexKeys
        ? "Bad: index keys cause input state to jump after reordering."
        : "Good: stable id keys keep input state with the right item.",
    [useIndexKeys],
  );

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Advanced concepts
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{hint}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setUseIndexKeys(true)}
          className={[
            "rounded-md px-3 py-2 text-sm font-medium",
            useIndexKeys
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
          ].join(" ")}
        >
          Use index keys (bad)
        </button>
        <button
          type="button"
          onClick={() => setUseIndexKeys(false)}
          className={[
            "rounded-md px-3 py-2 text-sm font-medium",
            !useIndexKeys
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
          ].join(" ")}
        >
          Use id keys (good)
        </button>
      </div>

      <div className="space-y-2">
        {rows.map((row, index) => (
          <KeyRow
            key={useIndexKeys ? index : row.id}
            label={row.label}
            onMoveToTop={() => setRows((r) => moveToTop(r, index))}
          />
        ))}
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Type into an input, then click “Move to top”. With index keys, the text can appear
        to “move” to a different person.
      </p>
    </div>
  );
}

function KeyRow({ label, onMoveToTop }: { label: string; onMoveToTop: () => void }) {
  const [text, setText] = useState("");

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{label}</p>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type here…"
          className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:ring-zinc-700"
        />
      </div>
      <button
        type="button"
        onClick={onMoveToTop}
        className="shrink-0 rounded-md border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
      >
        Move to top
      </button>
    </div>
  );
}


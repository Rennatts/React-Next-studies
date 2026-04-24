"use client";

import { useRef, useState } from "react";

const ROW_IDS = [1, 2, 3, 4, 5] as const;

function SiblingRibbon() {
  const renders = useRef(0);
  renders.current += 1;

  return (
    <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 px-3 py-2 text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
      Sibling strip (does not read row state) — renders:{" "}
      <span className="font-medium text-zinc-900 dark:text-zinc-100">{renders.current}</span>
    </div>
  );
}

function LiftedRows({
  openId,
  onToggle,
}: {
  openId: number | null;
  onToggle: (id: number) => void;
}) {
  return (
    <ul className="space-y-2">
      {ROW_IDS.map((id) => (
        <LiftedRow key={id} id={id} isOpen={openId === id} onToggle={() => onToggle(id)} />
      ))}
    </ul>
  );
}

function LiftedRow({
  id,
  isOpen,
  onToggle,
}: {
  id: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const renders = useRef(0);
  renders.current += 1;

  return (
    <li className="rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Row {id}</span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">renders: {renders.current}</span>
        <button
          type="button"
          onClick={onToggle}
          className="rounded-md border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800/60"
        >
          {isOpen ? "Collapse" : "Expand"}
        </button>
      </div>
      {isOpen ? (
        <p className="border-t border-zinc-200 px-3 py-2 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          Detail for row {id}. State lives in the parent, so the parent re-renders and every row
          receives new props when any row toggles.
        </p>
      ) : null}
    </li>
  );
}

function LiftedListShell() {
  const [openId, setOpenId] = useState<number | null>(null);
  const shellRenders = useRef(0);
  shellRenders.current += 1;

  const handleToggle = (id: number) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        List shell renders:{" "}
        <span className="font-medium text-zinc-800 dark:text-zinc-200">{shellRenders.current}</span>
      </p>
      <SiblingRibbon />
      <LiftedRows openId={openId} onToggle={handleToggle} />
    </div>
  );
}

function CollocatedRow({ id }: { id: number }) {
  const [open, setOpen] = useState(false);
  const renders = useRef(0);
  renders.current += 1;

  return (
    <li className="rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Row {id}</span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">renders: {renders.current}</span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800/60"
        >
          {open ? "Collapse" : "Expand"}
        </button>
      </div>
      {open ? (
        <p className="border-t border-zinc-200 px-3 py-2 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          Detail for row {id}. Only this row&apos;s state changed, so siblings and the list shell do
          not re-render.
        </p>
      ) : null}
    </li>
  );
}

function CollocatedListShell() {
  const [bump, setBump] = useState(0);
  const shellRenders = useRef(0);
  shellRenders.current += 1;

  return (
    <div className="space-y-3">
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        List shell renders:{" "}
        <span className="font-medium text-zinc-800 dark:text-zinc-200">{shellRenders.current}</span>
        {" · "}
        <span className="text-zinc-500 dark:text-zinc-400">unrelated shell tick: {bump}</span>
      </p>
      <SiblingRibbon />
      <ul className="space-y-2">
        {ROW_IDS.map((id) => (
          <CollocatedRow key={id} id={id} />
        ))}
      </ul>
      <button
        type="button"
        onClick={() => setBump((t) => t + 1)}
        className="rounded-md border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
      >
        Bump list shell (unrelated parent state — see sibling + rows re-render)
      </button>
    </div>
  );
}

/** Renders either lifted or collocated subtree so counters reset when switching. */
function StrategyBody({ mode }: { mode: "lifted" | "collocated" }) {
  if (mode === "lifted") return <LiftedListShell />;
  return <CollocatedListShell />;
}

export function StateCollocationDemo() {
  const [mode, setMode] = useState<"lifted" | "collocated">("lifted");

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Advanced concepts
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Compare where expansion state lives. When it is lifted to the list shell, opening one row
          updates shell state and re-renders every row plus the sibling strip. When it is collocated
          inside each row, only that row re-renders.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("lifted")}
          className={[
            "rounded-md px-3 py-2 text-sm font-medium",
            mode === "lifted"
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
          ].join(" ")}
        >
          Lifted in list shell
        </button>
        <button
          type="button"
          onClick={() => setMode("collocated")}
          className={[
            "rounded-md px-3 py-2 text-sm font-medium",
            mode === "collocated"
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
          ].join(" ")}
        >
          Collocated in rows
        </button>
      </div>

      <StrategyBody mode={mode} key={mode} />
    </div>
  );
}

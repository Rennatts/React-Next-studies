"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Item = { id: string; label: string };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function KeyboardNavigationDemo() {
  const items = useMemo<Item[]>(
    () => [
      { id: "i_1", label: "First item" },
      { id: "i_2", label: "Second item" },
      { id: "i_3", label: "Third item" },
      { id: "i_4", label: "Fourth item" },
    ],
    [],
  );

  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
  }, [open]);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Focus restoration (open/close)
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          When the panel opens, focus moves inside. When it closes, focus returns to the trigger.
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
          >
            Open panel
          </button>
        </div>

        {open ? (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Demo panel"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                setOpen(false);
                queueMicrotask(() => triggerRef.current?.focus());
              }
            }}
            className="mt-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Demo panel</p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Press Escape to close.</p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                ref={closeRef}
                type="button"
                onClick={() => {
                  setOpen(false);
                  queueMicrotask(() => triggerRef.current?.focus());
                }}
                className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
              >
                Close
              </button>
              <button
                type="button"
                className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
              >
                Secondary action
              </button>
            </div>
          </div>
        ) : null}
      </section>

      <section className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Roving tabindex (Arrow navigation)
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Tab focuses the list container, then use ArrowUp/ArrowDown (or Home/End) to move the active item. Only one
          item is tabbable at a time.
        </p>

        <div className="mt-3 rounded-lg border border-zinc-200 p-2 dark:border-zinc-800">
          <div role="group" aria-label="Roving list" className="grid gap-2 sm:grid-cols-2">
            {items.map((it, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={it.id}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  type="button"
                  tabIndex={isActive ? 0 : -1}
                  aria-current={isActive ? "true" : undefined}
                  onFocus={() => setActiveIndex(idx)}
                  onKeyDown={(e) => {
                    const max = items.length - 1;
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      const next = clamp(activeIndex + 1, 0, max);
                      setActiveIndex(next);
                      queueMicrotask(() => itemRefs.current[next]?.focus());
                      return;
                    }
                    if (e.key === "ArrowUp") {
                      e.preventDefault();
                      const next = clamp(activeIndex - 1, 0, max);
                      setActiveIndex(next);
                      queueMicrotask(() => itemRefs.current[next]?.focus());
                      return;
                    }
                    if (e.key === "Home") {
                      e.preventDefault();
                      setActiveIndex(0);
                      queueMicrotask(() => itemRefs.current[0]?.focus());
                      return;
                    }
                    if (e.key === "End") {
                      e.preventDefault();
                      setActiveIndex(max);
                      queueMicrotask(() => itemRefs.current[max]?.focus());
                    }
                  }}
                  className={[
                    "rounded-md border px-3 py-2 text-left text-sm font-medium",
                    isActive
                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                      : "border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
                  ].join(" ")}
                >
                  {it.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}


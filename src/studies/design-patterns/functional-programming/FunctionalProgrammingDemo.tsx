"use client";

import { useMemo, useReducer, useState } from "react";
import { initialState, reducer } from "./reducer";

export function FunctionalProgrammingDemo() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [label, setLabel] = useState("");

  const stats = useMemo(() => {
    const total = state.items.length;
    const done = state.items.reduce((acc, it) => acc + (it.done ? 1 : 0), 0);
    return { total, done, remaining: total - done };
  }, [state.items]);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          FP focus
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>
            The reducer is a <span className="font-medium">pure function</span>.
          </li>
          <li>
            Updates are <span className="font-medium">immutable</span> (
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
              map / filter / spread
            </code>
            ).
          </li>
          <li>
            Derived data uses a pure calculation (
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
              reduce
            </code>
            ).
          </li>
        </ul>
      </div>

      <form
        className="flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "add", label });
          setLabel("");
        }}
      >
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Add a new item…"
          className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:ring-zinc-700"
        />
        <button
          type="submit"
          className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
        >
          Add
        </button>
      </form>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Total: {stats.total} · Done: {stats.done} · Remaining: {stats.remaining}
        </p>
        <button
          type="button"
          onClick={() => dispatch({ type: "clearDone" })}
          className="rounded-md border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
        >
          Clear done
        </button>
      </div>

      <ul className="space-y-2">
        {state.items.map((it) => (
          <li
            key={it.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 p-3 dark:border-zinc-800"
          >
            <button
              type="button"
              onClick={() => dispatch({ type: "toggle", id: it.id })}
              className="flex flex-1 items-center gap-3 text-left"
            >
              <span
                aria-hidden="true"
                className={[
                  "grid size-5 place-items-center rounded border text-[10px] font-bold",
                  it.done
                    ? "border-emerald-600 bg-emerald-600 text-white dark:border-emerald-500 dark:bg-emerald-500"
                    : "border-zinc-300 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400",
                ].join(" ")}
              >
                {it.done ? "✓" : ""}
              </span>
              <span
                className={[
                  "text-sm",
                  it.done
                    ? "text-zinc-400 line-through dark:text-zinc-500"
                    : "text-zinc-800 dark:text-zinc-200",
                ].join(" ")}
              >
                {it.label}
              </span>
            </button>

            <button
              type="button"
              onClick={() => dispatch({ type: "remove", id: it.id })}
              className="rounded-md border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900/40"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


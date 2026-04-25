"use client";

import { useId, useState } from "react";

type AnnouncementTone = "polite" | "assertive";

export function ScreenReaderBehaviorDemo() {
  const labelId = useId();
  const hintId = useId();

  const [nameMode, setNameMode] = useState<"visible" | "aria-label" | "aria-labelledby">("visible");
  const [tone, setTone] = useState<AnnouncementTone>("polite");
  const [message, setMessage] = useState("");
  const [statusText, setStatusText] = useState("No announcements yet.");
  const [alertText, setAlertText] = useState("");

  function announce() {
    const trimmed = message.trim();
    if (!trimmed) return;

    if (tone === "polite") {
      setStatusText(trimmed);
      setAlertText("");
    } else {
      setAlertText(trimmed);
      setStatusText("No announcements yet.");
    }
    setMessage("");
  }

  const buttonProps =
    nameMode === "aria-label"
      ? { "aria-label": "Add item" }
      : nameMode === "aria-labelledby"
        ? { "aria-labelledby": labelId }
        : {};

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Accessible name (what gets announced)
        </p>

        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Pick a naming strategy and inspect what a screen reader announces for the button.
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {(["visible", "aria-label", "aria-labelledby"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setNameMode(m)}
              className={[
                "rounded-md px-3 py-2 text-sm font-medium",
                nameMode === m
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                  : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
              ].join(" ")}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span id={labelId} className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            Add item
          </span>

          <button
            type="button"
            {...buttonProps}
            aria-describedby={hintId}
            className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
          >
            {nameMode === "visible" ? "Add item" : "+"}
          </button>

          <span id={hintId} className="text-xs text-zinc-500 dark:text-zinc-400">
            Hint (via <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-900">aria-describedby</code>): adds a
            new row to the list.
          </span>
        </div>
      </section>

      <section className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Live regions (announce without moving focus)
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Use{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-900">role=&quot;status&quot;</code> (polite) for
          non-urgent updates and{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-900">role=&quot;alert&quot;</code>{" "}
          (assertive) for urgent errors.
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setTone("polite")}
            className={[
              "rounded-md px-3 py-2 text-sm font-medium",
              tone === "polite"
                ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
            ].join(" ")}
          >
            Polite (status)
          </button>
          <button
            type="button"
            onClick={() => setTone("assertive")}
            className={[
              "rounded-md px-3 py-2 text-sm font-medium",
              tone === "assertive"
                ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
            ].join(" ")}
          >
            Assertive (alert)
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Message
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full min-w-[260px] rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              placeholder='e.g. "Saved changes"'
            />
          </label>
          <button
            type="button"
            onClick={announce}
            className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
          >
            Announce
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Status region</p>
            <div role="status" aria-live="polite" className="mt-2 text-sm text-zinc-900 dark:text-zinc-50">
              {statusText}
            </div>
          </div>
          <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Alert region</p>
            <div role="alert" aria-live="assertive" className="mt-2 text-sm text-zinc-900 dark:text-zinc-50">
              {alertText || "No alerts."}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


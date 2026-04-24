"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type Mode = "effect" | "layout";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function UseLayoutEffectDemo() {
  const [mode, setMode] = useState<Mode>("layout");
  const [text, setText] = useState("Measure me and fit the font size.");

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Advanced concepts
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          This demo measures the container width and adjusts font size to fit the text.
          Toggle between <span className="font-medium">useEffect</span> and{" "}
          <span className="font-medium">useLayoutEffect</span>.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setMode("layout")}
          className={[
            "rounded-md px-3 py-2 text-sm font-medium",
            mode === "layout"
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
          ].join(" ")}
        >
          useLayoutEffect
        </button>
        <button
          type="button"
          onClick={() => setMode("effect")}
          className={[
            "rounded-md px-3 py-2 text-sm font-medium",
            mode === "effect"
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
          ].join(" ")}
        >
          useEffect
        </button>
      </div>

      <label className="grid gap-2">
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
          Text
        </span>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:ring-zinc-700"
        />
      </label>

      <FitTextCard mode={mode} text={text} />
    </div>
  );
}

function FitTextCard({ mode, text }: { mode: Mode; text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(22);
  const [lastMeasuredWidth, setLastMeasuredWidth] = useState<number | null>(null);

  const Effect = mode === "layout" ? useLayoutEffect : useEffect;

  const hint = useMemo(() => {
    return mode === "layout"
      ? "Layout effect runs before paint (good for measurements that affect layout)."
      : "Effect runs after paint (can show a brief mismatch/flicker).";
  }, [mode]);

  Effect(() => {
    const el = containerRef.current;
    if (!el) return;

    const width = el.getBoundingClientRect().width;
    setLastMeasuredWidth(width);

    // Very rough "fit": scale font size by available width vs text length.
    const next = clamp(Math.floor((width / Math.max(10, text.length)) * 2.6), 12, 30);
    setFontSize(next);
  }, [text]);

  return (
    <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          FitText ({mode})
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{hint}</p>
      </div>

      <div
        ref={containerRef}
        className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
      >
        <p
          className="font-semibold text-zinc-900 dark:text-zinc-50"
          style={{ fontSize }}
        >
          {text}
        </p>
      </div>

      <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
        Measured width:{" "}
        <span className="font-medium">
          {lastMeasuredWidth ? `${Math.round(lastMeasuredWidth)}px` : "—"}
        </span>{" "}
        · Font size: <span className="font-medium">{fontSize}px</span>
      </p>
    </div>
  );
}


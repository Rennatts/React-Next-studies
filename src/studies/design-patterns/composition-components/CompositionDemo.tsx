"use client";

import { useState } from "react";
import { Card } from "./Card";

export function CompositionDemo() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="space-y-4">
      <Card
        header={
          <div className="space-y-1">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              A composable card
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Header / actions / body / footer are “slots”
            </p>
          </div>
        }
        actions={
          <button
            type="button"
            onClick={() => setEnabled((v) => !v)}
            className={[
              "rounded-md px-3 py-2 text-xs font-medium",
              enabled
                ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40",
            ].join(" ")}
          >
            {enabled ? "Enabled" : "Disabled"}
          </button>
        }
        footer={
          <span>
            The parent decides what goes into each slot—no inheritance needed.
          </span>
        }
      >
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          This is the <span className="font-medium">children</span> slot. Any UI
          can be placed here: forms, lists, or other components.
        </p>
      </Card>

      <Card
        header={
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Same building block, different assembly
          </p>
        }
      >
        <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>Omit actions if you don’t need them.</li>
          <li>Swap the footer content freely.</li>
          <li>Keep the component generic and reusable.</li>
        </ul>
      </Card>
    </div>
  );
}


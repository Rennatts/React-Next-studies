"use client";

import { useState } from "react";
import { PortalModal } from "./PortalModal";

export function ReactPortalsDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Advanced concepts
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          This demo opens a modal rendered via a <span className="font-medium">portal</span>{" "}
          into <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">document.body</code>.
          It avoids clipping/stacking issues that happen when overlays are nested inside containers.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Clipping container (simulated)
        </p>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          The container below has <code className="rounded bg-zinc-100 px-1 py-0.5 text-[11px] dark:bg-zinc-900">overflow-hidden</code>.
          A normal (non-portal) modal would often be constrained by it.
        </p>

        <div className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="overflow-hidden rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              Content inside a clipped container.
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-3 rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
            >
              Open modal (portal)
            </button>
          </div>
        </div>
      </div>

      <PortalModal
        open={open}
        title="Hello from a portal"
        onClose={() => setOpen(false)}
      >
        <p>
          Even though this modal is triggered from inside a nested container, its DOM nodes live
          under <span className="font-medium">document.body</span>.
        </p>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          Tip: press <span className="font-medium">Esc</span> to close.
        </p>
      </PortalModal>
    </div>
  );
}


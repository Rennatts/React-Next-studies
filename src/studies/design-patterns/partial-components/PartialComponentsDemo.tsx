"use client";

import { useState } from "react";
import { Button } from "./Button";
import { partial } from "./partial";

const PrimaryButton = partial(Button, { variant: "primary" as const });
const DangerButton = partial(Button, { variant: "danger" as const });
const SmallButton = partial(Button, { size: "sm" as const });
const SmallPrimaryButton = partial(PrimaryButton, { size: "sm" as const });

export function PartialComponentsDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Partial components
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          These buttons are created by <span className="font-medium">pre-filling</span>{" "}
          props on a generic <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">Button</code>.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <PrimaryButton onClick={() => setCount((c) => c + 1)}>
          Primary (+1)
        </PrimaryButton>
        <DangerButton onClick={() => setCount((c) => c - 1)}>
          Danger (−1)
        </DangerButton>
        <SmallButton onClick={() => setCount(0)}>Small reset</SmallButton>
        <SmallPrimaryButton onClick={() => setCount((c) => c + 10)}>
          Small primary (+10)
        </SmallPrimaryButton>
      </div>

      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          Count:{" "}
          <span className="font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
            {count}
          </span>
        </p>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          Note: preset components reduce repetition and make intent clearer at the call site.
        </p>
      </div>
    </div>
  );
}


"use client";

import { useState } from "react";
import { Card } from "./Card";
import { Tabs, TabsList, TabsPanel, TabsTrigger } from "./Tabs";

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

      <Card
        header={
          <div className="space-y-1">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Compound components (composition)
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              The parent composes <code className="rounded bg-zinc-100 px-1 py-0.5 text-[11px] dark:bg-zinc-900">Tabs</code>{" "}
              from small parts.
            </p>
          </div>
        }
      >
        <Tabs defaultValue="why">
          <TabsList>
            <TabsTrigger value="why">Why</TabsTrigger>
            <TabsTrigger value="how">How</TabsTrigger>
            <TabsTrigger value="when">When</TabsTrigger>
          </TabsList>

          <div className="mt-3 space-y-3">
            <TabsPanel value="why">
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                Compound components are a composition style where a parent
                controls shared state (via context) and children declare the UI
                structure.
              </p>
            </TabsPanel>
            <TabsPanel value="how">
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                <span className="font-medium">Tabs</span> provides context,{" "}
                <span className="font-medium">Triggers</span> update it, and{" "}
                <span className="font-medium">Panels</span> render based on the
                current value.
              </p>
            </TabsPanel>
            <TabsPanel value="when">
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                Use this when you want a flexible API that lets callers arrange
                the parts freely while the component manages internal wiring.
              </p>
            </TabsPanel>
          </div>
        </Tabs>
      </Card>
    </div>
  );
}


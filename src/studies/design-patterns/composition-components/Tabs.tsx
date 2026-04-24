"use client";

import {
  createContext,
  useContext,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type TabsContextValue = {
  baseId: string;
  value: string;
  setValue: (v: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used within <Tabs>.");
  return ctx;
}

export function Tabs({
  defaultValue,
  children,
}: {
  defaultValue: string;
  children: ReactNode;
}) {
  const baseId = useId();
  const [value, setValue] = useState(defaultValue);

  const ctx = useMemo<TabsContextValue>(() => ({ baseId, value, setValue }), [baseId, value]);

  return <TabsContext.Provider value={ctx}>{children}</TabsContext.Provider>;
}

export function TabsList({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap gap-2 rounded-lg bg-zinc-50 p-2 dark:bg-zinc-900/40">
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children }: { value: string; children: ReactNode }) {
  const ctx = useTabsContext();
  const selected = ctx.value === value;
  const tabId = `${ctx.baseId}-tab-${value}`;
  const panelId = `${ctx.baseId}-panel-${value}`;

  return (
    <button
      id={tabId}
      type="button"
      role="tab"
      aria-selected={selected}
      aria-controls={panelId}
      onClick={() => ctx.setValue(value)}
      className={[
        "rounded-md px-3 py-2 text-xs font-medium",
        selected
          ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
          : "border border-zinc-200 text-zinc-800 hover:bg-white dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-950",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function TabsPanel({ value, children }: { value: string; children: ReactNode }) {
  const ctx = useTabsContext();
  const selected = ctx.value === value;
  const tabId = `${ctx.baseId}-tab-${value}`;
  const panelId = `${ctx.baseId}-panel-${value}`;

  if (!selected) return null;

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
    >
      {children}
    </div>
  );
}


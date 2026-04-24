"use client";

import {
  createContext,
  useContext,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AccordionContextValue = {
  baseId: string;
  openItem: string | null;
  setOpenItem: (id: string | null) => void;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion components must be used within <Accordion>.");
  return ctx;
}

export function Accordion({
  defaultOpenItem = null,
  children,
}: {
  defaultOpenItem?: string | null;
  children: ReactNode;
}) {
  const baseId = useId();
  const [openItem, setOpenItem] = useState<string | null>(defaultOpenItem);

  const ctx = useMemo<AccordionContextValue>(
    () => ({ baseId, openItem, setOpenItem }),
    [baseId, openItem],
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <div className="space-y-2">{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  const { openItem } = useAccordionContext();
  const open = openItem === value;
  return (
    <section
      data-open={open ? "true" : "false"}
      className="rounded-xl border border-zinc-200 dark:border-zinc-800"
    >
      {children}
    </section>
  );
}

export function AccordionTrigger({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  const { baseId, openItem, setOpenItem } = useAccordionContext();
  const open = openItem === value;
  const buttonId = `${baseId}-trigger-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  return (
    <button
      id={buttonId}
      type="button"
      aria-expanded={open}
      aria-controls={panelId}
      onClick={() => setOpenItem(open ? null : value)}
      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
    >
      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="grid size-7 place-items-center rounded-md border border-zinc-200 text-xs font-bold text-zinc-600 dark:border-zinc-800 dark:text-zinc-300"
      >
        {open ? "−" : "+"}
      </span>
    </button>
  );
}

export function AccordionPanel({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  const { baseId, openItem } = useAccordionContext();
  const open = openItem === value;
  const buttonId = `${baseId}-trigger-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  if (!open) return null;

  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={buttonId}
      className="border-t border-zinc-200 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300"
    >
      {children}
    </div>
  );
}


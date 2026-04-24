"use client";

import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "./Accordion";

export function CompoundComponentsDemo() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Compound components
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          The parent <span className="font-medium">Accordion</span> owns state and wiring.
          Children compose the structure: items, triggers, and panels.
        </p>
      </div>

      <Accordion defaultOpenItem="what">
        <AccordionItem value="what">
          <AccordionTrigger value="what">What is the pattern?</AccordionTrigger>
          <AccordionPanel value="what">
            A parent component shares state through context. Subcomponents read it
            to coordinate without prop drilling.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem value="why">
          <AccordionTrigger value="why">Why use it?</AccordionTrigger>
          <AccordionPanel value="why">
            It creates a flexible API: callers can reorder parts and customize layout
            while the component maintains internal behavior.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem value="caveats">
          <AccordionTrigger value="caveats">Caveats</AccordionTrigger>
          <AccordionPanel value="caveats">
            Context updates can re-render many children; keep the API small and consider
            memoization for large trees.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}


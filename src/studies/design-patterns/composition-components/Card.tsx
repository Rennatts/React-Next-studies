"use client";

import type { ReactNode } from "react";

export type CardProps = {
  header?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export function Card({ header, actions, children, footer }: CardProps) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      {(header || actions) && (
        <header className="flex items-start justify-between gap-3">
          <div className="min-w-0">{header}</div>
          <div className="shrink-0">{actions}</div>
        </header>
      )}

      <div className={(header || actions) ? "mt-3" : ""}>{children}</div>

      {footer ? (
        <footer className="mt-4 border-t border-zinc-200 pt-3 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          {footer}
        </footer>
      ) : null}
    </section>
  );
}


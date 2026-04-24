"use client";

import { useId, useState } from "react";

export function UseIdDemo() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Advanced concepts
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            useId
          </code>{" "}
          is great for wiring accessible labels and ARIA relationships without causing
          SSR hydration mismatches.
        </p>
      </div>

      <Field
        label="Name"
        value={name}
        onChange={setName}
        help="This label is connected to the input via htmlFor/id."
      />
      <Field
        label="Email"
        value={email}
        onChange={setEmail}
        help="Help text is connected via aria-describedby."
      />

      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Current state
        </p>
        <pre className="mt-2 whitespace-pre-wrap text-xs text-zinc-700 dark:text-zinc-300">
          {JSON.stringify({ name, email }, null, 2)}
        </pre>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  help,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  help: string;
}) {
  const baseId = useId();
  const inputId = `${baseId}-input`;
  const helpId = `${baseId}-help`;

  return (
    <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <label
        htmlFor={inputId}
        className="text-xs font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
      </label>
      <input
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={helpId}
        className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:ring-zinc-700"
      />
      <p id={helpId} className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        {help}
      </p>
    </div>
  );
}


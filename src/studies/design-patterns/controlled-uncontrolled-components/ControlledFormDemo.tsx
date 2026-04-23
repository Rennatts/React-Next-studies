"use client";

import { useMemo, useState } from "react";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function ControlledFormDemo() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const emailOk = useMemo(() => email.length === 0 || isValidEmail(email), [email]);
  const canSubmit = name.trim().length > 0 && isValidEmail(email);

  return (
    <div className="space-y-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Controlled
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          React state is the source of truth
        </p>
      </div>

      <div className="grid gap-3">
        <label className="grid gap-1">
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Name
          </span>
          <input
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:ring-zinc-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ada Lovelace"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Email
          </span>
          <input
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:ring-zinc-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ada@example.com"
            inputMode="email"
          />
        </label>

        {!emailOk ? (
          <p className="text-xs text-rose-600 dark:text-rose-400">
            Enter a valid email.
          </p>
        ) : null}

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={!canSubmit}
            className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-50 dark:text-zinc-900"
            onClick={() => {
              // In a real form you would submit here.
              // We keep this as a demo: controlled state is already in JS.
              alert(`Submitted: ${name.trim()} <${email.trim()}>`);
            }}
          >
            Submit
          </button>
          <button
            type="button"
            className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
            onClick={() => {
              setName("");
              setEmail("");
            }}
          >
            Reset
          </button>
        </div>

        <div className="rounded-lg bg-zinc-50 px-3 py-2 text-xs text-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-300">
          <p>
            <span className="font-medium">Current state:</span>{" "}
            {JSON.stringify({ name, email })}
          </p>
        </div>
      </div>
    </div>
  );
}


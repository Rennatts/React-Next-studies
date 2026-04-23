"use client";

import { useRef, useState } from "react";

export function UncontrolledFormDemo() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [lastSubmitted, setLastSubmitted] = useState<{ name: string; email: string } | null>(
    null,
  );

  return (
    <div className="space-y-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Uncontrolled
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          DOM holds the current value
        </p>
      </div>

      <form
        className="grid gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          const name = nameRef.current?.value ?? "";
          const email = emailRef.current?.value ?? "";
          setLastSubmitted({ name: name.trim(), email: email.trim() });
        }}
      >
        <label className="grid gap-1">
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Name
          </span>
          <input
            ref={nameRef}
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:ring-zinc-700"
            placeholder="Ada Lovelace"
            name="name"
            defaultValue=""
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Email
          </span>
          <input
            ref={emailRef}
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:ring-zinc-700"
            placeholder="ada@example.com"
            name="email"
            inputMode="email"
            defaultValue=""
          />
        </label>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
          >
            Submit
          </button>
          <button
            type="reset"
            className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
            onClick={() => setLastSubmitted(null)}
          >
            Reset
          </button>
        </div>

        <div className="rounded-lg bg-zinc-50 px-3 py-2 text-xs text-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-300">
          <p className="font-medium">Last submitted:</p>
          <pre className="mt-1 whitespace-pre-wrap">
            {JSON.stringify(lastSubmitted, null, 2)}
          </pre>
        </div>
      </form>
    </div>
  );
}


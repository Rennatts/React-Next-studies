"use client";

import { useState } from "react";

const DEMO_URL = "/studies/next-server/route-handlers/demo";

export function RouteHandlersPostDemo() {
  const [out, setOut] = useState<string>("");
  const [pending, setPending] = useState(false);

  async function sendPost() {
    setPending(true);
    setOut("");
    try {
      const res = await fetch(DEMO_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hello: "from browser", at: Date.now() }),
      });
      const text = await res.text();
      setOut(`${res.status} ${res.statusText}\n${text}`);
    } catch (e) {
      setOut(String(e));
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-2 rounded-xl border border-violet-200 bg-violet-50/90 p-4 text-sm dark:border-violet-900 dark:bg-violet-950/40">
      <p className="font-medium text-violet-950 dark:text-violet-100">Client → Route Handler (<code className="font-mono text-xs">POST</code>)</p>
      <p className="text-xs text-violet-900/90 dark:text-violet-200/90">
        Calls <code className="font-mono">{DEMO_URL}</code> with a JSON body.
      </p>
      <button
        type="button"
        disabled={pending}
        className="rounded-md bg-violet-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-800 disabled:opacity-50 dark:bg-violet-200 dark:text-violet-950 dark:hover:bg-violet-100"
        onClick={sendPost}
      >
        {pending ? "Posting…" : "POST JSON to demo route"}
      </button>
      {out ? (
        <pre className="max-h-40 overflow-auto rounded border border-violet-200 bg-white p-2 text-[11px] dark:border-violet-800 dark:bg-zinc-950">
          {out}
        </pre>
      ) : null}
    </div>
  );
}

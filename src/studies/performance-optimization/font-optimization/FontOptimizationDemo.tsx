import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
});

/**
 * Second `next/font` instance on the same route — colocated with the demo UI.
 */
export function FontOptimizationDemo() {
  return (
    <div className="space-y-3">
      <div
        className={`space-y-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/40 ${mono.className}`}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
          JetBrains Mono — loaded in this file
        </p>
        <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
          Use a dedicated monospace font for code samples so readers see clear distinction from body copy.
        </p>
        <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-white p-3 text-[12px] leading-snug text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
          <code>{`export async function GET() {
  return Response.json({ ok: true });
}`}</code>
        </pre>
      </div>
    </div>
  );
}

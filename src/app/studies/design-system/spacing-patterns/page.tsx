import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study: Design system — spacing patterns",
  description:
    "Spacing patterns: layers through cover—viewport shells, flex-1 main, dvh, aspect frames, gap vs padding vs margin.",
};

export default function SpacingPatternsPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Design system
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Spacing patterns
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Full notes in{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            src/studies/design-system/spacing-patterns/README.md
          </code>
          . Covers <strong className="text-zinc-900 dark:text-zinc-100">layers</strong>,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">split</strong>,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">columns</strong> (inline gutters), and{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">grid</strong> (2D gaps, layout grid vs CSS Grid),{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">inline</strong> (typographic line-box flow), and{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">inline-bundle</strong> (flex clusters with one{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">gap</code>,{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">pad</strong> (border-to-content inset,
          symmetric vs squish), and <strong className="text-zinc-900 dark:text-zinc-100">center</strong>{" "}
          (max-width + <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">mx-auto</code>
          ){" "}
          and <strong className="text-zinc-900 dark:text-zinc-100">media-wrapper</strong> (aspect
          frame + <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            object-fit
          </code>
          ){" "}
          and <strong className="text-zinc-900 dark:text-zinc-100">cover</strong> (min-height shell
          with <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">flex-1</code>{" "}
          main); more rhythm notes can extend the same folder later.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studies/design-system"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Overview
          </Link>
          <Link
            href="/studies/design-system/key-concepts"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Key concepts
          </Link>
          <Link
            href="/studies/design-system/style-composition"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Style composition
          </Link>
          <Link
            href="/"
            className="inline-flex text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            ← Study index
          </Link>
        </div>
      </header>

      <article className="space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          The README contrasts a raw <strong className="text-zinc-900 dark:text-zinc-100">spacing scale</strong> with{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">semantic roles</strong> tied to layout hierarchy: page
          shell, region inset, clusters of related controls, stack gaps between siblings, and micro spacing inside
          controls. It also recommends parent-owned <strong className="text-zinc-900 dark:text-zinc-100">gap</strong> for
          stacks and warns against pushing page-level margins into leaf components.
        </p>
        <p>
          The <strong className="text-zinc-900 dark:text-zinc-100">split</strong> section documents two grouped
          clusters on one row, flex recipes (<code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            space-between
          </code>{" "}
          vs{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
            margin-inline-start: auto
          </code>
          ), overflow and truncation, RTL-safe alignment, and anti-patterns like five loose siblings on{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">space-between</code>.
        </p>
        <p>
          The <strong className="text-zinc-900 dark:text-zinc-100">columns</strong> section covers gutter
          tokens, parent <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">gap</code>{" "}
          vs per-item margins, a small <strong className="text-zinc-900 dark:text-zinc-100">columns vs split</strong>{" "}
          comparison table, breakpoints and min track widths, and when not to misuse split for a two-column form.
        </p>
        <p>
          The <strong className="text-zinc-900 dark:text-zinc-100">grid</strong> section ties{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">layout grids</strong> (margins, gutters, keylines) to{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">CSS Grid</strong>{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">gap</code> / row vs column roles,
          spanning, a <strong className="text-zinc-900 dark:text-zinc-100">grid vs columns</strong> contrast, and when
          a simple stack is enough.
        </p>
        <p>
          The <strong className="text-zinc-900 dark:text-zinc-100">inline</strong> section is for{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">line-box</strong> spacing next to running text:
          baseline and <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">vertical-align</code>
          , tokenized margins vs flex <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">gap</code>
          , React whitespace gotchas, and an <strong className="text-zinc-900 dark:text-zinc-100">inline vs inline-bundle</strong>{" "}
          table plus <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">inline-flex</code> as a
          bridge.
        </p>
        <p>
          The <strong className="text-zinc-900 dark:text-zinc-100">inline-bundle</strong> section is the flex-level
          contract for chip rows and compact groups: one internal{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">gap</code>, separation from
          neighbors owned by the parent, plus comparisons to split and columns and notes on wrap, overflow, and{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">{"role=\"group\""}</code>.
        </p>
      </article>
    </div>
  );
}

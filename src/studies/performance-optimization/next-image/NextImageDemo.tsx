import Image from "next/image";

function remote(id: number, w: number, h: number) {
  return `https://picsum.photos/id/${id}/${w}/${h}`;
}

/**
 * Server Component: live `next/image` examples (remote URLs allowed in next.config.mjs).
 */
export function NextImageDemo() {
  return (
    <div className="space-y-10">
      <figure className="space-y-2">
        <figcaption className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          LCP-style hero — <code className="text-[11px]">priority</code> + explicit{" "}
          <code className="text-[11px]">width</code>/<code className="text-[11px]">height</code>
        </figcaption>
        <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
          <Image
            src={remote(29, 800, 450)}
            width={800}
            height={450}
            priority
            alt="Mountain landscape (sample photo)"
            className="h-auto w-full bg-zinc-100 object-cover dark:bg-zinc-900"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
      </figure>

      <figure className="space-y-2">
        <figcaption className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Lazy below the fold — default lazy loading, smaller intrinsic size
        </figcaption>
        <div className="flex flex-wrap gap-4">
          <Image
            src={remote(15, 280, 200)}
            width={280}
            height={200}
            alt="Beach rocks"
            className="rounded-lg border border-zinc-200 dark:border-zinc-700"
          />
          <Image
            src={remote(28, 280, 200)}
            width={280}
            height={200}
            alt="Forest path"
            className="rounded-lg border border-zinc-200 dark:border-zinc-700"
          />
        </div>
      </figure>

      <figure className="space-y-2">
        <figcaption className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <code className="text-[11px]">fill</code> + <code className="text-[11px]">object-cover</code> — parent sets
          height; <code className="text-[11px]">sizes</code> matches max width
        </figcaption>
        <div className="relative h-44 max-w-md overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
          <Image
            src={remote(237, 800, 600)}
            alt="Dog portrait in grass"
            fill
            sizes="(max-width: 768px) 100vw, 448px"
            className="object-cover"
          />
        </div>
      </figure>

      <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
        Remote host <code className="text-[11px]">picsum.photos</code> is allowlisted in{" "}
        <code className="text-[11px]">next.config.mjs</code> (<code className="text-[11px]">images.remotePatterns</code>
        ). Add your CDN the same way before using production URLs.
      </p>
    </div>
  );
}

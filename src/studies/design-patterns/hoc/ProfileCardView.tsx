"use client";

export type ProfileCardViewProps = {
  userId: string;
  title: string;
};

export function ProfileCardView({ userId, title }: ProfileCardViewProps) {
  return (
    <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {title}
      </p>
      <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
        User id:{" "}
        <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
          {userId}
        </code>
      </p>
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        This view is “dumb”: it only renders props. The HOC provides the{" "}
        <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
          userId
        </code>
        .
      </p>
    </div>
  );
}


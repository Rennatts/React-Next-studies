"use client";

import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "neutral" | "danger";
  size?: "sm" | "md";
};

export function Button({
  variant = "neutral",
  size = "md",
  className,
  ...rest
}: ButtonProps) {
  const base =
    "rounded-md font-medium transition disabled:cursor-not-allowed disabled:opacity-40";
  const sizing = size === "sm" ? "px-3 py-2 text-xs" : "px-3 py-2 text-sm";

  const styles =
    variant === "primary"
      ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
      : variant === "danger"
        ? "bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600"
        : "border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900/40";

  return (
    <button
      {...rest}
      className={[base, sizing, styles, className].filter(Boolean).join(" ")}
    />
  );
}


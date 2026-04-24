import type { ButtonHTMLAttributes, ReactNode } from "react";

export type SystemButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type SystemButtonSize = "sm" | "md" | "lg";

export type SystemButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Visual style; maps to design tokens in a full system. */
  variant?: SystemButtonVariant;
  size?: SystemButtonSize;
  /** Shows busy state and blocks repeat submits; sets `aria-busy`. */
  loading?: boolean;
  children: ReactNode;
};

const variantClass: Record<SystemButtonVariant, string> = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-950 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:active:bg-zinc-300",
  secondary:
    "border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:active:bg-zinc-950",
  ghost:
    "text-zinc-800 hover:bg-zinc-100 active:bg-zinc-200 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:active:bg-zinc-900",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500",
};

const sizeClass: Record<SystemButtonSize, string> = {
  sm: "min-h-8 px-3 text-xs rounded-md",
  md: "min-h-10 px-4 text-sm rounded-md",
  lg: "min-h-12 px-5 text-base rounded-lg",
};

const focusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-950";

/**
 * Study implementation of a design-system-style Button (subset of README contract).
 */
export function SystemButton({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className = "",
  children,
  type = "button",
  ...rest
}: SystemButtonProps) {
  const isDisabled = Boolean(disabled || loading);

  return (
    <button
      {...rest}
      type={type ?? "button"}
      className={[
        "inline-flex items-center justify-center gap-2 font-medium transition-colors",
        "disabled:pointer-events-none disabled:opacity-50",
        variantClass[variant],
        sizeClass[size],
        focusClass,
        className,
      ].join(" ")}
      disabled={isDisabled}
      aria-busy={loading || undefined}
    >
      {loading ? (
        <span
          className="inline-block size-3.5 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden
        />
      ) : null}
      <span className={loading ? "opacity-90" : undefined}>{children}</span>
    </button>
  );
}

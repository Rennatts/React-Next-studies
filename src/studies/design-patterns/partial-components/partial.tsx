"use client";

import type { ComponentType } from "react";

type Without<T, K extends keyof T> = Omit<T, K>;

/**
 * Create a "partial component" by pre-filling some props.
 * The returned component's public props omit the prefilled keys.
 */
export function partial<P extends object, Fixed extends Partial<P>>(
  Component: ComponentType<P>,
  fixed: Fixed,
) {
  return function PartialComponent(props: Without<P, keyof Fixed>) {
    return <Component {...(fixed as P)} {...(props as P)} />;
  };
}


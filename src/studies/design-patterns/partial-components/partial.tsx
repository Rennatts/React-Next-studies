"use client";

import type { ComponentType } from "react";

type Without<T, K extends keyof T> = Omit<T, K>;

type PrefilledKeys<P extends object, Fixed extends Partial<P>> = Extract<keyof Fixed, keyof P>;

/**
 * Create a "partial component" by pre-filling some props.
 * The returned component's public props omit the prefilled keys.
 */
export function partial<P extends object, Fixed extends Partial<P>>(
  Component: ComponentType<P>,
  fixed: Fixed,
) {
  return function PartialComponent(props: Without<P, PrefilledKeys<P, Fixed>>) {
    return <Component {...(fixed as unknown as P)} {...(props as P)} />;
  };
}


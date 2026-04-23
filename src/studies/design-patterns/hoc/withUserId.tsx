"use client";

import { useId } from "react";

type Without<T, K extends keyof T> = Omit<T, K>;

/**
 * Injects a stable `userId` and hides it from the public props.
 * This is a good “TypeScript-friendly” HOC shape: callers can't pass `userId`.
 */
export function withUserId<P extends { userId: string }>(
  Component: React.ComponentType<P>,
) {
  function WithUserId(props: Without<P, "userId">) {
    const reactId = useId();
    const userId = `user_${reactId.replace(/:/g, "")}`;
    return <Component {...(props as P)} userId={userId} />;
  }

  WithUserId.displayName = `withUserId(${Component.displayName ?? Component.name ?? "Component"})`;

  return WithUserId;
}


"use client";

import React from "react";
import type { ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: (args: { error: Error; reset: () => void }) => ReactNode;
};

type ErrorBoundaryState = {
  error: Error | null;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error) {
    // This is a demo boundary; real apps often log to monitoring here.
    // eslint-disable-next-line no-console
    console.error("ErrorBoundary caught:", error);
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    if (this.props.fallback) return this.props.fallback({ error, reset: this.reset });

    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-100">
        <p className="text-sm font-semibold">Something went wrong.</p>
        <p className="mt-2 text-xs opacity-80">{error.message}</p>
        <button
          type="button"
          onClick={this.reset}
          className="mt-3 rounded-md bg-rose-600 px-3 py-2 text-xs font-medium text-white hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600"
        >
          Reset boundary
        </button>
      </div>
    );
  }
}


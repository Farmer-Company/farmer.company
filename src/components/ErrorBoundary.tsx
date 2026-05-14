import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorInfo: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    let errorInfo = error.message;

    // Check if it's a JSON string from our Firestore error handler
    try {
      const parsed = JSON.parse(error.message);
      if (parsed.error && parsed.operationType) {
        errorInfo = `Firestore ${parsed.operationType.toUpperCase()} error at ${parsed.path || "unknown path"}: ${parsed.error}`;
      }
    } catch (e) {
      // Not JSON, use raw message
    }

    return { hasError: true, errorInfo };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-red/5 border border-red/20 rounded-none">
          <h2 className="display text-2xl font-semibold text-red mb-4">
            Something went wrong.
          </h2>
          <p className="mono text-sm text-foreground/60 max-w-md">
            {this.state.errorInfo || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, errorInfo: null })}
            className="mt-6 px-6 py-2 bg-red text-white mono text-xs normal-case hover:bg-red/90 transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

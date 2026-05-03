'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import PropTypes from 'prop-types';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center animate-in fade-in duration-500">
          <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-8 rounded-r-xl shadow-lg max-w-2xl w-full">
            <span className="text-5xl mb-4 block" aria-hidden="true">
              ⚠️
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Something went wrong.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6 font-medium">
              We&apos;re sorry, but an unexpected error occurred while loading
              this page.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="bg-civic-blue text-white font-bold py-2 px-6 rounded hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

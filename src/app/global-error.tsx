'use client';

import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="max-w-md w-full mx-auto text-center px-6">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-10 w-10 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold mb-4">Application Error</h1>
              <p className="text-muted-foreground mb-6">
                A critical error occurred in the application. Please refresh the page or contact support if the problem persists.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={reset}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium transition-colors"
              >
                Try Again
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full border border-border hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium transition-colors"
              >
                Go Home
              </button>
            </div>

            {/* Help Text */}
            <div className="mt-8 text-sm text-muted-foreground">
              <p>Error ID: {error.digest || 'Unknown'}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

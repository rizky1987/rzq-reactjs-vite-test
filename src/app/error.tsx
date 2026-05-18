'use client';

import { useEffect } from 'react';
import { logger } from '@/lib/logger';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    logger.error('Application runtime crash captured by Error Boundary', error, {
      location: 'Global Error Boundary (error.tsx)',
      payload: { 
        digest: error.digest || 'No digest provided',
        message: error.message 
      }
    });
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6 overflow-x-hidden">
      <div className="text-center max-w-md p-8 bg-gray-800 rounded-xl shadow-2xl border border-red-500/20">
        
        {/* Warning Icon Graphic */}
        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-exclamation-triangle text-2xl" />
        </div>
        
        {/* Main Error Messages (English Translaton) */}
        <h2 className="text-2xl font-bold mb-2">Something Went Wrong</h2>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          We apologize for the inconvenience. The application encountered an unexpected technical issue. Our team has been notified of this error.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()} // Mencoba me-render ulang sub-tree komponen yang error
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium rounded-lg text-sm"
          >
            Try Again
          </button>
          <a
            href="/dashboard"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 transition-colors text-gray-200 font-medium rounded-lg text-sm"
          >
            Back to Dashboard
          </a>
        </div>

      </div>
    </div>
  );
}
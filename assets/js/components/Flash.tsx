import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

interface FlashProps {
  onDismiss?: () => void;
}

interface PageProps {
  flash: {
    info?: string;
    error?: string;
  };
  [key: string]: any;
}

export const Flash: React.FC<FlashProps> = ({ onDismiss }) => {
  const { flash } = usePage<PageProps>().props;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (flash.info || flash.error) {
      setVisible(true);
      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        setVisible(false);
        onDismiss?.();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [flash, onDismiss]);

  if (!visible || (!flash.info && !flash.error)) {
    return null;
  }

  const isError = !!flash.error;
  const message = flash.error || flash.info;

  return (
    <div
      className={`fixed top-4 right-4 z-50 rounded-lg p-4 shadow-lg transition-all duration-500 ${
        isError
          ? 'bg-red-50 text-red-900 ring-1 ring-red-500'
          : 'bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500'
      }`}>
      <div className="flex items-start gap-3">
        {isError ? (
          <svg
            className="h-5 w-5 text-red-900"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="h-5 w-5 text-emerald-900"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={() => {
            setVisible(false);
            onDismiss?.();
          }}
          className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex text-emerald-900 hover:bg-emerald-100 focus:ring-2 focus:ring-emerald-400">
          <span className="sr-only">Dismiss</span>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

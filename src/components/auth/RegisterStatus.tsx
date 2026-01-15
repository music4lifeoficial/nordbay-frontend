'use client';

import React from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

export type RegisterStatus = 'idle' | 'loading' | 'success' | 'error';

interface RegisterStatusProps {
  status: RegisterStatus;
  message?: string;
  onRetry?: () => void;
}

export function RegisterStatus({ status, message, onRetry }: RegisterStatusProps) {
  if (status === 'idle') return null;

  const config = {
    loading: {
      icon: Clock,
      className: 'bg-blue-50 border-blue-200 text-blue-800',
      iconClassName: 'text-blue-600',
    },
    success: {
      icon: CheckCircle,
      className: 'bg-green-50 border-green-200 text-green-800',
      iconClassName: 'text-green-600',
    },
    error: {
      icon: AlertCircle,
      className: 'bg-red-50 border-red-200 text-red-800',
      iconClassName: 'text-red-600',
    },
  };

  const { icon: Icon, className, iconClassName } = config[status];

  return (
    <div className={`p-3 rounded-lg border ${className} mt-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 ${iconClassName}`} />
        <div className="flex-1">
          <div className="text-sm font-medium">
            {status === 'loading' && 'Opretter konto...'}
            {status === 'success' && 'Konto oprettet!'}
            {status === 'error' && 'Der opstod en fejl'}
          </div>
          {message && (
            <div className="text-sm mt-1 opacity-90">
              {message}
            </div>
          )}
          {status === 'success' && (
            <div className="text-sm mt-2">
              Tjek din email for at bekræfte din konto før login.
            </div>
          )}
          {status === 'error' && onRetry && (
            <button
              onClick={onRetry}
              className="text-sm underline mt-2 hover:no-underline"
            >
              Prøv igen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterStatus;

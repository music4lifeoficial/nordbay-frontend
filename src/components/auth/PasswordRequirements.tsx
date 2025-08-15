'use client';

import { Check, X } from 'lucide-react';

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const requirements: PasswordRequirement[] = [
  {
    label: 'Mindst 10 tegn',
    test: (pwd) => pwd.length >= 10,
  },
  {
    label: 'Store bogstaver (A-Z)',
    test: (pwd) => /[A-Z]/.test(pwd),
  },
  {
    label: 'Små bogstaver (a-z)',
    test: (pwd) => /[a-z]/.test(pwd),
  },
  {
    label: 'Tal (0-9)',
    test: (pwd) => /\d/.test(pwd),
  },
  {
    label: 'Symbol (@$!%*?&)',
    test: (pwd) => /[@$!%*?&]/.test(pwd),
  },
];

interface PasswordRequirementsProps {
  password: string;
  show: boolean;
}

export function PasswordRequirements({ password, show }: PasswordRequirementsProps) {
  if (!show) return null;

  return (
    <div className="mt-2 p-3 bg-nordic-50 rounded-lg border">
      <h4 className="text-sm font-medium text-nordic-900 mb-2">Adgangskode krav:</h4>
      <ul className="space-y-1">
        {requirements.map((req, index) => {
          const isValid = req.test(password);
          return (
            <li key={index} className="flex items-center gap-2 text-sm">
              {isValid ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <X className="w-4 h-4 text-red-400" />
              )}
              <span className={isValid ? 'text-green-700' : 'text-nordic-600'}>
                {req.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PasswordRequirements;

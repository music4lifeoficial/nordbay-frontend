// AuthWelcome.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/useTranslation';

interface AuthWelcomeProps {
  onEmailRegister?: () => void;
  onSocial?: (provider: 'google' | 'mitid') => void;
}

export const AuthWelcome: React.FC<AuthWelcomeProps> = ({ onEmailRegister, onSocial }) => {
  const t = useTranslation();

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-nordic-900 p-8 rounded-xl shadow-md animate-fade-in flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Image src="/next.svg" alt="NordBay Logo" width={48} height={48} className="mb-2" />
        <h1 className="text-2xl font-bold text-nordic-900 dark:text-white">NordBay</h1>
        <p className="text-nordic-600 dark:text-nordic-200 text-center text-base font-medium">
          {t?.hero?.slogan || 'Sell easily. Buy securely. Pass it on.'}
        </p>
      </div>
      <div className="w-full flex flex-col gap-3 mt-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => onSocial?.('google')}
          aria-label={`${t?.social?.continueWith || 'Continue with'} Google`}
        >
          <Image src="/icons/google.svg" alt="Google" width={20} height={20} />
          {(t?.social?.continueWith || 'Continue with') + ' Google'}
        </Button>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => onSocial?.('mitid')}
          aria-label={`${t?.social?.continueWith || 'Continue with'} MitID`}
        >
          <Image src="/icons/mitid.svg" alt="MitID" width={20} height={20} />
          {(t?.social?.continueWith || 'Continue with') + ' MitID'}
        </Button>
        <Button
          variant="secondary"
          className="w-full mt-2"
          onClick={onEmailRegister}
        >
          {t?.register?.emailCta || 'Register with email'}
        </Button>
      </div>
      <p className="text-xs text-nordic-400 dark:text-nordic-300 text-center mt-2">
        {t?.register?.acceptTermsPrefix || 'I accept the'}{' '}
        <a href="/terms" className="underline">{t?.register?.terms || 'terms and conditions'}</a>{' '}
        {t?.register?.acceptTermsAnd || 'and'}{' '}
        <a href="/privacy" className="underline">{t?.register?.privacy || 'privacy policy'}</a>.
      </p>
    </div>
  );
};

export default AuthWelcome;

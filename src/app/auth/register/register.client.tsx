"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import AuthWelcome from '@/components/auth/AuthWelcome';
const RegisterForm = dynamic(() => import('@/components/auth/RegisterForm'), { ssr: false });
const SocialAuthHandler = dynamic(() => import('@/components/auth/SocialAuthHandler'), { ssr: false });
const OnboardingWizard = dynamic(() => import('@/components/onboarding/OnboardingWizard'), { ssr: false });

type Step = 'welcome' | 'social-google' | 'social-mitid' | 'email' | 'onboarding';

export default function RegisterClient() {
  const [step, setStep] = React.useState<Step>('welcome');

  // Handlers
  const handleSocial = (provider: 'google' | 'mitid') => {
    setStep(provider === 'google' ? 'social-google' : 'social-mitid');
  };
  const handleEmail = () => setStep('email');
  const handleBack = () => setStep('welcome');
  const handleOnboarding = () => setStep('onboarding');

  return (
    <div className="min-h-screen flex items-center justify-center bg-nordic-50 dark:bg-nordic-900 p-4">
      <div className="w-full max-w-md">
        {step === 'welcome' && (
          <AuthWelcome onEmailRegister={handleEmail} onSocial={handleSocial} />
        )}
        {step === 'social-google' && (
          <div className="animate-fade-in">
            <button className="mb-4 text-nordic-500 hover:underline text-sm" onClick={handleBack}>&larr; Volver</button>
            <SocialAuthHandler provider="google" onSuccess={handleOnboarding} onError={handleBack} />
          </div>
        )}
        {step === 'social-mitid' && (
          <div className="animate-fade-in">
            <button className="mb-4 text-nordic-500 hover:underline text-sm" onClick={handleBack}>&larr; Volver</button>
            <SocialAuthHandler provider="mitid" onSuccess={handleOnboarding} onError={handleBack} />
          </div>
        )}
        {step === 'email' && (
          <div className="animate-fade-in">
            <button className="mb-4 text-nordic-500 hover:underline text-sm" onClick={handleBack}>&larr; Volver</button>
            <RegisterForm onSuccess={handleOnboarding} />
          </div>
        )}
        {step === 'onboarding' && (
          <OnboardingWizard />
        )}
      </div>
    </div>
  );
}

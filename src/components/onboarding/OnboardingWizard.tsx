import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileStep from './steps/ProfileStep';
import ContactStep from './steps/ContactStep';
import PreferencesStep from './steps/PreferencesStep';
import WelcomeStep from './steps/WelcomeStep';
import { toast } from 'sonner';
import { useTranslation } from '@/lib/useTranslation';

const steps = [
  { id: 'profile', component: ProfileStep },
  { id: 'contact', component: ContactStep },
  { id: 'preferences', component: PreferencesStep },
  { id: 'welcome', component: WelcomeStep },
] as const;

type Step = typeof steps[number];

const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<Record<string, any>>({});
  const t = useTranslation();

  const nextStep = async (data?: any) => {
    const step: Step | undefined = steps[currentStep];
    if (step?.id === 'contact' && data) {
      try {
        const { authApi } = await import('@/lib/api/auth');
        await authApi.updateProfile({ phone: data.phone, address: data.address });
        toast.success(t.onboarding?.contactSaved || 'Kontaktoplysninger gemt!');
      } catch (err) {
        toast.error(t.onboarding?.contactSaveError || 'Kunne ikke gemme kontaktoplysninger.');
      }
    }
    if (data) setUserData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const CurrentStepComponent = steps[currentStep]?.component as React.ComponentType<any> | undefined;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nordic-50 to-brand-50 p-4">
      <div className="w-full max-w-md">
        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors ${idx === currentStep ? 'bg-brand-600' : 'bg-nordic-200'}`}
            />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {CurrentStepComponent && (
              <CurrentStepComponent
                onNext={nextStep}
                onPrev={prevStep}
                data={userData}
                isFirst={currentStep === 0}
                isLast={currentStep === steps.length - 1}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingWizard;

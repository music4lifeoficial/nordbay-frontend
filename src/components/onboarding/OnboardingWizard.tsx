import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileStep from './steps/ProfileStep';
import PreferencesStep from './steps/PreferencesStep';
import WelcomeStep from './steps/WelcomeStep';

const steps = [
  { id: 'profile', component: ProfileStep },
  { id: 'preferences', component: PreferencesStep },
  { id: 'welcome', component: WelcomeStep },
];

const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({});

  const nextStep = (data?: any) => {
    if (data) setUserData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const CurrentStepComponent = steps[currentStep].component;

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
            <CurrentStepComponent
              onNext={nextStep}
              onPrev={prevStep}
              data={userData}
              isFirst={currentStep === 0}
              isLast={currentStep === steps.length - 1}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingWizard;

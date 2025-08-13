'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/lib/stores/auth-store';
import { toast } from 'sonner';
import { ChevronLeft, Mail, Lock, User, UserCheck, Check, Loader2, Shield, Globe } from 'lucide-react';

// Esquemas de validación por paso
const emailSchema = z.object({
  email: z.string().email('Indtast en gyldig email adresse'),
});

const passwordSchema = z.object({
  password: z.string()
    .min(10, 'Adgangskoden skal være mindst 10 tegn')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
           'Inkludér store og små bogstaver, tal og symbol'),
});

const nicknameSchema = z.object({
  nickname: z.string()
    .min(3, 'Vælg et brugernavn på mindst 3 tegn')
    .max(20, 'Maksimalt 20 tegn')
    .regex(/^[a-zA-Z0-9_]+$/, 'Kun bogstaver, tal og underscore'),
});

const nameSchema = z.object({
  name: z.string().min(2, 'Indtast dit navn').optional(),
});

type Step = 'email' | 'password' | 'nickname' | 'name' | 'social';
type FormData = {
  email: string;
  password: string;
  nickname: string;
  name?: string;
};

interface StepConfig {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  placeholder: string;
  type: string;
  schema: z.ZodSchema<any>;
  field: keyof FormData;
}

const RegisterFormClean = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { register: registerUser, isLoading } = useAuthStore();
  // Inicial vista social-first
  const [currentStep, setCurrentStep] = useState<Step>('social');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    nickname: '',
    name: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Configuración de pasos
  const steps: Record<Exclude<Step, 'social'>, StepConfig> = {
    email: {
      title: 'Hvad er din email?',
      subtitle: 'Vi bruger den til at oprette din konto',
      icon: <Mail className="w-6 h-6 text-brand-500" />,
      placeholder: 'din@email.dk',
      type: 'email',
      schema: emailSchema,
      field: 'email',
    },
    password: {
      title: 'Opret en sikker adgangskode',
      subtitle: 'Mindst 10 tegn med tal, bogstaver og symboler',
      icon: <Lock className="w-6 h-6 text-brand-500" />,
      placeholder: '••••••••••',
      type: 'password',
      schema: passwordSchema,
      field: 'password',
    },
    nickname: {
      title: 'Vælg dit brugernavn',
      subtitle: 'Sådan vil andre se dig på NordBay',
      icon: <User className="w-6 h-6 text-brand-500" />,
      placeholder: 'mitbrugernavn',
      type: 'text',
      schema: nicknameSchema,
      field: 'nickname',
    },
    name: {
      title: 'Hvad hedder du?',
      subtitle: 'Dit rigtige navn (valgfrit)',
      icon: <UserCheck className="w-6 h-6 text-brand-500" />,
      placeholder: 'Dit navn',
      type: 'text',
      schema: nameSchema,
      field: 'name',
    },
  };

  const form = useForm({
    mode: 'onChange',
  });

  const currentConfig = currentStep !== 'social' ? steps[currentStep] : null;

  const handleNext = async (value: string) => {
    if (!currentConfig) return;

    // Validar el campo actual
    try {
      const validatedData = currentConfig.schema.parse({ [currentConfig.field]: value });
      
      // Actualizar datos del formulario
      setFormData(prev => ({
        ...prev,
        [currentConfig.field]: validatedData[currentConfig.field]
      }));

      // Avanzar al siguiente paso
      const stepOrder: Step[] = ['email', 'password', 'nickname', 'name'];
      const currentIndex = stepOrder.indexOf(currentStep);
      
      if (currentIndex < stepOrder.length - 1) {
        const nextStep = stepOrder[currentIndex + 1];
        if (nextStep) setCurrentStep(nextStep);
      } else {
        // Último paso - registrar usuario
        await handleSubmit({
          ...formData,
          [currentConfig.field]: validatedData[currentConfig.field]
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError && error.issues?.length) {
        const msg = error.issues[0]?.message ?? 'Ugyldigt input';
        toast.error(msg);
      }
    }
  };

  const handleSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      await registerUser({
        email: data.email,
        password: data.password,
        nickname: data.nickname,
        name: data.name || undefined,
      });
      
      // Microcopy neutral, sin "niveles"
      toast.success('Konto oprettet! Tjek din email for at bekræfte din konto.');
      if (onSuccess) onSuccess();
    } catch (error: any) {
      const errorMsg = error?.response?.data?.error || error?.message || 'Der opstod en fejl';
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    // Si estamos en el primer paso de formulario, volver a social
    if (currentStep === 'email') {
      setCurrentStep('social');
      return;
    }

    const stepOrder: Step[] = ['email', 'password', 'nickname', 'name'];
    const currentIndex = stepOrder.indexOf(currentStep);
    
    if (currentIndex > 0) {
      const prevStep = stepOrder[currentIndex - 1];
      if (prevStep) setCurrentStep(prevStep);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'mitid') => {
    if (provider === 'google') {
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/oauth/google/login`;
    } else if (provider === 'mitid') {
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/mitid/verify`;
    }
  };

  // Renderizado del paso social (primer paso)
  if (currentStep === 'social') {
    return (
      <div className="w-full max-w-sm mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold text-nordic-900">Velkommen til NordBay</h1>
          <p className="text-nordic-600">Opret din konto på få sekunder</p>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={() => handleSocialLogin('google')}
            variant="outline" 
            className="w-full h-12 flex items-center justify-center gap-3 text-base font-medium border-2 hover:border-brand-300"
          >
            <Globe className="w-5 h-5" />
            Fortsæt med Google
          </Button>
          
          <Button 
            onClick={() => handleSocialLogin('mitid')}
            variant="outline" 
            className="w-full h-12 flex items-center justify-center gap-3 text-base font-medium border-2 hover:border-brand-300"
          >
            <Shield className="w-5 h-5" />
            Fortsæt med MitID
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-nordic-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-nordic-500">eller</span>
          </div>
        </div>

        <Button 
          onClick={() => setCurrentStep('email')}
          className="w-full h-12 text-base font-medium"
        >
          Opret med email
        </Button>

        <p className="text-center text-sm text-nordic-500">
          Har du allerede en konto?{' '}
          <a href="/auth/login" className="text-brand-600 hover:text-brand-700 font-medium">
            Log ind
          </a>
        </p>
      </div>
    );
  }

  // Renderizado de pasos del formulario
  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Header con botón de retroceso */}
      <div className="flex items-center mb-8">
        <Button 
          onClick={handleBack}
          variant="ghost" 
          size="sm" 
          className="p-2 hover:bg-nordic-100 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1 flex justify-center">
          <div className="flex space-x-2">
            {Object.keys(steps).map((step, index) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Object.keys(steps).indexOf(currentStep) >= index
                    ? 'bg-brand-500'
                    : 'bg-nordic-200'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="w-9" /> {/* Spacer para centrar los dots */}
      </div>

      {/* Contenido del paso actual */}
      {currentConfig && (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              {currentConfig.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-nordic-900 mb-2">
                {currentConfig.title}
              </h1>
              <p className="text-nordic-600">
                {currentConfig.subtitle}
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const value = formData.get('value') as string;
              handleNext(value);
            }}
            className="space-y-6"
          >
            <div>
              <Input
                name="value"
                type={currentConfig.type}
                placeholder={currentConfig.placeholder}
                defaultValue={formData[currentConfig.field] || ''}
                className="h-12 text-base border-2 focus:border-brand-500"
                autoFocus
                autoComplete={currentConfig.type === 'email' ? 'email' : 
                             currentConfig.type === 'password' ? 'new-password' : 
                             currentConfig.field === 'nickname' ? 'username' : 'name'}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : currentStep === 'name' ? (
                'Opret konto'
              ) : (
                'Fortsæt'
              )}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterFormClean;

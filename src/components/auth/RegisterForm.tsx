'use client';

import React from 'react';
import { useTranslation } from '@/lib/useTranslation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/lib/stores/auth-store';
import { toast } from 'sonner';

// Minimalista, progresivo, copy relevante DK/EN, feedback inmediato


const registerSchema = z.object({
  email: z.string().email('Indtast en gyldig email'),
  password: z.string()
    .min(10, 'Adgangskode: min. 10 tegn')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 
           'Adgangskode skal indeholde store/små bogstaver, tal og symbol'),
  nickname: z.string().min(3, 'Vælg et nickname'),
  name: z.string().min(2, 'Indtast dit navn').optional(),
});

type RegisterFormType = z.infer<typeof registerSchema>;

const RegisterForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { register: registerUser, isLoading } = useAuthStore();
  const t = useTranslation();
  const [showPasswordReqs, setShowPasswordReqs] = React.useState(false);

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      nickname: '',
      name: '',
    },
    mode: 'onChange',
  });

  const watchedPassword = form.watch('password');



  const onSubmit = async (data: RegisterFormType) => {
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        nickname: data.nickname,
        name: data.name || undefined, // Backend expects undefined, not empty string
      });
      toast.success('Konto oprettet! Tjek din email for at bekræfte.');
      if (onSuccess) onSuccess();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } ; message?: string } | undefined;
      const errorMsg = err?.response?.data?.error || err?.message || 'Der opstod en fejl';
      toast.error(errorMsg);
    }
  };


  return (
    <div className="w-full max-w-xs mx-auto space-y-5 bg-white p-6 rounded-lg shadow-sm animate-fade-in">
      <h2 className="text-xl font-bold text-nordic-900 text-center mb-2">{t.register?.title}</h2>
      {/* Email registration form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Label htmlFor="email">{t.register?.emailLabel}</Label>
          <Input id="email" type="email" {...form.register('email')} autoComplete="email" />
          {form.formState.errors.email && (
            <p className="text-error text-sm mt-1">{form.formState.errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="nickname">{t.register?.nicknameLabel}</Label>
          <Input id="nickname" type="text" {...form.register('nickname')} autoComplete="username" />
          {form.formState.errors.nickname && (
            <p className="text-error text-sm mt-1">{form.formState.errors.nickname.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="password">{t.register?.passwordLabel}</Label>
          <Input 
            id="password" 
            type="password" 
            {...form.register('password')} 
            autoComplete="new-password"
            onFocus={() => setShowPasswordReqs(true)}
            onBlur={() => setShowPasswordReqs(false)}
          />
          {form.formState.errors.password && (
            <p className="text-error text-sm mt-1">{form.formState.errors.password.message}</p>
          )}
          {/* Optional: password requirements UI removed to avoid missing import */}
        </div>
        {/* Progressive: show name field only after email, nickname, and password are valid */}
        {form.watch('email') && form.watch('nickname') && form.watch('password') &&
          !form.formState.errors.email &&
          !form.formState.errors.nickname &&
          !form.formState.errors.password && (
            <div>
              <Label htmlFor="name">{t.register?.nameLabel}</Label>
              <Input id="name" type="text" {...form.register('name')} autoComplete="name" />
              {form.formState.errors.name && (
                <p className="text-error text-sm mt-1">{form.formState.errors.name.message}</p>
              )}
            </div>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (t.register?.loading || 'Creating account...') : t.register?.submit}
        </Button>
        <div className="text-center mt-2">
          <a href="/auth/login" className="text-brand-600 hover:underline text-sm">{t.register?.loginLink || t.register?.loginHere}</a>
        </div>
      </form>
      <div className="relative flex items-center my-4">
        <div className="flex-grow border-t border-gray-200" />
        <span className="mx-2 text-xs text-gray-400">{t.register?.or || 'or'}</span>
        <div className="flex-grow border-t border-gray-200" />
      </div>
      {/* Social login options */}
      <div className="flex flex-col gap-2 mb-2">
        <Button type="button" variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => handleSocialLogin('google')}>
          <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
          <span>{t.register?.socialGoogle || 'Continue with Google'}</span>
        </Button>
        <Button type="button" variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => handleSocialLogin('mitid')}>
          <img src="/icons/mitid.svg" alt="MitID" className="w-5 h-5" />
          <span>{t.register?.socialMitid || 'Continue with MitID'}</span>
        </Button>
      </div>
    </div>
  );
}

// Social login handler (integrated with backend contract endpoints)
function handleSocialLogin(provider: 'google' | 'mitid') {
  // Use correct backend contract endpoints for social login
  if (provider === 'google') {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/oauth/google/login`; // Correct backend endpoint
  } else if (provider === 'mitid') {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/mitid/verify`; // Correct backend endpoint
  }
}

export default RegisterForm;
'use client';

import React from 'react';
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
  password: z.string().min(6, 'Adgangskode: min. 6 tegn'),
  nickname: z.string().min(3, 'Vælg et nickname'),
  name: z.string().min(2, 'Indtast dit navn'),
  phone: z.string().min(6, 'Indtast et gyldigt telefonnummer'),
  address: z.string().min(5, 'Indtast din adresse'),
  accept_terms: z.boolean().refine(val => val === true, { message: 'Du skal acceptere vilkår og betingelser' }),
});

type RegisterFormType = z.infer<typeof registerSchema>;

const RegisterForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { register: registerUser, isLoading } = useAuthStore();

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      nickname: '',
      name: '',
      phone: '',
      address: '',
      accept_terms: false,
    },
    mode: 'onChange',
  });

  // Control progresivo
  const [showName, setShowName] = React.useState(false);
  const [showPhone, setShowPhone] = React.useState(false);
  const [showAddress, setShowAddress] = React.useState(false);
  const [showTerms, setShowTerms] = React.useState(false);

  // Desplegar progresivamente al interactuar
  React.useEffect(() => {
    if (form.watch('nickname') && form.getValues('nickname').length >= 3) setShowName(true);
    if (form.watch('name') && form.getValues('name').length >= 2) setShowPhone(true);
    if (form.watch('phone') && form.getValues('phone').length >= 6) setShowAddress(true);
    if (form.watch('address') && form.getValues('address').length >= 5) setShowTerms(true);
  }, [form.watch('nickname'), form.watch('name'), form.watch('phone'), form.watch('address')]);

  const onSubmit = async (data: RegisterFormType) => {
    try {
      await registerUser(data);
      toast.success('Konto oprettet!');
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(error?.message || 'Kunne ikke oprette konto');
    }
  };


  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xs mx-auto space-y-5 bg-white p-6 rounded-lg shadow-sm animate-fade-in">
      <h2 className="text-xl font-bold text-nordic-900 text-center mb-2">Opret konto</h2>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...form.register('email')} autoComplete="email" />
        {form.formState.errors.email && (
          <p className="text-error text-sm mt-1">{form.formState.errors.email.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="nickname">Nickname</Label>
        <Input id="nickname" type="text" {...form.register('nickname')} autoComplete="username" onFocus={() => setShowName(true)} />
        {form.formState.errors.nickname && (
          <p className="text-error text-sm mt-1">{form.formState.errors.nickname.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="password">Adgangskode</Label>
        <Input id="password" type="password" {...form.register('password')} autoComplete="new-password" onFocus={() => setShowName(true)} />
        {form.formState.errors.password && (
          <p className="text-error text-sm mt-1">{form.formState.errors.password.message}</p>
        )}
      </div>
      {showName && (
        <div>
          <Label htmlFor="name">Navn</Label>
          <Input id="name" type="text" {...form.register('name')} autoComplete="name" onFocus={() => setShowPhone(true)} />
          {form.formState.errors.name && (
            <p className="text-error text-sm mt-1">{form.formState.errors.name.message}</p>
          )}
        </div>
      )}
      {showPhone && (
        <div>
          <Label htmlFor="phone">Telefon</Label>
          <Input id="phone" type="tel" {...form.register('phone')} autoComplete="tel" onFocus={() => setShowAddress(true)} />
          {form.formState.errors.phone && (
            <p className="text-error text-sm mt-1">{form.formState.errors.phone.message}</p>
          )}
        </div>
      )}
      {showAddress && (
        <div>
          <Label htmlFor="address">Adresse</Label>
          <Input id="address" type="text" {...form.register('address')} autoComplete="street-address" onFocus={() => setShowTerms(true)} />
          {form.formState.errors.address && (
            <p className="text-error text-sm mt-1">{form.formState.errors.address.message}</p>
          )}
        </div>
      )}
      {showTerms && (
        <div className="flex items-center space-x-2">
          <input id="accept_terms" type="checkbox" {...form.register('accept_terms')} />
          <Label htmlFor="accept_terms">Jeg accepterer vilkår og betingelser</Label>
          {form.formState.errors.accept_terms && (
            <p className="text-error text-sm mt-1">{form.formState.errors.accept_terms.message}</p>
          )}
        </div>
      )}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Opretter konto...' : 'Opret konto'}
      </Button>
      <div className="text-center mt-2">
        <a href="/auth/login" className="text-brand-600 hover:underline text-sm">Har du allerede en konto? Log ind</a>
      </div>
    </form>
  );
}

export default RegisterForm;
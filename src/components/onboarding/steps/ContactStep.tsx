
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/useTranslation';

const ContactStep = ({ onNext, onPrev, data }: any) => {

  const [phone, setPhone] = React.useState(data?.phone || '');
  const [address, setAddress] = React.useState(data?.address || '');
  const t = useTranslation();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm animate-fade-in">
      <h2 className="text-xl font-bold text-nordic-900 mb-2">{t.onboarding?.contactTitle || 'Kontaktoplysninger'}</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-nordic-700 mb-1">{t.onboarding?.phoneLabel || 'Telefon'}</label>
          <input
            type="tel"
            className="w-full border border-nordic-200 rounded px-3 py-2"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder={t.onboarding?.phonePlaceholder || 'Dit telefonnummer'}
          />
          <p className="text-xs text-nordic-500 mt-1">{t.onboarding?.phoneHelp || 'Dit telefonnummer deles ikke med andre brugere. Kun til notifikationer og sikkerhed.'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-nordic-700 mb-1">{t.onboarding?.addressLabel || 'Adresse'}</label>
          <input
            type="text"
            className="w-full border border-nordic-200 rounded px-3 py-2"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder={t.onboarding?.addressPlaceholder || 'Gade, nummer, by, postnummer'}
          />
          <p className="text-xs text-nordic-500 mt-1">{t.onboarding?.addressHelp || 'Dette er adressen vi bruger til dine forsendelser.'}</p>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onPrev}>{t.common?.back || 'Tilbage'}</Button>
        <Button onClick={() => onNext({ phone, address })}>{t.common?.next || 'Næste'}</Button>
      </div>
    </div>
  );
};

export default ContactStep;

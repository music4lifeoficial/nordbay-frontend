import React from 'react';
import { Button } from '@/components/ui/button';

const ProfileStep = ({ onNext, onPrev, data }: any) => {
  const [name, setName] = React.useState(data?.name || '');
  const [location, setLocation] = React.useState(data?.location || '');
  // TODO: Avatar upload

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm animate-fade-in">
      <h2 className="text-xl font-bold text-nordic-900 mb-2">Completa tu perfil</h2>
      <div className="space-y-4">
        {/* Avatar upload (TODO) */}
        <div>
          <label className="block text-sm font-medium text-nordic-700 mb-1">Nombre</label>
          <input
            type="text"
            className="w-full border border-nordic-200 rounded px-3 py-2"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-nordic-700 mb-1">Ubicación</label>
          <input
            type="text"
            className="w-full border border-nordic-200 rounded px-3 py-2"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Ciudad, región"
          />
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onPrev}>Atrás</Button>
        <Button onClick={() => onNext({ name, location })}>Siguiente</Button>
      </div>
    </div>
  );
};

export default ProfileStep;

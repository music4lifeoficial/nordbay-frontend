import React from 'react';
import { Button } from '@/components/ui/button';

const WelcomeStep = ({ onNext }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm text-center animate-fade-in">
    <h2 className="text-2xl font-bold text-nordic-900 mb-2">¡Listo!</h2>
    <p className="text-nordic-600 mb-4">Tu perfil está completo. ¡Bienvenido a NordBay!</p>
    <Button className="w-full max-w-xs mt-4" onClick={onNext}>Ir al marketplace</Button>
  </div>
);

export default WelcomeStep;

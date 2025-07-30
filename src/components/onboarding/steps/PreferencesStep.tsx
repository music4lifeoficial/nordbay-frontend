import React from 'react';
import { Button } from '@/components/ui/button';

const categories = ['Moda', 'Electrónica', 'Hogar', 'Libros', 'Deporte'];

const PreferencesStep = ({ onNext, onPrev, data }: any) => {
  const [selected, setSelected] = React.useState<string[]>(data?.categories || []);
  const [notifications, setNotifications] = React.useState(data?.notifications ?? true);

  const toggleCategory = (cat: string) => {
    setSelected(sel => sel.includes(cat) ? sel.filter(c => c !== cat) : [...sel, cat]);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm animate-fade-in">
      <h2 className="text-xl font-bold text-nordic-900 mb-2">Preferencias</h2>
      <div className="mb-4">
        <div className="mb-2 text-nordic-700">Categorías favoritas</div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              className={`px-3 py-1 rounded-full border text-sm ${selected.includes(cat) ? 'bg-brand-100 border-brand-600 text-brand-700' : 'bg-nordic-100 border-nordic-300 text-nordic-600'}`}
              onClick={() => toggleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={notifications} onChange={e => setNotifications(e.target.checked)} />
          Recibir notificaciones
        </label>
      </div>
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onPrev}>Atrás</Button>
        <Button onClick={() => onNext({ categories: selected, notifications })}>Siguiente</Button>
      </div>
    </div>
  );
};

export default PreferencesStep;

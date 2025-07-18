// SocialProofSection.tsx
// Componente modular para la sección Testimonios / Social Proof
// TODO: Recibe props para fotos, badges métricas, testimonios y CTA
// TODO: Implementar estructura mobile/desktop, accesibilidad AA, animaciones sutiles

import React from 'react';

export interface SocialProofSectionProps {
  testimonials?: Array<{ photo?: React.ReactNode; name: string; city: string; text: string; rating?: number }>;
  metrics?: React.ReactNode;
  cta?: React.ReactNode;
}

export const SocialProofSection: React.FC<SocialProofSectionProps> = ({
  testimonials,
  metrics,
  cta,
}) => {
  return (
    <section>
      {/* Testimonios */}
      {testimonials && Array.isArray(testimonials) && (
        <div className="flex flex-col gap-4 mb-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
              {t.photo && <div className="mb-2">{t.photo}</div>}
              <div className="font-bold text-lg mb-1">{t.name}, {t.city}</div>
              <div className="text-gray-700 mb-2">{t.text}</div>
              {t.rating && <div className="flex gap-1">{Array.from({length: t.rating}, (_, i) => <span key={i} aria-label="star">★</span>)}</div>}
            </div>
          ))}
        </div>
      )}
      {/* Métricas */}
      {metrics && <div className="flex gap-4 mb-6">{metrics}</div>}
      {/* CTA */}
      {cta && <div className="mb-4">{cta}</div>}
    </section>
  );
};

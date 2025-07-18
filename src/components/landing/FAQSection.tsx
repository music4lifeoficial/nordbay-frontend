// FAQSection.tsx
// Componente modular para la sección Preguntas frecuentes
// TODO: Recibe props para preguntas, respuestas, iconos y CTA
// TODO: Implementar estructura mobile/desktop, accesibilidad AA, animaciones sutiles

import React from 'react';
import { useTranslation } from '../../lib/useTranslation';

export const FAQSection: React.FC = () => {
  const { t } = useTranslation();
  // TODO: Replace with real icons/assets for each question
  return (
    <section
      aria-labelledby="faq-title"
      className="w-full px-4 py-10 bg-white md:px-8 md:py-16"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2
          id="faq-title"
          className="text-2xl md:text-4xl font-bold text-brand mb-2"
        >
          {t('faq.title')}
        </h2>
        <p className="text-base md:text-lg text-gray-700 mb-6">
          {t('faq.subcopy')}
        </p>
      </div>
      <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-8 mb-8">
        {/* TODO: Replace with real icons/illustrations, validate with users */}
        {[0, 1, 2, 3].map((idx) => (
          <div
            key={idx}
            className="flex flex-col bg-blue-50 rounded-lg p-4 shadow-sm w-full"
            tabIndex={0}
            role="region"
            aria-label={t(`faq.items.${idx}.question`)}
          >
            {/* TODO: Insert icon/illustration for {idx} */}
            <span className="mb-2 text-brand">
              <span className="sr-only">{t(`faq.items.${idx}.question`)}</span>
              {/* Icon placeholder */}
            </span>
            <span className="font-semibold text-lg mb-1">
              {t(`faq.items.${idx}.question`)}
            </span>
            <span className="text-sm text-gray-600">
              {t(`faq.items.${idx}.answer`)}
            </span>
          </div>
        ))}
      </div>
      {/* CTA button */}
      <div className="flex justify-center">
        <button
          className="bg-brand text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand"
          aria-label={t('faq.cta')}
        >
          {t('faq.cta')}
        </button>
      </div>
      {/* TODO: Animations, validate with users */}
    </section>
  );
};

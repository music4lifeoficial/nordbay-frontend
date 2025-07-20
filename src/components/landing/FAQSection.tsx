// FAQSection.tsx
// Componente modular para la sección Preguntas frecuentes
// TODO: Recibe props para preguntas, respuestas, iconos y CTA
// TODO: Implementar estructura mobile/desktop, accesibilidad AA, animaciones sutiles

import React from 'react';
import { useTranslation } from '../../lib/useTranslation';

export const FAQSection: React.FC = () => {
  const { t } = useTranslation();
  // Iconos placeholders para cada pregunta
  const icons = [
    // Seguridad
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#2563eb"/><path d="M16 10l6 3v3c0 4-2.5 7-6 7s-6-3-6-7v-3l6-3z" fill="#fff"/></svg>,
    // Soporte
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#2563eb"/><path d="M10 22v-2a4 4 0 018 0v2" stroke="#fff" strokeWidth="2"/><circle cx="16" cy="14" r="4" fill="#fff"/></svg>,
    // Confianza
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#2563eb"/><path d="M16 10l6 3v3c0 4-2.5 7-6 7s-6-3-6-7v-3l6-3z" fill="#fff"/></svg>,
    // Comisiones
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#2563eb"/><text x="16" y="21" textAnchor="middle" fontSize="14" fill="#fff">0%</text></svg>,
  ];
  return (
    <section
      aria-labelledby="faq-title"
      className="w-full px-4 py-10 bg-white md:px-8 md:py-16 animate-fadein"
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
        {[0, 1, 2, 3].map((idx) => (
          <div
            key={idx}
            className="flex flex-col bg-blue-50 rounded-lg p-4 shadow-sm w-full transition-transform duration-300 hover:scale-105 focus:scale-105"
            tabIndex={0}
            role="region"
            aria-label={t(`faq.items.${idx}.question`)}
          >
            <span className="mb-2 flex justify-center">{icons[idx]}</span>
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
          className="bg-brand text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand transition-colors duration-200"
          aria-label={t('faq.cta')}
        >
          {t('faq.cta')}
        </button>
      </div>
      {/* Animaciones fade-in y hover, validado con usuarios */}
    </section>
  );
};

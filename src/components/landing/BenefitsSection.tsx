// BenefitsSection.tsx
// Componente modular para la sección Beneficios clave
// TODO: Recibe props para iconos, tabla comparativa, copy y CTA
// TODO: Implementar estructura mobile/desktop, accesibilidad AA, animaciones sutiles

import React from 'react';
import { useTranslation } from '../../lib/useTranslation';

export interface BenefitsSectionProps {
  benefits?: Array<{ icon?: React.ReactNode; title: string; copy: string }>;
  comparisonTable?: React.ReactNode;
  cta?: React.ReactNode;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = () => {
  const { t } = useTranslation();
  // Mobile first layout, accessibility AA, modular structure
  const icons = [
    '/icon-benefit-money.svg',
    '/icon-benefit-shield.svg',
    '/icon-benefit-robot.svg',
    '/icon-benefit-chat.svg',
  ];
  const benefitKeys = ["noFees", "securePayments", "aiModeration", "danishSupport"];
  return (
    <section
      aria-labelledby="benefits-title"
      className="w-full px-4 py-10 bg-white md:px-8 md:py-16"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2
          id="benefits-title"
          className="text-2xl md:text-4xl font-bold text-brand mb-2"
        >
          {t('benefits.title')}
        </h2>
        <p className="text-base md:text-lg text-gray-700 mb-6">
          {t('benefits.subcopy')}
        </p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:justify-center mb-8">
        {benefitKeys.map((key, i) => (
          <div
            key={key}
            className="flex flex-col items-center bg-blue-50 rounded-lg p-4 shadow-sm w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-brand"
            tabIndex={0}
            role="region"
            aria-label={t(`benefits.${key}.title`)}
          >
            <img
              src={icons[i]}
              alt={t(`benefits.${key}.title`)}
              className="mb-2 w-12 h-12"
              aria-hidden="false"
            />
            <span className="font-semibold text-lg mb-1">
              {t(`benefits.${key}.title`)}
            </span>
            <span className="text-sm text-gray-600">
              {t(`benefits.${key}.copy`)}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full max-w-3xl mx-auto mb-8">
        <div className="bg-gray-50 rounded-lg p-4 text-center flex justify-center">
          <img
            src="/benefits-comparison-table.svg"
            alt="Tabla comparativa de beneficios NordBay vs competidores"
            className="w-full h-auto max-w-2xl mx-auto"
            aria-hidden="false"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-brand text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand transition-all duration-150"
          aria-label={t('benefits.cta')}
        >
          {t('benefits.cta')}
        </button>
      </div>
      {/* Animaciones sutiles, validate with users */}
    </section>
  );
};

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
  // TODO: Replace with props for icons, table, CTA when assets are ready
  // Mobile first layout, accessibility AA, modular structure
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
        {/* TODO: Replace icons with real assets, validate with users */}
        {["noFees", "securePayments", "aiModeration", "danishSupport"].map((key) => (
          <div
            key={key}
            className="flex flex-col items-center bg-blue-50 rounded-lg p-4 shadow-sm w-full md:w-1/4"
            tabIndex={0}
            role="region"
            aria-label={t(`benefits.${key}.title`)}
          >
            {/* TODO: Insert icon for {key} */}
            <span className="mb-2 text-brand">
              {/* Icon placeholder */}
              <span className="sr-only">{t(`benefits.${key}.title`)}</span>
            </span>
            <span className="font-semibold text-lg mb-1">
              {t(`benefits.${key}.title`)}
            </span>
            <span className="text-sm text-gray-600">
              {t(`benefits.${key}.copy`)}
            </span>
          </div>
        ))}
      </div>
      {/* TODO: Comparativa visual con competidores, tabla o gráfico */}
      <div className="w-full max-w-3xl mx-auto mb-8">
        {/* Table placeholder, replace with real data and assets */}
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <span className="font-bold text-brand">TODO: Tabla comparativa con competidores</span>
        </div>
      </div>
      <div className="flex justify-center">
        {/* CTA button, mobile first, accessible */}
        <button
          className="bg-brand text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand"
          aria-label={t('benefits.cta')}
        >
          {t('benefits.cta')}
        </button>
      </div>
      {/* TODO: Animaciones sutiles, validate with users */}
    </section>
  );
};

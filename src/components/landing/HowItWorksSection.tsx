// HowItWorksSection.tsx
// Componente modular para la sección ¿Cómo funciona?
// TODO: Recibe props para ilustraciones de pasos, iconos, copy y CTA
// TODO: Implementar estructura mobile/desktop, accesibilidad AA, animaciones sutiles

import React from "react";
import { useTranslation } from "../../lib/useTranslation";
import { getLocale } from "../../lib/getLocale";

export interface HowItWorksSectionProps {
  // TODO: props para assets, callbacks, variantes
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = () => {
  const locale = getLocale();
  const t = useTranslation(locale);

  return (
    <section
      className="w-full bg-white text-nordic-blue flex flex-col items-center justify-center py-8 px-4 md:px-0"
      aria-label="How NordBay Works"
    >
      {/* Título y subcopy */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-4xl font-bold text-brand mb-2">
          {t.howItWorks.title}
        </h2>
        <p className="text-lg md:text-xl text-nordic-blue">
          {t.howItWorks.subcopy}
        </p>
      </div>

      {/* 3 pasos visuales */}
      <div className="flex flex-col md:flex-row gap-6 w-full justify-center mb-6">
        {t.howItWorks.steps.map((step: any, idx: number) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-gray-50 rounded-xl p-4 shadow-sm flex-1 animate-fade-in"
            aria-label={`Step ${idx + 1}`}
          >
            {/* TODO: Integrar ilustración propia validada para cada paso */}
            <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
              <span className="text-gray-400">Ilustration</span>
            </div>
            <h3 className="font-semibold text-brand mb-1 text-center text-base md:text-lg">
              {step.title}
            </h3>
            <p className="text-sm md:text-base text-nordic-blue text-center">
              {step.copy}
            </p>
          </div>
        ))}
      </div>

      {/* Beneficios destacados (chips) */}
      <div className="flex flex-row flex-wrap gap-2 justify-center mb-6">
        {t.howItWorks.chips.map((chip: string, idx: number) => (
          <span
            key={idx}
            className="bg-brand text-white px-3 py-1 rounded-full text-xs md:text-sm shadow-sm animate-fade-in"
            aria-label={chip}
          >
            {chip}
          </span>
        ))}
      </div>

      {/* CTA secundario */}
      <button
        className="bg-brand text-white text-base md:text-lg font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 animate-fade-in"
        aria-label={t.howItWorks.cta}
      >
        {t.howItWorks.cta}
      </button>
      {/* TODO: Integrar animación hover y lógica real de CTA */}

      {/* TODO: Accesibilidad AA, performance, feedback usuarios */}
    </section>
  );
}

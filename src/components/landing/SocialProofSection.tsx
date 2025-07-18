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
  // TODO: Estructura visual y lógica según design-landing.md
  return (
    <section>
      {/* TODO: Implementar layout, accesibilidad, animaciones y assets */}
      {/* TODO: Mobile first, variantes desktop */}
      {/* TODO: Insertar testimonios, métricas, CTA */}
    </section>
  );
};

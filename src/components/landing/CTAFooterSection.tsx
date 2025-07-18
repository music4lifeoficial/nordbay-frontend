// CTAFooterSection.tsx
// Componente modular para la sección CTA final + Footer
// TODO: Recibe props para mensaje motivador, botón CTA, links útiles, iconos de redes y contacto
// TODO: Implementar estructura mobile/desktop, accesibilidad AA, animaciones sutiles

import React from 'react';

export interface CTAFooterSectionProps {
  message?: string;
  cta?: React.ReactNode;
  links?: Array<{ label: string; url: string }>;
  socialIcons?: React.ReactNode;
  contactInfo?: React.ReactNode;
}

export const CTAFooterSection: React.FC<CTAFooterSectionProps> = ({
  message,
  cta,
  links,
  socialIcons,
  contactInfo,
}) => {
  return (
    <footer>
      {/* Mensaje motivador */}
      {message && <div className="font-bold text-lg mb-2">{message}</div>}
      {/* Botón CTA */}
      {cta && <div className="mb-4">{cta}</div>}
      {/* Links útiles */}
      {links && (
        <nav className="mb-4 flex flex-wrap gap-4">
          {links.map((link, idx) => (
            <a key={idx} href={link.url} className="text-blue-700 underline">{link.label}</a>
          ))}
        </nav>
      )}
      {/* Iconos de redes sociales */}
      {socialIcons && <div className="mb-4 flex gap-2">{socialIcons}</div>}
      {/* Información de contacto */}
      {contactInfo && <div className="text-sm text-gray-500">{contactInfo}</div>}
    </footer>
  );
};

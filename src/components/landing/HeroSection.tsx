// HeroSection.tsx
// Componente modular para la sección Hero / Above the Fold
// TODO: Recibe props para ilustración, logo, trust signals, copy y CTA
// TODO: Implementar estructura mobile/desktop, accesibilidad AA, animaciones sutiles

import React from "react";
import { useTranslation } from "../../lib/useTranslation";
import Image from "next/image";

export interface HeroSectionProps {
  // Permite pasar assets validados, variantes, y callbacks para CTA/búsqueda
  logoSrc?: string; // SVG/PNG logo NordBay
  illustrationSrc?: string; // Ilustración/foto principal
  onSearch?: (query: string) => void;
  onCTA?: () => void;
  variant?: "mobile" | "desktop";
  // TODO: Definir props para menú, trust signals, accesibilidad custom
}

// TODO: Integrar assets validados y variantes reales cuando estén listos

export const HeroSection: React.FC<HeroSectionProps> = ({
  logoSrc = "/logo.png", // Usar logo real proporcionado en la raíz
  illustrationSrc = "/hero-illustration.svg", // Ilustración principal validada
  onSearch,
  onCTA,
}) => {
  const t = useTranslation();

  // TODO: Adaptar estructura y estilos según variante mobile/desktop
  return (
    <section
      className="w-full bg-white text-nordic-blue flex flex-col items-center justify-center py-8 px-4 md:px-0"
      aria-label="Hero NordBay"
    >
      {/* Logo y menú principal */}
      <header className="w-full flex items-center justify-between mb-4">
        <img
          src={logoSrc}
          alt="NordBay logo"
          className="h-10 md:h-12"
          aria-label="Logo NordBay"
        />
        {/* TODO: Menú principal adaptativo (categorías, login, registro, ayuda) */}
        <nav aria-label="Menú principal">
          {/* TODO: Implementar links y menú hamburguesa para mobile */}
        </nav>
      </header>

      {/* Slogan y subcopy */}
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-5xl font-bold text-brand mb-2">
          {t.hero.slogan}
        </h1>
        <p className="text-lg md:text-2xl text-nordic-blue">
          {t.hero.subcopy}
        </p>
      </div>

      {/* Visual principal (ilustración/foto/animación) */}
      <div className="w-full flex items-center justify-center mb-6">
        {/* TODO: Integrar ilustración/foto principal validada */}
        <div className="w-full flex justify-center items-center py-4">
          <Image
            src={illustrationSrc}
            alt="Ilustración principal: usuarios daneses intercambiando productos en NordBay"
            width={360}
            height={220}
            className="rounded-xl shadow-md object-contain max-w-full h-auto"
            priority={true}
          />
        </div>
      </div>

      {/* CTA principal */}
      <button
        className="bg-brand text-white text-lg md:text-xl font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 mb-4 animate-fade-in"
        aria-label={t.hero.cta}
        onClick={onCTA}
      >
        {t.hero.cta}
      </button>
      {/* TODO: Repetir CTA abajo en mobile si necesario */}

      {/* Trust signals bar */}
      <div className="w-full flex flex-row items-center justify-center gap-4 mb-6" aria-label="Trust signals">
        <div className="flex flex-col items-center">
          <img src="/icon-shield.svg" alt={t.hero.trust.payments} width={32} height={32} aria-label={t.hero.trust.payments} />
          <span className="text-xs text-nordic-blue">{t.hero.trust.payments}</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/icon-robot.svg" alt={t.hero.trust.moderation} width={32} height={32} aria-label={t.hero.trust.moderation} />
          <span className="text-xs text-nordic-blue">{t.hero.trust.moderation}</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/icon-truck.svg" alt={t.hero.trust.shipping} width={32} height={32} aria-label={t.hero.trust.shipping} />
          <span className="text-xs text-nordic-blue">{t.hero.trust.shipping}</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/icon-chat.svg" alt={t.hero.trust.support} width={32} height={32} aria-label={t.hero.trust.support} />
          <span className="text-xs text-nordic-blue">{t.hero.trust.support}</span>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <form
        className="w-full max-w-md flex items-center gap-2 mb-6"
        role="search"
        aria-label="Barra de búsqueda NordBay"
        onSubmit={e => {
          e.preventDefault();
          const query = (e.currentTarget.elements.namedItem("search") as HTMLInputElement)?.value;
          if (onSearch && query) onSearch(query);
        }}
      >
        <input
          type="search"
          name="search"
          placeholder={t.hero.searchPlaceholder}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-brand"
          aria-label={t.hero.searchPlaceholder}
        />
        <button
          type="submit"
          className="bg-brand text-white rounded-full px-4 py-2 flex items-center gap-2 hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand"
          aria-label="Buscar"
        >
          <span role="img" aria-label="Buscar">🔍</span>
        </button>
      </form>
      {/* TODO: Definir comportamiento de búsqueda y resultados */}

      {/* Animaciones sutiles y accesibilidad AA ya incluidas en clases y roles */}
      {/* TODO: Revisar performance, Lighthouse, y feedback de usuarios reales */}
    </section>
  );
};

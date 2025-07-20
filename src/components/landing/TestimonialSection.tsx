// TestimonialSection.tsx
// Modular section for Social Proof / Testimonials
// TODO: Integrate real user photos, badges, metrics, and CTA
// TODO: Mobile first, accessibility AA, i18n, Danish/Scandinavian copy

import React from 'react';
import { useTranslation } from '../../lib/useTranslation';

export const TestimonialSection: React.FC = () => {
  const t = useTranslation();
  // Datos reales o placeholders personalizados
  const testimonials = [
    {
      photo: (
        <img
          src="/user-mikkel.jpg"
          alt="Mikkel, København"
          className="w-16 h-16 rounded-full object-cover border-2 border-brand shadow"
        />
      ),
      name: "Mikkel",
      city: "København",
      text: t.testimonials.items[0].text,
      stars: 5,
    },
    {
      photo: (
        <img
          src="/user-sara.jpg"
          alt="Sara, Aarhus"
          className="w-16 h-16 rounded-full object-cover border-2 border-brand shadow"
        />
      ),
      name: "Sara",
      city: "Aarhus",
      text: t.testimonials.items[1].text,
      stars: 5,
    },
    {
      photo: (
        <img
          src="/user-lars.jpg"
          alt="Lars, Odense"
          className="w-16 h-16 rounded-full object-cover border-2 border-brand shadow"
        />
      ),
      name: "Lars",
      city: "Odense",
      text: t.testimonials.items[2].text,
      stars: 4,
    },
  ];

  // Métricas badges
  const metrics = [
    t.testimonials.metrics.productsSold,
    t.testimonials.metrics.satisfaction,
    t.testimonials.metrics.avgSaleTime,
  ];

  return (
    <section
      aria-labelledby="testimonials-title"
      className="w-full px-4 py-10 bg-white md:px-8 md:py-16 animate-fadein"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2
          id="testimonials-title"
          className="text-2xl md:text-4xl font-bold text-brand mb-2"
        >
          {t.testimonials.title}
        </h2>
        <p className="text-base md:text-lg text-gray-700 mb-6">
          {t.testimonials.subcopy}
        </p>
      </div>
      <div className="flex flex-col gap-6 md:flex-row md:justify-center mb-8">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-blue-50 rounded-lg p-4 shadow-sm w-full md:w-1/3 transition-transform duration-300 hover:scale-105 focus:scale-105"
            tabIndex={0}
            role="region"
            aria-label={`${t.name}, ${t.city}`}
          >
            {t.photo}
            <span className="font-semibold text-lg mb-1">
              {t.name}, {t.city}
            </span>
            <span className="text-sm text-gray-600 mb-2">
              {t.text}
            </span>
          <span className="flex gap-1" aria-label={t.stars + " estrellas"}>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={i < t.stars ? "text-yellow-400" : "text-gray-300"}
                  aria-hidden="true"
                >★</span>
              ))}
              <span className="sr-only">{t.stars} estrellas</span>
            </span>
          </div>
        ))}
      </div>
      {/* Métricas badges */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fadein">
        {metrics.map((m, idx) => (
          <span
            key={idx}
            className="bg-brand text-white rounded-full px-4 py-2 font-semibold text-sm shadow-md"
            aria-label={m}
          >
            {m}
          </span>
        ))}
      </div>
      {/* CTA button */}
      <div className="flex justify-center">
        <button
          className="bg-brand text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand transition-colors duration-200"
          aria-label={t.testimonials.cta}
        >
          {t.testimonials.cta}
        </button>
      </div>
      {/* Animaciones fade-in y hover, validado con usuarios */}
    </section>
  );
};

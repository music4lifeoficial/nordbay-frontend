// TestimonialSection.tsx
// Modular section for Social Proof / Testimonials
// TODO: Integrate real user photos, badges, metrics, and CTA
// TODO: Mobile first, accessibility AA, i18n, Danish/Scandinavian copy

import React from 'react';
import { useTranslation } from '../../lib/useTranslation';

export const TestimonialSection: React.FC = () => {
  const { t } = useTranslation();
  // TODO: Replace with real user data, photos, and metrics when available
  return (
    <section
      aria-labelledby="testimonials-title"
      className="w-full px-4 py-10 bg-white md:px-8 md:py-16"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2
          id="testimonials-title"
          className="text-2xl md:text-4xl font-bold text-brand mb-2"
        >
          {t('testimonials.title')}
        </h2>
        <p className="text-base md:text-lg text-gray-700 mb-6">
          {t('testimonials.subcopy')}
        </p>
      </div>
      <div className="flex flex-col gap-6 md:flex-row md:justify-center mb-8">
        {/* TODO: Replace with real user photos and testimonials, validate with users */}
        {[0, 1, 2].map((idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-blue-50 rounded-lg p-4 shadow-sm w-full md:w-1/3"
            tabIndex={0}
            role="region"
            aria-label={t(`testimonials.items.${idx}.name`)}
          >
            {/* TODO: Insert real user photo */}
            <span className="mb-2 w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="sr-only">{t(`testimonials.items.${idx}.name`)}</span>
              {/* Photo placeholder */}
            </span>
            <span className="font-semibold text-lg mb-1">
              {t(`testimonials.items.${idx}.name`)}, {t(`testimonials.items.${idx}.city`)}
            </span>
            <span className="text-sm text-gray-600 mb-2">
              {t(`testimonials.items.${idx}.text`)}
            </span>
            <span className="flex gap-1" aria-label={t('testimonials.rating')}>
              {/* TODO: Insert star icons, accessible */}
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < t(`testimonials.items.${idx}.stars`) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
              ))}
            </span>
          </div>
        ))}
      </div>
      {/* Metrics badges */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {["productsSold", "satisfaction", "avgSaleTime"].map((key) => (
          <span
            key={key}
            className="bg-brand text-white rounded-full px-4 py-2 font-semibold text-sm shadow-md"
            aria-label={t(`testimonials.metrics.${key}`)}
          >
            {t(`testimonials.metrics.${key}`)}
          </span>
        ))}
      </div>
      {/* CTA button */}
      <div className="flex justify-center">
        <button
          className="bg-brand text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand"
          aria-label={t('testimonials.cta')}
        >
          {t('testimonials.cta')}
        </button>
      </div>
      {/* TODO: Animations, validate with users */}
    </section>
  );
};

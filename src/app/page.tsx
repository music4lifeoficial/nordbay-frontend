"use client";

import Header from '@/components/layout/Header';
import * as React from "react";
import { HeroSection } from '@/components/landing/HeroSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { TestimonialSection } from '@/components/landing/TestimonialSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { CTAFooterSection } from '@/components/landing/CTAFooterSection';
import FooterSection from '@/components/landing/FooterSection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-nordic-50 to-white">
      {/* Hero Section */}
      <HeroSection />
        {/* Sección ¿Cómo funciona? */}
        <HowItWorksSection />
        {/* Sección Beneficios clave */}
        <BenefitsSection />
        {/* Sección Testimonios / Social Proof */}
        <TestimonialSection />
        {/* Sección FAQ */}
        <FAQSection />
        {/* Sección CTA final + Footer */}
        <CTAFooterSection />
        <FooterSection />
      </main>
    </>
  );
}

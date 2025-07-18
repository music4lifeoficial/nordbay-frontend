import React from "react";
import { useTranslation } from "../../lib/useTranslation";

/**
 * CTASection - Final call-to-action section for NordBay landing page.
 * Mobile first, AA accessible, i18n, culturally adapted for Denmark/Scandinavia.
 * TODO: Add brand SVG/icon, validate assets, and real contact/social links.
 */
const CTASection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      aria-label={t("ctaFooter.ctaMessage")}
      className="w-full py-10 px-4 bg-white flex flex-col items-center gap-6 border-t border-gray-100"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-brand-blue text-center mb-2">
        {t("ctaFooter.ctaMessage")}
      </h2>
      <button
        className="bg-brand-blue text-white text-lg font-semibold rounded-full px-8 py-3 shadow-md hover:bg-brand-blue-dark focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 transition-all"
        aria-label={t("ctaFooter.ctaButton")}
      >
        {t("ctaFooter.ctaButton")}
      </button>
      <footer className="w-full flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200">
        <nav aria-label="Footer links" className="flex gap-6 flex-wrap justify-center">
          <a href="/about" className="text-gray-700 hover:text-brand-blue focus:text-brand-blue underline" aria-label={t("ctaFooter.footerLinks.about")}>{t("ctaFooter.footerLinks.about")}</a>
          <a href="/terms" className="text-gray-700 hover:text-brand-blue focus:text-brand-blue underline" aria-label={t("ctaFooter.footerLinks.terms")}>{t("ctaFooter.footerLinks.terms")}</a>
          <a href="/privacy" className="text-gray-700 hover:text-brand-blue focus:text-brand-blue underline" aria-label={t("ctaFooter.footerLinks.privacy")}>{t("ctaFooter.footerLinks.privacy")}</a>
          <a href="/help" className="text-gray-700 hover:text-brand-blue focus:text-brand-blue underline" aria-label={t("ctaFooter.footerLinks.help")}>{t("ctaFooter.footerLinks.help")}</a>
        </nav>
        <div className="flex gap-4 items-center">
          {/* TODO: Replace with real SVG icons and links */}
          <a href="#" aria-label="Facebook" className="text-brand-blue hover:text-brand-blue-dark"><span>{t("ctaFooter.footerSocial.facebook")}</span></a>
          <a href="#" aria-label="Instagram" className="text-brand-blue hover:text-brand-blue-dark"><span>{t("ctaFooter.footerSocial.instagram")}</span></a>
          <a href="#" aria-label="LinkedIn" className="text-brand-blue hover:text-brand-blue-dark"><span>{t("ctaFooter.footerSocial.linkedin")}</span></a>
        </div>
        <address className="not-italic text-gray-500 text-sm mt-2 md:mt-0 flex flex-col md:flex-row gap-2 items-center">
          {/* TODO: Replace with real contact info if available */}
          <span>{t("ctaFooter.footerContact.email")}: info@nordbay.dk</span>
          <span>{t("ctaFooter.footerContact.phone")}: +45 12 34 56 78</span>
          {/* <span>{t("ctaFooter.footerContact.address")}: TODO</span> */}
        </address>
      </footer>
    </section>
  );
};

export default CTASection;

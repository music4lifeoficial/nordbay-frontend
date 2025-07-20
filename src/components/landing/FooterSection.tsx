import React from "react";
import { useTranslation } from "../../lib/useTranslation";

/**
 * FooterSection - Final footer for NordBay landing page.
 * Mobile first, AA accessible, i18n, culturally adapted for Denmark/Scandinavia.
 * TODO: Add brand SVG/icon, validate assets, and real contact/social links.
 */
const FooterSection: React.FC = () => {
  const t = useTranslation();

  return (
    <footer
      aria-label="Footer"
      className="w-full py-8 px-4 bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-200 animate-fadein"
    >
      <nav aria-label="Footer links" className="flex gap-6 flex-wrap justify-center">
        <a href="/about" className="text-gray-700 underline transition-colors duration-200 hover:text-brand-blue focus:text-brand-blue" aria-label={t.ctaFooter.footerLinks.about}>{t.ctaFooter.footerLinks.about}</a>
        <a href="/terms" className="text-gray-700 underline transition-colors duration-200 hover:text-brand-blue focus:text-brand-blue" aria-label={t.ctaFooter.footerLinks.terms}>{t.ctaFooter.footerLinks.terms}</a>
        <a href="/privacy" className="text-gray-700 underline transition-colors duration-200 hover:text-brand-blue focus:text-brand-blue" aria-label={t.ctaFooter.footerLinks.privacy}>{t.ctaFooter.footerLinks.privacy}</a>
        <a href="/help" className="text-gray-700 underline transition-colors duration-200 hover:text-brand-blue focus:text-brand-blue" aria-label={t.ctaFooter.footerLinks.help}>{t.ctaFooter.footerLinks.help}</a>
      </nav>
      <div className="flex gap-4 items-center">
        {/* TODO: Replace with real SVG icons and links */}
        <a href="#" aria-label="Facebook" className="text-brand-blue transition-colors duration-200 hover:text-brand-blue-dark focus:text-brand-blue-dark"><span>{t.ctaFooter.footerSocial.facebook}</span></a>
        <a href="#" aria-label="Instagram" className="text-brand-blue transition-colors duration-200 hover:text-brand-blue-dark focus:text-brand-blue-dark"><span>{t.ctaFooter.footerSocial.instagram}</span></a>
        <a href="#" aria-label="LinkedIn" className="text-brand-blue transition-colors duration-200 hover:text-brand-blue-dark focus:text-brand-blue-dark"><span>{t.ctaFooter.footerSocial.linkedin}</span></a>
      </div>
      <address className="not-italic text-gray-500 text-sm flex flex-col md:flex-row gap-2 items-center">
        {/* TODO: Replace with real contact info if available */}
        <span>{t.ctaFooter.footerContact.email}: info@nordbay.dk</span>
        <span>{t.ctaFooter.footerContact.phone}: +45 12 34 56 78</span>
        {/* <span>{t.ctaFooter.footerContact.address}: TODO</span> */}
      </address>
    </footer>
  );
};

export default FooterSection;

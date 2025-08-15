import { useMemo } from "react";
import { useLocale } from "../context/LocaleContext";
import da from "../locales/da.json" assert { type: "json" };
import en from "../locales/en.json" assert { type: "json" };

// Use loose typing to prevent TS errors when accessing evolving keys
const translations: Record<string, any> = {
  da,
  en,
};

export function useTranslation(): any {
  const { locale } = useLocale();
  return useMemo(() => translations[locale] || translations["da"], [locale]);
}

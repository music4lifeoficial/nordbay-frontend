import { useMemo } from "react";
import { useLocale } from "../context/LocaleContext";

const translations = {
  da: require("../locales/da.json"),
  en: require("../locales/en.json")
};

export function useTranslation() {
  const { locale } = useLocale();
  return useMemo(() => translations[locale] || translations["da"], [locale]);
}

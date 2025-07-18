import { useMemo } from "react";

const translations = {
  da: require("../locales/da.json"),
  en: require("../locales/en.json")
};

export function useTranslation(locale: "da" | "en" = "da") {
  // TODO: Detect locale from router, context, or user settings
  return useMemo(() => translations[locale] || translations["da"], [locale]);
}

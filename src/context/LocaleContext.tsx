"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type Locale = "da" | "en";

interface LocaleContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>("da");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("nordbay-locale") : null;
    if (stored === "en" || stored === "da") setLocaleState(stored);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("nordbay-locale", newLocale);
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextProps => {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within a LocaleProvider");
  return context;
}

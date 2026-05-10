"use client";

import React, { createContext, useContext, ReactNode } from "react";
import type enDictionary from "@/i18n/dictionaries/en.json";

export type Dictionary = typeof enDictionary;

const DictionaryContext = createContext<Dictionary | null>(null);
const LocaleContext = createContext<string>("en");

export const I18nProvider = ({
  children,
  dictionary,
  locale
}: {
  children: ReactNode;
  dictionary: Dictionary;
  locale: string;
}) => {
  return (
    <LocaleContext.Provider value={locale}>
      <DictionaryContext.Provider value={dictionary}>
        {children}
      </DictionaryContext.Provider>
    </LocaleContext.Provider>
  );
};

export const useDictionary = () => {
  const dictionary = useContext(DictionaryContext);
  if (!dictionary) {
    throw new Error("useDictionary must be used within I18nProvider");
  }

  return dictionary;
};

export const useLocale = () => {
  return useContext(LocaleContext);
};

"use client";

import React, { createContext, useContext, ReactNode } from "react";

type Dictionary = Record<string, any>;

const DictionaryContext = createContext<Dictionary>({});
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
  return useContext(DictionaryContext);
};

export const useLocale = () => {
  return useContext(LocaleContext);
};

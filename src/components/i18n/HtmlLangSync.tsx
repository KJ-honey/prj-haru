"use client";

import { useEffect } from "react";

const htmlLangByLocale: Record<string, string> = {
  kr: "ko",
  jp: "ja",
  en: "en",
};

export function HtmlLangSync({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = htmlLangByLocale[locale] ?? "en";
  }, [locale]);

  return null;
}

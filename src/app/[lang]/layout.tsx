import type { Metadata } from "next";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { HtmlLangSync } from "@/components/i18n/HtmlLangSync";
import { getDictionary } from "@/i18n/getDictionary";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  // Await params per Next.js 15+ conventions if applicable, but for Next 13/14 it's okay without await.
  // We'll await just in case it's a newer Next.js version where params is a promise.
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as 'en' | 'kr' | 'jp');
  return {
    title: dict.layout.title,
    description: dict.layout.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as 'en' | 'kr' | 'jp');

  return (
    <I18nProvider dictionary={dict} locale={resolvedParams.lang}>
      <HtmlLangSync locale={resolvedParams.lang} />
      {children}
    </I18nProvider>
  );
}

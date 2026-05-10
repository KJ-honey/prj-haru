import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { getDictionary } from "@/i18n/getDictionary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as 'en' | 'kr' | 'jp');

  return (
    <html
      lang={resolvedParams.lang === 'kr' ? 'ko' : resolvedParams.lang === 'jp' ? 'ja' : 'en'}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-zinc-950 transition-colors duration-500">
        <ThemeProvider>
          <I18nProvider dictionary={dict} locale={resolvedParams.lang}>
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

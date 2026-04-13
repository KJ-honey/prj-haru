import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'kr', 'jp'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;

  // Simple match
  const langs = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim().toLowerCase());
  
  for (const lang of langs) {
    if (lang.startsWith('ko')) return 'kr';
    if (lang.startsWith('ja')) return 'jp';
    if (lang.startsWith('en')) return 'en';
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Ignore static files, api routes, etc.
  if (pathname.includes('.') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

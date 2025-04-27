import acceptLanguage from 'accept-language';
import { NextRequest, NextResponse } from 'next/server';
import { FALLBACK_LANG, LANGUAGES, LANG_COOKIE_NAME, LANG_HEADER_NAME } from './config';

acceptLanguage.languages(LANGUAGES as unknown as string[]);

export function i18nMiddleware(request: NextRequest) {
  // Ignore paths with "icon" or "chrome"
  if (
    request.nextUrl.pathname.indexOf('icon') > -1 ||
    request.nextUrl.pathname.indexOf('chrome') > -1
  )
    return NextResponse.next();

  let lang;
  // Try to get language from cookie
  if (request.cookies.has(LANG_COOKIE_NAME)) {
    lang = acceptLanguage.get(request.cookies.get(LANG_COOKIE_NAME)!.value);
  }
  // If no cookie, check the Accept-Language header
  if (!lang) {
    lang = acceptLanguage.get(request.headers.get('Accept-Language'));
  }
  // Default to fallback language if still undefined
  if (!lang) {
    lang = FALLBACK_LANG;
  }

  // Check if the language is already in the path
  const isLangInPath = LANGUAGES.find((locale) =>
    request.nextUrl.pathname.startsWith(`/${locale}`),
  );

  const headers = new Headers(request.headers);
  headers.set(LANG_HEADER_NAME, isLangInPath || lang);

  // If the language is not in the path, redirect to include it
  if (!isLangInPath && !request.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.redirect(
      new URL(`/${lang}${request.nextUrl.pathname}${request.nextUrl.search}`, request.url),
    );
  }

  // If a referer exists, try to detect the language from there and set the cookie accordingly
  if (request.headers.has('referer')) {
    const refererUrl = new URL(request.headers.get('referer')!);
    const isLangInReferer = LANGUAGES.find((locale) =>
      refererUrl.pathname.startsWith(`/${locale}`),
    );

    const response = NextResponse.next({ headers });
    if (isLangInReferer) response.cookies.set(LANG_COOKIE_NAME, isLangInReferer);
    return response;
  }

  return NextResponse.next({ headers });
}

// matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)']

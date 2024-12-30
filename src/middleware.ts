import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { siteConfig } from './siteConfig';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ko|en|jp)/:path*'],
};

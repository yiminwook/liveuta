import { redirect } from '@/i18n/routing';
import { siteConfig } from '@/siteConfig';

export default function Page() {
  redirect({ href: '/login', locale: siteConfig.defaultLocale });
}

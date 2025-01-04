import { redirect } from '@/i18n/routing';
import { siteConfig } from '@/siteConfig';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value;

  if (!locale) {
    redirect({ href: '/', locale: siteConfig.defaultLocale });
  }

  redirect({ href: '/', locale: locale! });
}

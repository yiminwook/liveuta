'use client';
import { Link } from '@/libraries/i18n';
import { useLocale, useTranslations } from '@/libraries/i18n/client';

// 401 - Unauthorized page
export default function Unauthorized() {
  const locale = useLocale();
  const { t } = useTranslations(locale);

  return (
    <main>
      <h1>{t('error.unauthorized.title')}</h1>
      <Link locale={locale} href="/">
        {t('error.unauthorized.linkToLogin')}
      </Link>
    </main>
  );
}

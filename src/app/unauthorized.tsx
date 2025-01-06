'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

// 401 - Unauthorized page
export default function Unauthorized() {
  const t = useTranslations('error.unauthorized');
  return (
    <main>
      <h1>{t('title')}</h1>
      <Link href="/">{t('linkToLogin')}</Link>
    </main>
  );
}

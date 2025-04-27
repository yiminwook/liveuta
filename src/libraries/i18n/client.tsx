'use client';
import { useParams } from 'next/navigation';
import { usePathname as useNextPathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation as useTranslationClient } from 'react-i18next';
import { FALLBACK_LANG } from './config';
import { i18next } from './i18next';
import { TLocaleCode } from './type';

const runsOnServerSide = typeof window === 'undefined';

export function useTranslations(
  locale: TLocaleCode,
  options?: Parameters<typeof useTranslationClient>[1],
) {
  const [activeLng, setActiveLng] = useState(i18next.resolvedLanguage);

  useEffect(() => {
    if (activeLng === i18next.resolvedLanguage) return;
    setActiveLng(() => i18next.resolvedLanguage);
  }, [activeLng]);

  useEffect(() => {
    if (!locale || i18next.resolvedLanguage === locale) return;
    i18next.changeLanguage(locale);
  }, [locale]);

  if (runsOnServerSide && i18next.resolvedLanguage !== locale) {
    i18next.changeLanguage(locale);
  }

  return useTranslationClient(undefined, options);
}

export const useLocale = () => {
  const params = useParams<{ locale?: TLocaleCode }>();

  return params.locale ?? FALLBACK_LANG;
};

export const usePathname = () => {
  const pathname = useNextPathname();
  const locale = useLocale();

  return pathname.replace(`/${locale}`, '');
};

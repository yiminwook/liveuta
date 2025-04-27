import 'server-only';
import { i18next } from './i18next';
import { TLocaleCode } from './type';

export async function getTranslations(locale: TLocaleCode, options?: { keyPrefix?: string }) {
  if (locale && i18next.resolvedLanguage !== locale) {
    await i18next.changeLanguage(locale);
  }

  return {
    t: i18next.getFixedT(locale ?? i18next.resolvedLanguage!, undefined, options?.keyPrefix),
    i18n: i18next,
  };
}

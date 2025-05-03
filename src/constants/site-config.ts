import { FALLBACK_LANG } from '@/libraries/i18n/config';
import { SiteConfig } from '@/types/site-config';

export const siteConfig: SiteConfig = {
  defaultLocale: FALLBACK_LANG,
  locales: [
    {
      code: 'ko',
      name: '한국어',
    },
    {
      code: 'en',
      name: 'English',
    },
    {
      code: 'ja',
      name: '日本語',
    },
  ],
  defaultUseAutoSync: true,
  defaultRefreshInterval: 3,
  refreshIntervalOptions: [3, 5, 10, 15, 30, 60],
} as const;

import { SiteConfig } from './types/siteConfig';

export const siteConfig: SiteConfig = {
  defaultLocale: 'ko',
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
      code: 'jp',
      name: '日本語',
    },
  ],
  defaultUseAutoSync: true,
  defaultRefreshInterval: 3,
  refreshIntervalOptions: [3, 5, 10, 15, 30, 60],
} as const;

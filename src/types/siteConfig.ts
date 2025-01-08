export type LocaleCode = 'ko' | 'en' | 'ja';
export type Locale = {
  code: LocaleCode;
  name: string;
};

export type SiteConfig = {
  defaultLocale: LocaleCode;
  locales: Locale[];
  defaultUseAutoSync: boolean;
  defaultRefreshInterval: number;
  refreshIntervalOptions: number[];
};

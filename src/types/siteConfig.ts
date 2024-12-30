export type LocaleCode = 'ko' | 'en' | 'jp';
export type Locale = {
  code: LocaleCode;
  name: string;
};

export type SiteConfig = {
  defaultLocale: LocaleCode;
  locales: Locale[];
};

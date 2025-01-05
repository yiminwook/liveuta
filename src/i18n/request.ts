import { siteConfig } from '@/siteConfig';
import { getCookies } from '@/utils/getCookie';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({}) => {
  let locale = (await getCookies()).locale || siteConfig.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

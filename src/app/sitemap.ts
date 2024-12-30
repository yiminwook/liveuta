import { getPathname, routing } from '@/i18n/routing';
import { Promised } from '@/types';
import { MetadataRoute } from 'next';

interface SiteMapProps {
  id: number;
}

type SiteMap = {
  changeFrequency: string;
  priority: number;
} & MetadataRoute.Sitemap[0];

type Href = Parameters<typeof getPathname>[0]['href'];

function getUrl(href: Href, locale: (typeof routing.locales)[number]) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const pathname = getPathname({ locale, href });

  return baseUrl + pathname;
}

function getEntry(href: Href) {
  return {
    url: getUrl(href, routing.defaultLocale),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, getUrl(href, locale)]),
      ),
    },
  };
}

/**
 *  공식문서
 *
 *  @참조 https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#returns
 */
export async function generateSitemaps(): Promise<SiteMapProps[]> {
  // fetch를 통해 데이터를 가져와서 sitemap을 자동으로 구성하도록 만들수있다.
  return [{ id: 0 }];
}

export default function sitemap({}: Promised<typeof generateSitemaps>[0]): SiteMap[] {
  const sites = [
    getEntry('/'),
    getEntry('/channel'),
    getEntry('/request'),
    getEntry('setlist'),
    getEntry('/setting'),
  ];

  return sites.map((site) => ({
    ...site,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  // return sites.map((site) => {
  //   return {
  //     url: site !== '/' ? `${baseUrl}${site}` : `${baseUrl}`,
  //     lastModified: new Date(),
  //     changeFrequency: 'daily',
  //     priority: 0.7,
  //   };
  // });
}

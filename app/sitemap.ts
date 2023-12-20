import { Promised } from '@/types';
import { MetadataRoute } from 'next';

interface SiteMapProps {
  id: number;
}

type SiteMap = {
  changeFrequency: string;
  priority: number;
} & MetadataRoute.Sitemap[0];

/**
 *  공식문서
 *
 *  @참조 https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#returns
 */
export async function generateSitemaps(): Promise<SiteMapProps[]> {
  // fetch를 통해 데이터를 가져와서 sitemap을 자동으로 구성하도록 만들수있다.
  return [{ id: 0 }];
}

export default function sitemap({ id }: Promised<typeof generateSitemaps>[0]): SiteMap[] {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const sites = ['/', 'live', 'daily', 'all', 'search', 'channels', 'sheet/request', 'short', 'settings'];

  return sites.map((site, index) => {
    return {
      url: site !== '' ? `${baseUrl}/${site}` : `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    };
  });
}

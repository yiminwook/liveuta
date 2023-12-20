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
  // callTms = new callTms();
  // const data = await callTms.onApiSend();
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];
}

export default function sitemap({ id }: Promised<typeof generateSitemaps>[0]): SiteMap[] {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const sites = [
    {
      path: '',
      priority: 1,
      changeFrequency: 'daily',
    },
    {
      path: 'about',
      priority: 0.5,
      changeFrequency: 'monthly',
    },
    {
      path: 'blog',
      priority: 0.8,
      changeFrequency: 'yearly',
    },
  ];

  return sites.map((site, index) => {
    return {
      ...site,
      url: site.path !== '' ? `${baseUrl}/${site.path}` : `${baseUrl}`,
      lastModified: new Date(),
    };
  });
}

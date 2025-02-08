import Footer from '@/components/common/Footer';
import { TYChannelReturn } from '@/libraries/mongoDB/channels';
import { TMetadata } from '@/types';
import Client from './page.client';

export default async function Page() {
  const [metadata, recentChannelData] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/metadata`, {
      next: { revalidate: 3600, tags: ['metadata'] },
    })
      .then((res) => res.json() as Promise<{ data: TMetadata }>)
      .then((json) => json.data),
    fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/youtube-channel?page=1&sort=createdAt&size=20`,
      { next: { revalidate: 1800, tags: ['channel'] } },
    )
      .then((res) => res.json() as Promise<{ data: TYChannelReturn }>)
      .then((json) => json.data),
  ]);

  return (
    <>
      <Client coverImgUrl={metadata.cover_image_url} recentChannels={recentChannelData.contents} />
      <Footer />
    </>
  );
}

import Footer from '@/components/common/Footer';
import { auth } from '@/libraries/nextAuth';
import { METADATA } from '@/types';
import { TMongoDBChannelData, combineChannelData } from '@/utils/combineChannelData';
import { TGetChannelRes } from '@api/v1/channel/route';
import Client from './page.client';

async function getRecentChannel() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_SITE_URL + '/api/v1/channel?order=createdAt&size=20',
    {
      next: { revalidate: 60, tags: ['channel'] }, // 1분간 캐시
    },
  );

  const json: TGetChannelRes = await res.json();

  const mongoDBChannelData: TMongoDBChannelData = {};

  json.data.forEach((data) => {
    if (mongoDBChannelData[data.channel_id]) return;
    mongoDBChannelData[data.channel_id] = {
      uid: data.channel_id,
      channelName: data.name_kor,
      url: data.channel_addr,
      createdAt: data.createdAt,
      alive: data.alive,
    };
  });

  return combineChannelData(mongoDBChannelData, { sort: 'createAt' });
}

export default async function Page() {
  const [session, metadata, recentChannelData] = await Promise.all([
    auth(),
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/metadata`, {
      next: { revalidate: 3600, tags: ['metadata', 'cover'] },
    }).then((res) => res.json() as Promise<METADATA>),
    getRecentChannel(),
  ]);

  return (
    <>
      <Client
        coverImgUrl={metadata.cover_image_url}
        session={session}
        recentChannels={recentChannelData}
      />
      <Footer />
    </>
  );
}

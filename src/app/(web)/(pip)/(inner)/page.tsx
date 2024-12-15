import ClientError from '@/libraries/error/clientError';
import { connectOracleDB } from '@/libraries/oracleDB/connection';
import { TMetaRow } from '@/types/db';
import { homeDto } from '@/types/dto';
import Client from './page.client';
import '@/styles/swiper/core.scss';
import { auth } from '@/libraries/nextAuth';
import { TMongoDBChannelData, combineChannelData } from '@/utils/combineChannelData';
import { TGetChannelRes } from '@api/v1/channel/route';

async function getMetadata() {
  const connection = await connectOracleDB();
  const [coverImgUrlQuery] = await Promise.all([
    connection.execute<TMetaRow>("SELECT * FROM META WHERE key = 'cover_image_url'"),
  ]);

  const coverImgUrl = coverImgUrlQuery.rows?.[0][2];

  const dto = homeDto.safeParse({ coverImgUrl });

  if (dto.error) {
    throw new ClientError(dto.error.errors[0].message);
  }

  return dto.data;
}

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
    getMetadata(),
    getRecentChannel(),
  ]);

  return (
    <Client
      coverImgUrl={metadata.coverImgUrl}
      session={session}
      recentChannels={recentChannelData}
    />
  );
}

import ClientError from '@/libraries/error/clientError';
import { connectOracleDB } from '@/libraries/oracleDB/connection';
import { TMetaRow } from '@/types/db';
import { homeDto } from '@/types/dto';
import Client from './page.client';
import '@/styles/swiper/core.scss';
import { auth } from '@/libraries/nextAuth';
import { TGetChannelRes } from '@api/v1/channel/route';

type TProps = {
  searchParams: {};
};

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

export default async function Page({ searchParams }: TProps) {
  const [session, metadata, recentChannelRes] = await Promise.all([
    auth(),
    getMetadata(),
    fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/v1/channel?order=name_kor&size=20', {
      next: { revalidate: 60, tags: ['channel'] }, // 1분간 캐시
    }).then((res) => res.json() as Promise<TGetChannelRes>),
  ]);

  return (
    <Client
      coverImgUrl={metadata.coverImgUrl}
      session={session}
      recentChannels={recentChannelRes.data}
    />
  );
}

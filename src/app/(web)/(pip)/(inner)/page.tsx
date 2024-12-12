import ClientError from '@/libraries/error/clientError';
import { connectOracleDB } from '@/libraries/oracleDB/connection';
import { TMetaRow } from '@/types/db';
import { homeDto } from '@/types/dto';
import Client from './page.client';
import '@/styles/swiper/core.scss';
import { auth } from '@/libraries/nextAuth';

type TProps = {
  searchParams: {};
};

async function getServerSideProps() {
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
  const { coverImgUrl } = await getServerSideProps();
  const session = await auth();
  return <Client coverImgUrl={coverImgUrl} session={session} />;
}

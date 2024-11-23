import ClientError from '@/libraries/error/clientError';
import { connectOracleDB } from '@/libraries/oracleDB/connection';
import { TMetaRow } from '@/types/db';
import { z } from 'zod';
import Client from './page.client';

type TProps = {
  searchParams: {};
};

const homeDto = z.object({
  coverImgUrl: z.string().url(),
});

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
  return <Client coverImgUrl={coverImgUrl} />;
}

import Home from '@/components/channel/Home';
import { channelDto } from '@/libraries/mongodb/channels';
import { notFound } from 'next/navigation';

type Props = {
  searchParams: Promise<{
    page?: string;
    q?: string;
    'query-type'?: string;
    sort?: 'createAt' | 'name_kor';
  }>;
};

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const page = searchParams.page;
  const query = searchParams.q?.trim();
  const queryType = searchParams['query-type'] || null;
  const sort = searchParams.sort;

  const dto = channelDto.safeParse({
    page,
    query,
    sort,
    queryType,
  });

  if (dto.error) {
    notFound();
  }

  return <Home channelDto={dto.data} />;
}

import Home from '@/components/channel/Home';
import { channelDto } from '@/libraries/mongoDB/getAllChannel';
import { notFound } from 'next/navigation';

type Props = {
  searchParams: Promise<{
    page?: string;
    q?: string;
    sort?: 'createAt' | 'names';
  }>;
};

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const page = searchParams.page;
  const query = searchParams.q?.trim();
  const sort = searchParams.sort;

  const dto = channelDto.safeParse({
    page,
    query,
    sort,
  });

  if (dto.error) {
    notFound();
  }

  return <Home channelDto={dto.data} />;
}

import Background from '@/components/common/background/Background';
import Home from '@/components/schedule/Home';
import { scheduleDto } from '@/types/dto';
import { getCookies } from '@/utils/getCookie';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: Promise<{
    t?: string; // tab
    q?: string; // query
    isFavorite?: boolean;
  }>;
};

export default async function Page(props: Props) {
  const [searchParams, cookies] = await Promise.all([props.searchParams, getCookies()]);

  const dto = scheduleDto.parse({
    query: searchParams.q,
    filter: searchParams.t,
    select: cookies.select,
    isFavorite: searchParams.isFavorite,
  });

  return (
    <Background tile>
      <Home scheduleDto={dto} />
    </Background>
  );
}

import Background from '@/components/common/background/Background';
import Home from '@/components/schedule/Home';
import { auth } from '@/libraries/nextAuth';
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
  const searchParams = await props.searchParams;
  const { select } = await getCookies();
  const session = await auth();

  const dto = scheduleDto.parse({
    query: searchParams.q,
    filter: searchParams.t,
    select,
    isFavorite: searchParams.isFavorite,
  });

  if (dto.isFavorite && !session) {
    redirect('/login');
  }

  return (
    <Background tile>
      <Home scheduleDto={dto} session={session} />
    </Background>
  );
}

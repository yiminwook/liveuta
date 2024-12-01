import Home from '@/components/schedule/Home';
import { scheduleDto } from '@/types/dto';
import { getCookies } from '@/utils/getCookie';
import { auth } from '@/libraries/nextAuth';
import Background from '@/components/common/Background';

type Props = {
  searchParams: {
    t?: string; // tab
    q?: string; // query
  };
};

export default async function Page({ searchParams }: Props) {
  const { select } = await getCookies();
  const session = await auth();

  const dto = scheduleDto.parse({
    query: searchParams.q,
    filter: searchParams.t,
    select,
  });

  return (
    <Background tile expand>
      <Home scheduleDto={dto} session={session} />
    </Background>
  );
}

import Background from '@/components/common/background/Background';
import Header from '@/components/common/header/Header';
import Home from '@/components/schedule/Home';
import { auth } from '@/libraries/nextAuth';
import { scheduleDto } from '@/types/dto';
import { getCookies } from '@/utils/getCookie';

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
    <>
      <Header session={session} />
      <Background tile>
        <Home scheduleDto={dto} session={session} />
      </Background>
    </>
  );
}

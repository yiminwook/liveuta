import Background from '@/components/common/background/Background';
import BottomTab from '@/components/common/bottomTab/BottomTab';
import Header from '@/components/common/header/Header';
import AccountSidebar from '@/components/common/sidebar/Account';
import Sidebar from '@/components/common/sidebar/Sidebar';
import Home from '@/components/schedule/Home';
import { auth } from '@/libraries/nextAuth';
import { scheduleDto } from '@/types/dto';
import { getCookies } from '@/utils/getCookie';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: Promise<{
    t?: string; // tab
    q?: string; // query
  }>;
};

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const { select } = await getCookies();
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const dto = scheduleDto.parse({
    query: searchParams.q,
    filter: searchParams.t,
    select,
  });

  return (
    <>
      <Header session={session} />
      <Background tile>
        <Home scheduleDto={dto} session={session} isFavorite />
      </Background>
      <BottomTab />
      <Sidebar />
      {session && <AccountSidebar session={session} />}
    </>
  );
}

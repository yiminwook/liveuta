import Background from '@/components/common/background/Background';
import Home from '@/components/schedule/Home';
import { redirect } from '@/i18n/routing';
import { auth } from '@/libraries/nextAuth';
import { scheduleDto } from '@/types/dto';
import { getCookies } from '@/utils/getCookie';
import { getLocale } from 'next-intl/server';

type Props = {
  searchParams: Promise<{
    t?: string; // tab
    q?: string; // query
    isFavorite?: boolean;
  }>;
};

export default async function Page(props: Props) {
  const [searchParams, cookies, session, locale] = await Promise.all([
    props.searchParams,
    getCookies(),
    auth(),
    getLocale(),
  ]);

  const dto = scheduleDto.parse({
    query: searchParams.q,
    filter: searchParams.t,
    select: cookies.select,
    isFavorite: searchParams.isFavorite,
  });

  if (dto.isFavorite && !session) {
    redirect({ href: '/login', locale });
  }

  return (
    <Background tile>
      <Home scheduleDto={dto} session={session} />
    </Background>
  );
}

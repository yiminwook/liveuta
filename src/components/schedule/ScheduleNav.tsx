'use client';
import { TScheduleDto } from '@/types/dto';
import { useMediaQuery } from '@mantine/hooks';
import variable from '@variable';
import { Session } from 'next-auth';
import { useRouter } from 'next-nprogress-bar';
import { Link } from 'next-view-transitions';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { TbBoxMultiple4 } from 'react-icons/tb';
import MobileNavButton from './MobileNavButton';
import NavTab from './NavTab';
import QueryButton from './QueryBtn';
import css from './ScheduleNav.module.scss';
import VideoTypeSelect from './VideoTypeSelect';

const ToggleFavorite = dynamic(() => import('./ToggleFavorite'), { ssr: false });

type NavSectionProps = {
  session: Session | null;
  scheduleDto: TScheduleDto;
  length: {
    all: number;
    stream: number;
    video: number;
  };
  isFavorite: boolean;
};

export default function ScheduleNav({ session, scheduleDto, length, isFavorite }: NavSectionProps) {
  const isDesktop = useMediaQuery(`(min-width: ${variable.breakpointSm})`);
  const searchParams = useSearchParams();
  const router = useRouter(); // transition 예외처리

  const clickFavorite = () => {
    const url = `/${isFavorite ? 'schedule' : 'favorite'}?${searchParams.toString()}`;
    router.push(url);
  };

  return (
    <nav className={css.wrap}>
      <div className={css.left}>
        {session && <ToggleFavorite isFavorite={isFavorite} onClick={clickFavorite} />}
        <div className={css.navTabBox}>
          <NavTab />
        </div>
        {isDesktop && (
          <Link className={css.multiLink} href="/multi">
            <TbBoxMultiple4 size="1.5rem" />
          </Link>
        )}
      </div>
      <div className={css.right}>
        <QueryButton query={scheduleDto.query} />
        <VideoTypeSelect select={scheduleDto.select} length={length} />
        <MobileNavButton scheduleDto={scheduleDto} length={length} />
      </div>
    </nav>
  );
}

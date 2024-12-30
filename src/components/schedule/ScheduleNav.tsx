'use client';
import { TScheduleDto } from '@/types/dto';
import { ActionIcon } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import variable from '@variable';
import { Session } from 'next-auth';
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import TbBoxMultiple4 from '~icons/tabler/box-multiple4.jsx';
import MobileNavButton from './MobileNavButton';
import NavTab from './NavTab';
import QueryButton from './QueryBtn';
import css from './ScheduleNav.module.scss';
import ToggleFavorite from './ToggleFavorite';

type NavSectionProps = {
  session: Session | null;
  scheduleDto: TScheduleDto;
  length: {
    all: number;
    stream: number;
    video: number;
  };
};

export default function ScheduleNav({ session, scheduleDto, length }: NavSectionProps) {
  const isDesktop = useMediaQuery(`(min-width: ${variable.breakpointSm})`);
  const searchParams = useSearchParams();
  const router = useRouter(); // transition 예외처리

  const clickFavorite = () => {
    const query = new URLSearchParams(searchParams);
    query.set('isFavorite', String(!scheduleDto.isFavorite));
    router.push(`/schedule?${query.toString()}`);
  };

  return (
    <nav className={css.wrap}>
      <div className={css.left}>
        {session && <ToggleFavorite isFavorite={scheduleDto.isFavorite} onClick={clickFavorite} />}
        <div className={css.navTabBox}>
          <NavTab />
        </div>
        {isDesktop && (
          <ActionIcon
            className={css.multiLink}
            component={Link}
            href="/multi"
            w={40}
            h={40}
            variant="default"
            size="lg"
          >
            <TbBoxMultiple4 width="1.5rem" height="1.5rem" color="inherit" />
          </ActionIcon>
        )}
      </div>
      <div className={css.right}>
        <QueryButton query={scheduleDto.query} />
        <MobileNavButton scheduleDto={scheduleDto} length={length} />
      </div>
    </nav>
  );
}

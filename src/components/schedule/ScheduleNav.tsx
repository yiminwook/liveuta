'use client';
import dynamic from 'next/dynamic';
import MobileNavButton from './MobileNavButton';
import NavTab from './NavTab';
import QueryButton from './QueryBtn';
import VideoTypeSelect from './VideoTypeSelect';
import Link from 'next/link';
import { TbBoxMultiple4 } from 'react-icons/tb';
import { Session } from 'next-auth';
import { useMediaQuery } from '@mantine/hooks';
import variable from '@variable';
import { TScheduleDto } from '@/types/dto';
import css from './ScheduleNav.module.scss';

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

  return (
    <nav className={css.wrap}>
      <div className={css.left}>
        {session && <ToggleFavorite isFavorite={isFavorite} />}
        <div className={css.navTabBox}>
          <NavTab filter={scheduleDto.filter} />
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

'use client';
import dynamic from 'next/dynamic';
import MobileNavButton from './MobileNavButton';
import NavTab from './NavTab';
import QueryButton from './QueryButton';
import VideoTypeSelect from './VideoTypeSelect';
import * as styles from './navSection.css';
import Link from 'next/link';
import { TbBoxMultiple4 } from 'react-icons/tb';
import { Session } from 'next-auth';
import { useMediaQuery } from '@mantine/hooks';
import variable from '@variable';
import { TScheduleDto } from '@/types/dto';

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

export default function NavSection({ session, scheduleDto, length, isFavorite }: NavSectionProps) {
  const isDesktop = useMediaQuery(`(min-width: ${variable.breakpointSm})`);

  return (
    <section className={styles.navSection}>
      <div className={styles.left}>
        {session && <ToggleFavorite isFavorite={isFavorite} />}
        <div className={styles.navTabBox}>
          <NavTab filter={scheduleDto.filter} />
        </div>
        {isDesktop && (
          <Link className={styles.multiLink} href="/multi">
            <TbBoxMultiple4 size="1.5rem" />
          </Link>
        )}
      </div>
      <div className={styles.right}>
        <QueryButton query={scheduleDto.query} />
        <VideoTypeSelect select={scheduleDto.select} length={length} />
        <MobileNavButton scheduleDto={scheduleDto} length={length} />
      </div>
    </section>
  );
}

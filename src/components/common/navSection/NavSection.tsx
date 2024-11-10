'use client';
import { auth } from '@/libraries/nextAuth';
import dynamic from 'next/dynamic';
import MobileNavButton from './MobileNavButton';
import NavTab from './NavTab';
import QueryButton from './QueryButton';
import VideoTypeSelect from './VideoTypeSelect';
import * as styles from './navSection.css';
import Link from 'next/link';
import { TbBoxMultiple4 } from 'react-icons/tb';
import { Session } from 'next-auth';
import { useMediaQuery } from 'react-responsive';
import { BREAK_POINT } from '@/styles/var';

const ToggleFavorite = dynamic(() => import('./ToggleFavorite'), { ssr: false });

type NavSectionProps = {
  session: Session | null;
};

export default function NavSection({ session }: NavSectionProps) {
  const isMobile = useMediaQuery({ query: `(max-width: ${BREAK_POINT.sm}px)` });

  return (
    <section className={styles.navSection}>
      <div className={styles.left}>
        {session && <ToggleFavorite />}
        <div className={styles.navTabBox}>
          <NavTab />
        </div>
        <Link className={styles.multiLink} href="/multi">
          <TbBoxMultiple4 size="1.5rem" />
        </Link>
      </div>
      <div className={styles.right}>
        <QueryButton />
        <VideoTypeSelect />
        <MobileNavButton />
      </div>
    </section>
  );
}

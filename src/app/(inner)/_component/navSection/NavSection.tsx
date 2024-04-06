import { auth } from '@/model/nextAuth';
import dynamic from 'next/dynamic';
import MobileNavButton from './MobileNavButton';
import NavTab from './NavTab';
import QueryButton from './QueryButton';
import VideoTypeSelect from './VideoTypeSelect';
import * as styles from './navSection.css';

const ToggleFavorite = dynamic(() => import('./ToggleFavorite'), { ssr: false });

export default async function NavSection() {
  const session = await auth();

  return (
    <section className={styles.navSection}>
      <div className={styles.left}>
        {session && <ToggleFavorite />}
        <div className={styles.navTabBox}>
          <NavTab />
        </div>
      </div>
      <div className={styles.right}>
        <QueryButton />
        <VideoTypeSelect />
        <MobileNavButton />
      </div>
    </section>
  );
}

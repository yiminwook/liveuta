import { auth } from '@/model/nextAuth';
import MobileNavButton from './MobileNavButton';
import NavTab from './NavTab';
import QueryButton from './QueryButton';
import ToggleFavorite from './ToggleFavorite';
import VideoTypeSelect from './VideoTypeSelect';
import * as styles from './navSection.css';

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

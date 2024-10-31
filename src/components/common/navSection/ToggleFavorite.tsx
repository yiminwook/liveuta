'use client';
import { toggleBlacklistAtom } from '@/stores/schedule';
import { useAtom } from 'jotai';
import { FaStar } from 'react-icons/fa';
import * as styles from './navSection.css';

export default function ToggleFavorite() {
  const [toggleBlacklist, setToggleBlacklist] = useAtom(toggleBlacklistAtom);

  const handleToggle = () => {
    setToggleBlacklist((pre) => {
      localStorage.setItem('favorite', pre ? 'true' : 'false');
      return !pre;
    });
  };

  return (
    <button className={styles.favoriteButton} onClick={handleToggle}>
      <FaStar size="1.2rem" color={toggleBlacklist ? '#a7a7a7' : '#ffbb00'} />
    </button>
  );
}

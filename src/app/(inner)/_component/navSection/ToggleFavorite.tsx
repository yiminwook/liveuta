'use client';
import { toggleBlacklistAtom } from '@inner/_lib/atom/schedule';
import { useAtom } from 'jotai';
import { FaStar } from 'react-icons/fa';
import * as styles from './navSection.css';

export default function ToggleFavorite() {
  const [toggle, setToggle] = useAtom(toggleBlacklistAtom);

  const handleToggle = () => setToggle((pre) => !pre);
  return (
    <button className={styles.favoriteButton} onClick={handleToggle}>
      <FaStar size="1.2rem" color={!toggle ? '#ffbb00' : '#a7a7a7'} />
    </button>
  );
}

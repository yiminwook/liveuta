'use client';
import { FaStar } from 'react-icons/fa';
import * as styles from './navSection.css';

type ToggleFavoriteProps = {
  isFavorite: boolean;
};

export default function ToggleFavorite({ isFavorite }: ToggleFavoriteProps) {
  return (
    <button className={styles.favoriteButton} onClick={() => {}}>
      <FaStar size="1.2rem" color={isFavorite ? '#ffbb00' : '#a7a7a7'} />
    </button>
  );
}

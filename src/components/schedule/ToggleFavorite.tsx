import { FaStar } from 'react-icons/fa';
import css from './ScheduleNav.module.scss';

type ToggleFavoriteProps = {
  isFavorite: boolean;
  onClick: () => void;
};

export default function ToggleFavorite({ isFavorite, onClick }: ToggleFavoriteProps) {
  return (
    <button className={css.favoriteBtn} onClick={onClick}>
      <FaStar size="1.2rem" color={isFavorite ? '#ffbb00' : '#a7a7a7'} />
    </button>
  );
}

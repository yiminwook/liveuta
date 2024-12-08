import PlaceHolder from '@/components/common/input/Placeholder';
import { useId } from 'react';
import css from './List.module.scss';

const COUNT = Array.from({ length: 5 });

export default function ListPlaceholder() {
  const id = useId();
  return (
    <div className={css.wrap}>
      <ul className={css.list}>
        {COUNT.map((_, index) => (
          <li key={`listPlaceHolder_${index}_${id}`} className={css.row}>
            <PlaceHolder height="1.6rem" />
          </li>
        ))}
      </ul>
    </div>
  );
}

import { Skeleton } from '@mantine/core';
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
            <Skeleton height="1.6rem" />
          </li>
        ))}
      </ul>
    </div>
  );
}

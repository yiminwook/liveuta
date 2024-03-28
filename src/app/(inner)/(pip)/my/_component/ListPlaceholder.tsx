import PlaceHolder from '@inner/_component/input/Placeholder';
import { useId } from 'react';
import * as styles from './list.css';

const COUNT = Array.from({ length: 5 });

export default function ListPlaceholder() {
  const id = useId();
  return (
    <div className={styles.wrap}>
      <ul className={styles.list}>
        {COUNT.map((_, index) => (
          <li key={`listPlaceHolder_${index}_${id}`} className={styles.row}>
            <PlaceHolder height="1.6rem" />
          </li>
        ))}
      </ul>
    </div>
  );
}

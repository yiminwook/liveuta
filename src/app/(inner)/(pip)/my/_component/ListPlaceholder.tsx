import PlaceHolder from '@inner/_component/input/Placeholder';
import * as styles from './list.css';

export default function ListPlaceholder() {
  return (
    <ul className={styles.wrap}>
      <li className={styles.row}>
        <PlaceHolder height="1rem" />
      </li>
      <li className={styles.row}>
        <PlaceHolder height="1rem" />
      </li>
      <li className={styles.row}>
        <PlaceHolder height="1rem" />
      </li>
      <li className={styles.row}>
        <PlaceHolder height="1rem" />
      </li>
      <li className={styles.row}>
        <PlaceHolder height="1rem" />
      </li>
    </ul>
  );
}

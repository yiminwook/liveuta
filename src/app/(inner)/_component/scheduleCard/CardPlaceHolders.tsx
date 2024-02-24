import { BREAK_POINT } from '@/style/var';
import * as styles from './card.css';
import MediaQuery from 'react-responsive';

const ITEMS = Array.from({ length: 10 }, (_, i) => i);

export default function CardPlaceHolders() {
  return (
    <MediaQuery minWidth={BREAK_POINT.sm}>
      {ITEMS.map((index) => (
        <div key={`schedule_card_placeHolder_${index}`} className={styles.cardBase} />
      ))}
    </MediaQuery>
  );
}

import * as styles from './card.css';
import cx from 'classnames';

const ITEMS = Array.from({ length: 10 }, (_, i) => i);

export default function CardPlaceHolders() {
  return (
    <>
      {ITEMS.map((index) => (
        <div
          key={`schedule_card_placeHolder_${index}`}
          className={cx(styles.cardBase, styles.cardPlaceHolder)}
        />
      ))}
    </>
  );
}

import * as styles from './card.css';

const ITEMS = Array.from({ length: 10 }, (_, i) => i);

interface CardPlaceHolderProps {
  isMobile: boolean;
}

export default function CardPlaceHolders({ isMobile }: CardPlaceHolderProps) {
  if (isMobile) return null;

  return (
    <>
      {ITEMS.map((index) => (
        <div key={`schedule_card_placeHolder_${index}`} className={styles.cardBase} />
      ))}
    </>
  );
}

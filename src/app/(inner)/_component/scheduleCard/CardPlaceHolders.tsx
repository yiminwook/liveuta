/** @jsxImportSource @emotion/react */
import { cardBase } from './Style';

const ITEMS = Array.from({ length: 10 }, (_, i) => i);

interface CardPlaceHolderProps {
  isMobile: boolean;
}

const CardPlaceHolders = ({ isMobile }: CardPlaceHolderProps) => {
  if (isMobile) return null;

  return (
    <>
      {ITEMS.map((index) => (
        <div key={`schedule_card_placeHolder_${index}`} css={cardBase} />
      ))}
    </>
  );
};

export default CardPlaceHolders;

import { cardBase, CardPlaceHolderBox } from '@/components/common/scheduleCard/Style';

const ITEMS = Array.from({ length: 10 }, (_, i) => i);

const CardPlaceHolder = () => {
  return (
    <>
      {ITEMS.map((index) => (
        <CardPlaceHolderBox key={`schedule_card_placeHolder_${index}`} css={cardBase} />
      ))}
    </>
  );
};

export default CardPlaceHolder;

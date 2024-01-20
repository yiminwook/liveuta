import { CardPlaceHolderBox } from '@/components/common/scheduleCard/Style';

const ITEMS = Array.from({ length: 10 }, (_, i) => i);

const CardPlaceHolders = () => {
  return (
    <>
      {ITEMS.map((index) => (
        <CardPlaceHolderBox key={`schedule_card_placeHolder_${index}`} />
      ))}
    </>
  );
};

export default CardPlaceHolders;

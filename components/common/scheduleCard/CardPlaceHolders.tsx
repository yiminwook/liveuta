import { CardPlaceHolderBox } from '@/components/common/scheduleCard/Style';

const ITEMS = Array.from({ length: 10 }, (_, i) => i);

interface CardPlaceHolderProps {
  isMobile: boolean;
}

const CardPlaceHolders = ({ isMobile }: CardPlaceHolderProps) => {
  if (isMobile) return null;

  return (
    <>
      {ITEMS.map((index) => (
        <CardPlaceHolderBox key={`schedule_card_placeHolder_${index}`} />
      ))}
    </>
  );
};

export default CardPlaceHolders;

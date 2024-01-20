import { cardBase } from '@/components/common/scheduleCard/Style';

const ITEMS = Array.from({ length: 10 }, (_, i) => i);

const ScheduleCardPlaceHolder = () => {
  return (
    <>
      {ITEMS.map((index) => (
        <div key={`schedule_card_placeHolder_${index}`} css={cardBase} />
      ))}
    </>
  );
};

export default ScheduleCardPlaceHolder;

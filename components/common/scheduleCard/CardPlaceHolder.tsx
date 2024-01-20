import { cardBase } from '@/components/common/scheduleCard/Card';
import styled from '@emotion/styled';

const Card = styled.div`
  ${cardBase}
`;

const ITEMS = Array.from({ length: 10 }, (_, i) => i);

const ScheduleCardPlaceHolder = () => {
  return (
    <>
      {ITEMS.map((index) => (
        <Card key={`schedule_card_placeHolder_${index}`} />
      ))}
    </>
  );
};

export default ScheduleCardPlaceHolder;

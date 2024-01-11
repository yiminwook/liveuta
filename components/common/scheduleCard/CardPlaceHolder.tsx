import { CardBase } from '@/app/test/Card';
import styled from '@emotion/styled';

const Card = styled.div`
  ${CardBase}
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

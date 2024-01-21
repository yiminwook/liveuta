import Main from '@/app/page.client';
import Hydrate from '@/components/home/Hydrate';

const DailyPage = async () => {
  return (
    <Hydrate filter="daily">
      <Main />
    </Hydrate>
  );
};

export default DailyPage;

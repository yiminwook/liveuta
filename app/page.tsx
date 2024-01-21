import Main from '@/app/page.client';
import Hydrate from '@/components/home/Hydrate';

const HomePage = async () => {
  return (
    <Hydrate filter="scheduled">
      <Main />
    </Hydrate>
  );
};

export default HomePage;

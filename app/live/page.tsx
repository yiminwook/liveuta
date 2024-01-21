import Main from '@/app/page.client';
import Hydrate from '@/components/home/Hydrate';

const LivePage = async () => {
  return (
    <Hydrate filter="live">
      <Main />
    </Hydrate>
  );
};

export default LivePage;

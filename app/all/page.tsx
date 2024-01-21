import Main from '@/app/page.client';
import Hydrate from '@/components/home/Hydrate';

const AllPage = async () => {
  return (
    <Hydrate filter="all">
      <Main />
    </Hydrate>
  );
};

export default AllPage;

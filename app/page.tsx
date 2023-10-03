import Main from '@/app/page.client';
import { getCookies } from '@/utils/getCookie';

const HomePage = () => {
  const { select } = getCookies();
  return <Main select={select} />;
};

export default HomePage;

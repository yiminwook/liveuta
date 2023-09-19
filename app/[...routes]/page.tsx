import { notFound } from 'next/navigation';

/**
 *  next 13.4.19 이하 버전에서 not-found.tsx로 이동하지 않는 문제
 *
 *  버전을 올리면 해결되는 문제이지만, 버전을 올리지 않고 해결하는 방법 (임시)
 */
const NotfoundRouter = () => {
  notFound();
};

export default NotfoundRouter;

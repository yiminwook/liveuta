import { Metadata } from 'next';

const forbidden = () => {
  return <div className="forbidden">404 Not Found</div>;
};

export default forbidden;

export const metadata: Metadata = {
  title: '404 Not Found',
};

import Iframe from '@/components/common/Iframe';

const RequestPage = async () => {
  return <Iframe url={process.env.NEXT_PUBLIC_REQUEST_URL} />;
};

export default RequestPage;

import Iframe from '@/components/common/Iframe';
import { serverEnvConfig } from '@/configs/envConfig';

const getRequestUrl = async () => {
  const { REQUEST_URL } = serverEnvConfig();

  return { url: REQUEST_URL };
};

const RequestPage = async () => {
  const { url } = await getRequestUrl();
  return (
    <>
      <Iframe url={url} />
    </>
  );
};

export default RequestPage;

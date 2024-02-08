import Iframe from '@/components/common/Iframe';
import { serverEnvConfig } from '@/configs/envConfig';

const RequestPage = async () => {
  const { REQUEST_URL } = serverEnvConfig();

  return <Iframe url={REQUEST_URL} />;
};

export default RequestPage;

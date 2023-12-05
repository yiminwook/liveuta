import Iframe from '@/components/common/Iframe';
import { serverEnvConfig } from '@/configs/envConfig';

const ShortPage = async () => {
  const { SHORT_URL } = serverEnvConfig();

  return <Iframe url={SHORT_URL} />;
};

export default ShortPage;

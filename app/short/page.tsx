import Iframe from '@/components/common/Iframe';
import { serverEnvConfig } from '@/configs/envConfig';

const getShortUrl = async () => {
  const { SHORT_URL } = serverEnvConfig();

  return { url: SHORT_URL };
};

const ShortPage = async () => {
  const { url } = await getShortUrl();

  return (
    <>
      <Iframe url={url} />
    </>
  );
};

export default ShortPage;

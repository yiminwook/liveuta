import Iframe, { IframeProps } from '@/components/common/Iframe';
import { serverEnvConfig } from '@/configs';
import { GetStaticProps } from 'next';

interface ShortPageProps extends IframeProps {}

const ShortPage = ({ url }: ShortPageProps) => {
  return (
    <>
      <Iframe url={url} />
    </>
  );
};

export default ShortPage;

export const getStaticProps: GetStaticProps = () => {
  const { SHORT_URL } = serverEnvConfig();

  return { props: { url: SHORT_URL } };
};

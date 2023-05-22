import Iframe, { IframeProps } from '@/components/common/Iframe';
import { serverEnvConfig } from '@/configs';
import { GetStaticProps } from 'next';

interface RequestPageProps extends IframeProps {}

const RequestPage = ({ url }: RequestPageProps) => {
  return (
    <>
      <Iframe url={url} />
    </>
  );
};

export default RequestPage;

export const getStaticProps: GetStaticProps = () => {
  const { REQUEST_URL } = serverEnvConfig();

  return { props: { url: REQUEST_URL } };
};

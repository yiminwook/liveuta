import Iframe, { IframeProps } from '@/components/common/Iframe';
import { REQUEST_URL } from '@/consts';
import getENV from '@/utils/getENV';
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
  const url = getENV(REQUEST_URL);
  return { props: { url } };
};

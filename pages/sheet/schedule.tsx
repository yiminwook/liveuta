import Iframe, { IframeProps } from '@/components/common/Iframe';
import { serverEnvConfig } from '@/configs';
import { GetStaticProps } from 'next';

interface ShortPageProps extends IframeProps {}

const ChannelSheetPage = ({ url }: ShortPageProps) => {
  return (
    <>
      <Iframe url={url} />
    </>
  );
};

export default ChannelSheetPage;

export const getStaticProps: GetStaticProps = () => {
  const { CONTENTS_SHEET_ID } = serverEnvConfig();

  const url = `https://docs.google.com/spreadsheets/d/${CONTENTS_SHEET_ID}`;
  return { props: { url } };
};

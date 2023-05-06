import Iframe, { IframeProps } from '@/components/common/Iframe';
import { CONTENTS_SHEET_ID } from '@/consts';
import getENV from '@/utils/getENV';
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
  const sheetId = getENV(CONTENTS_SHEET_ID);
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}`;
  return { props: { url } };
};

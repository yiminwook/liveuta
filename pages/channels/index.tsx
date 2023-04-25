import { ITEMS_PER_PAGE } from '@/const';
import { getGoogleSheet } from '@/models/sheet/GoogleSheet';
import getENV from '@/utils/GetENV';

interface ChannelsPageProps {}

const ChannelsPage = () => {
  return <main></main>;
};

export default ChannelsPage;

export const getStaticProps = async ({}: ChannelsPageProps) => {
  const spreadsheetId = getENV('channelsheetId');
  const key = getENV('sheet_apiKey');
  const range = 'reference';
  const sheetData = await getGoogleSheet({ spreadsheetId, key, range });
  const sliceData = sheetData.values?.slice(0, ITEMS_PER_PAGE) ?? [];

  return { props: {} };
};

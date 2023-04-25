import { CHANNELS_SHEET_ID, CHANNELS_SHEET_RANGE, ITEMS_PER_PAGE } from '@/const';
import { getSheet } from '@/models/sheet/Sheets';
import getENV from '@/utils/GetENV';

interface ChannelsPageProps {}

const ChannelsPage = () => {
  return <main></main>;
};

export default ChannelsPage;

export const getStaticProps = async ({}: ChannelsPageProps) => {
  // const spreadsheetId = getENV(CHANNELS_SHEET_ID);
  // const range = getENV(CHANNELS_SHEET_RANGE);
  // const sheetData = await getSheet({ spreadsheetId, range });
  // const sliceData = sheetData.values?.slice(0, ITEMS_PER_PAGE) ?? [];
  // const channels = sliceData.map((data) => console.log(data));

  return { props: {} };
};

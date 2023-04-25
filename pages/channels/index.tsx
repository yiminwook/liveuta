import { getGoogleSheetData } from '@/models/sheet/GoogleSheet';
import getEnv from '@/utils/get_env';

interface ChannelsPageProps {}

const ChannelsPage = () => {
  const getChannel = (searchValue: string) => {
    console.log(searchValue);
  };

  return <main></main>;
};

export default ChannelsPage;

export const getStaticProps = async ({}: ChannelsPageProps) => {
  const spreadsheetId = getEnv('channelsheetId');
  const key = getEnv('sheet_apiKey');
  const range = 'reference';
  const sheetData = await getGoogleSheetData({ spreadsheetId, key, range });
  console.log(sheetData);
  return { props: {} };
};

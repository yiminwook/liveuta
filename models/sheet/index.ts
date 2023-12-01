import { serverEnvConfig } from '@/configs/envConfig';
import { google } from 'googleapis';
import { customFetchCached, customFetchNoCached } from '@/models/customFetch';

export interface SheetConfigType {
  spreadsheetId: string;
  key: string;
  range: string;
}

const { GOOGLE_API_KEY } = serverEnvConfig();

const auth = new google.auth.JWT(
  process.env.FIREBASE_CLIENT_EMAIL,
  '',
  process.env.FIREBASE_PRIVATE_KEY!.replaceAll(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets'],
);

export const sheetService = google.sheets({ version: 'v4', auth });

export const getSheet = async ({
  spreadsheetId,
  range,
  cache = true,
}: Omit<SheetConfigType, 'key'> & { cache?: boolean }) => {
  const sheetConfig: SheetConfigType = {
    spreadsheetId,
    key: GOOGLE_API_KEY,
    range,
  };

  const response = await sheetService.spreadsheets.values.get(sheetConfig, {
    fetchImplementation: cache ? customFetchCached : customFetchNoCached,
  });

  const data = response.data;

  return data;
};

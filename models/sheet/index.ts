import { serverEnvConfig } from '@/configs/envConfig';
import { google } from 'googleapis';
import { customFetchCached, customFetchNoCached } from '@/models/customFetch';

export interface SheetConfigType {
  spreadsheetId: string;
  key: string;
  range: string;
}

const { GOOGLE_API_KEY } = serverEnvConfig();

export const sheetService = google.sheets({ version: 'v4' });

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

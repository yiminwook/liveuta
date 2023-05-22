import { serverEnvConfig } from '@/configs';
import { google } from 'googleapis';

export interface SheetConfigType {
  spreadsheetId: string;
  key: string;
  range: string;
}

const { GOOGLE_API_KEY } = serverEnvConfig();

export const sheetService = google.sheets({ version: 'v4' });

export const getSheet = async ({ spreadsheetId, range }: Omit<SheetConfigType, 'key'>) => {
  const sheetConfig: SheetConfigType = {
    spreadsheetId,
    key: GOOGLE_API_KEY,
    range,
  };

  const response = await sheetService.spreadsheets.values.get(sheetConfig);
  const data = response.data;

  return data;
};

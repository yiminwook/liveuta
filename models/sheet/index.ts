import { GOOGLE_API_KEY } from '@/consts';
import getENV from '@/utils/getENV';
import { google } from 'googleapis';

export interface SheetConfigType {
  spreadsheetId: string;
  key: string;
  range: string;
}

export const sheetService = google.sheets({ version: 'v4' });

export const getSheet = async ({ spreadsheetId, range }: Omit<SheetConfigType, 'key'>) => {
  const key = getENV(GOOGLE_API_KEY);

  const sheetConfig: SheetConfigType = {
    spreadsheetId,
    key,
    range,
  };

  const response = await sheetService.spreadsheets.values.get(sheetConfig);
  const data = response.data;

  return data;
};

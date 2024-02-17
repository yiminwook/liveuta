import { google } from 'googleapis';
import { jwtAuth } from '@/model/firebase/admin';

export interface SheetConfigType {
  spreadsheetId: string;
  key: string;
  range: string;
}

export const getSheet = async ({ spreadsheetId, range }: Omit<SheetConfigType, 'key'>) => {
  const accessToken = await jwtAuth.getAccessToken();

  if (!accessToken.token) throw new Error('accessToken is not exist');

  const sheetService = google.sheets({ version: 'v4', auth: jwtAuth });

  const response = await sheetService.spreadsheets.values.get(
    {
      spreadsheetId,
      access_token: accessToken.token,
      range,
    },
    {
      fetchImplementation: fetch,
    },
  );

  const data = response.data;

  return data;
};

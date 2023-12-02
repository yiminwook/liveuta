import { google } from 'googleapis';
import { customFetchCached, customFetchNoCached } from '@/models/customFetch';

export interface SheetConfigType {
  spreadsheetId: string;
  key: string;
  range: string;
}

export const jwtAuth = new google.auth.JWT(
  process.env.FIREBASE_CLIENT_EMAIL,
  '',
  process.env.FIREBASE_PRIVATE_KEY!.replaceAll(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets'],
);

export const getSheet = async ({
  spreadsheetId,
  range,
  cache = true,
}: Omit<SheetConfigType, 'key'> & { cache?: boolean }) => {
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
      fetchImplementation: cache ? customFetchCached : customFetchNoCached,
    },
  );

  const data = response.data;

  return data;
};

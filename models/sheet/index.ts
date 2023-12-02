import { google } from 'googleapis';
import { serverEnvConfig } from '@/configs/envConfig';

const { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = serverEnvConfig();
const SHEET_SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
export const SHEET_SCOPES = [SHEET_SCOPE];

export interface SheetConfigType {
  spreadsheetId: string;
  key: string;
  range: string;
}

export const jwtAuth = new google.auth.JWT(FIREBASE_CLIENT_EMAIL, '', FIREBASE_PRIVATE_KEY, SHEET_SCOPES);

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

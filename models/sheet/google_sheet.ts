import { google } from 'googleapis';

export interface GoogleSheetConfigType {
  spreadsheetId: string;
  key: string;
  range: string;
}

export const googleSheetService = google.sheets({ version: 'v4' });

export const getGoogleSheetData = async ({ spreadsheetId, key, range }: GoogleSheetConfigType) => {
  const googleSheetConfig: GoogleSheetConfigType = {
    spreadsheetId,
    key,
    range,
  };

  const getService = await googleSheetService.spreadsheets.values.get(googleSheetConfig);
  const data = getService.data;

  return data;
};

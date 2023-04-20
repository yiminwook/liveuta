import { google } from 'googleapis';

export const googleSheetService = google.sheets({ version: 'v4' });

export const getGoogleSheetData = async () => {
  const googleSheetConfig = {
    spreadsheetId: process.env.spreadsheetId ?? '',
    key: process.env.sheet_apiKey ?? '',
    range: process.env.upcoming_sheet_range ?? 'Upcoming',
  };

  const getService = await googleSheetService.spreadsheets.values.get(googleSheetConfig);
  const data = getService.data;

  return data;
};

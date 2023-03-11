import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

interface Data {
  range: string;
  majorDmension: string;
  values: [string, string, string, string][];
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const service = google.sheets({ version: "v4" });
  const result = await service.spreadsheets.values.get({
    spreadsheetId: process.env.spreadsheetId || "",
    key: process.env.sheet_apiKey || "",
    range: "시트1",
  });
  const data = result.data as Data;
  const converterData = data.values.map(
    ([title, url, channeName, scheduledTime]) => {
      const date = new Date(scheduledTime);
      return { title, url, channeName, scheduledTime };
    }
  );
  return res.status(200).json(converterData);
}

// https://developers.google.com/sheets/api/guides/concepts?hl=ko#cell

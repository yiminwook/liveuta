import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

interface Data {
  range: string;
  majorDmension: string;
  values: string[][];
}

interface ConverterData {
  title: string;
  url: string;
  channelName: string;
  scheduledTime: string;
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
  let init: ConverterData[] = [];
  const converterData: ConverterData[] = data.values.reduce(
    (acc, [title, url, channelName, scheduledTime], index) => {
      if (index === 0) {
        return [...acc];
      }
      return [...acc, { title, url, channelName, scheduledTime }];
    },
    init
  );

  return res.status(200).json(converterData);
}

// https://developers.google.com/sheets/api/guides/concepts?hl=ko#cell

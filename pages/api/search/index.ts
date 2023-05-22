import type { NextApiRequest, NextApiResponse } from 'next';
import { ContentsDataType, ContentsRowType } from '@/types/inSheet';
import { getSheet } from '@/models/sheet';
import { SEARCH_ITEMS_SIZE } from '@/consts';
import { parseSheetData } from '@/utils/parseContentSheet';
import { parseChannelIDSheet } from '@/utils/parseChannelSheet';
import { ChannelSheetDataType, combineChannelData } from '@/utils/combineChannelData';
import { ChannelsDataType } from '@/types/inYoutube';
import { serverEnvConfig } from '@/configs';

export interface SearchResponseType {
  contents: ContentsDataType[];
  channels: ChannelsDataType[];
}

const { CONTENTS_SHEET_ID, CONTENTS_SHEET_RANGE } = serverEnvConfig();

const handler = async (req: NextApiRequest, res: NextApiResponse<SearchResponseType>) => {
  try {
    if (req.method !== 'GET') throw new Error('Invaild HTTP method');

    const { query } = req.query;
    if (!query) throw new Error('No query');
    const nameQuery = decodeURIComponent(query.toString());
    const regex = new RegExp(nameQuery, 'g');

    const contentsSheetData = await getSheet({ spreadsheetId: CONTENTS_SHEET_ID, range: CONTENTS_SHEET_RANGE });
    const contentsSheetDataValue = contentsSheetData.values as ContentsRowType[];
    if (!contentsSheetDataValue) throw new Error('No ContentsValues');

    const searchedContents: ContentsDataType[] = [];

    contentsSheetDataValue.forEach((value, index) => {
      if (index === 0) return;
      const name = value[2];
      if (!regex.test(name)) return;
      const data = parseSheetData(value);
      if (!data) return;
      searchedContents.push(data);
    });

    searchedContents.sort((a, b) => b.timestamp - a.timestamp); //최신순

    const { sheetDataValues } = await parseChannelIDSheet();

    const searchData: ChannelSheetDataType = {};
    sheetDataValues.forEach(([uid, channelName, url]) => {
      if (Object.keys(searchData).length >= SEARCH_ITEMS_SIZE) return;
      if (searchData[uid]) return;
      if (!regex.test(channelName)) return;
      searchData[uid] = { uid, channelName, url };
    });

    const combinedSearchDataValues = await combineChannelData(searchData);

    return res.status(200).json({
      contents: searchedContents,
      channels: combinedSearchDataValues,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).end();
  }
};

export default handler;

// https://developers.google.com/sheets/api/guides/concepts?hl=ko#cell

// const result = await google
//     .sheets({ version: "v4" })
//     .spreadsheets.values.update({
//       spreadsheetId:
//       range: "A1",
//       requestBody: {
//         values: [["입력"], ["입력2"], [1]],
//       },
//       valueInputOption: "RAW",
//      );
//   console.log(result.data);

import type { NextApiRequest, NextApiResponse } from 'next';
import { ContentsDataType, ContentsRowType } from '@/models/sheet/InSheet';
import { getSheet } from '@/models/sheet/Sheets';
import getENV from '@/utils/GetENV';
import { CONTENTS_SHEET_ID, CONTENTS_SHEET_RANGE, SEARCH_ITEMS_SIZE } from '@/consts';
import { parseSheetData } from '@/utils/ParseContentSheet';
import { parseChannelIDSheet } from '@/utils/ParseChannelSheet';
import { ChannelSheetDataType, combineChannelData } from '@/utils/CombineChannelData';
import { ChannelsDataType } from '@/models/youtube/InChannel';

export interface SearchResponseType {
  contents: ContentsDataType[];
  channels: ChannelsDataType[];
}

const handler = async (req: NextApiRequest, res: NextApiResponse<SearchResponseType>) => {
  try {
    if (req.method !== 'GET') throw new Error('Invaild HTTP method');

    const { query } = req.query;
    if (!query) throw new Error('No query');
    const nameQuery = decodeURIComponent(query.toString());
    const regex = new RegExp(nameQuery, 'g');

    const contentsSheetId = getENV(CONTENTS_SHEET_ID);
    const contentsSheetRange = getENV(CONTENTS_SHEET_RANGE);
    const contentsSheetData = await getSheet({ spreadsheetId: contentsSheetId, range: contentsSheetRange });
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

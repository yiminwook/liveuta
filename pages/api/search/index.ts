import type { NextApiRequest, NextApiResponse } from 'next';
import { ContentsDataType, ContentsRowType } from '@/models/sheet/InSheet';
import { getSheet } from '@/models/sheet/Sheets';
import getENV from '@/utils/GetENV';
import { CONTENTS_SHEET_ID, CONTENTS_SHEET_RANGE } from '@/consts';
import { parseSheetData } from '@/utils/ParseContentSheet';
import { parseChannelIDSheet } from '@/utils/ParseChannelSheet';
import { getYoutubeChannels } from '@/models/youtube/Channel';
import { combineChannelData } from '@/utils/ParseChannelData';
import { ChannelRowType, ChannelsDataType } from '@/models/youtube/InChannel';

export interface SearchResponseType {
  contents: ContentsDataType[];
  channels: ChannelsDataType[];
}

const handler = async (req: NextApiRequest, res: NextApiResponse<SearchResponseType>) => {
  try {
    if (req.method !== 'GET') throw new Error('invaild method');

    const { name } = req.query;
    if (!name) throw new Error('No query');
    const nameQuery = decodeURIComponent(name.toString());
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
    const searchData: ChannelRowType[] = [];
    sheetDataValues.forEach((value) => {
      if (searchData.length >= 6) return; //채널 검색 12개로 제한
      if (!regex.test(value[1])) return;
      searchData.push(value);
    });
    const callYoubeAPI = searchData.map(([uid, _channelName, _url]) => {
      return getYoutubeChannels(uid);
    });
    const youtubeData = await Promise.all(callYoubeAPI);
    const searchedChannels = combineChannelData({ youtubeData, sheetData: searchData });

    return res.status(200).json({
      contents: searchedContents,
      channels: searchedChannels,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).end();
  }
};

export default handler;

// https://developers.google.com/sheets/api/guides/concepts?hl=ko#cell

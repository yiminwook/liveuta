import { ContentsDataType, ContentsRowType } from '@/types/inSheet';
import { getSheet } from '@/models/sheet';
import { parseSheetData } from '@/utils/parseContentSheet';
import { parseChannelIDSheet } from '@/utils/parseChannelSheet';
import { ChannelSheetDataType, combineChannelData } from '@/utils/combineChannelData';
import { ChannelsDataType } from '@/types/inYoutube';
import { serverEnvConfig } from '@/configs/envConfig';
import { NextRequest, NextResponse } from 'next/server';
import errorHandler from '@/models/error/handler';
import { replaceSpecialCharacters } from '@/utils/regexp';
import { SEARCH_ITEMS_SIZE } from '@/consts';

export interface SearchResponseType {
  contents: ContentsDataType[];
  channels: ChannelsDataType[];
}

const { CONTENTS_SHEET_ID, CONTENTS_SHEET_RANGE } = serverEnvConfig();

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    if (!query) throw new Error('No query');
    const decodeQuery = decodeURIComponent(query);
    const replacedQuery = replaceSpecialCharacters(decodeQuery);

    if (replacedQuery === '') {
      return NextResponse.json<SearchResponseType>(
        {
          contents: [],
          channels: [],
        },
        { status: 200 },
      );
    }

    const regex = new RegExp(replacedQuery);

    const contentsSheetData = await getSheet({ spreadsheetId: CONTENTS_SHEET_ID, range: CONTENTS_SHEET_RANGE });
    const contentsSheetDataValue = contentsSheetData.values as ContentsRowType[];
    if (!contentsSheetDataValue) throw new Error('No ContentsValues');

    const searchedContents: ContentsDataType[] = [];

    contentsSheetDataValue.forEach((value, index) => {
      if (index === 0) return;
      const name = value[2];

      if (regex.test(name) === false) return;
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
      if (regex.test(channelName) === false) return;
      searchData[uid] = { uid, channelName, url };
    });

    const combinedSearchDataValues = await combineChannelData(searchData);

    return NextResponse.json<SearchResponseType>(
      {
        contents: searchedContents,
        channels: combinedSearchDataValues,
      },
      { status: 200 },
    );
  } catch (error) {
    const { status, message } = errorHandler(error);
    return NextResponse.json({ error: message }, { status });
  }
};

export const dynamic = 'force-dynamic';

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

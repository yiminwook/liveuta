import { DocumentList, ContentDocument, ChannelDocument, ContentsDataType, ContentDocumentRaw } from '@/type/api/mongoDB';
import { parseMongoDBDocument } from '@/app/api/_lib/parseMongoDBData';
import { readDB } from '@/model/mongoDBService/';
import { ChannelSheetDataType, combineChannelData } from '@inner/_lib/combineChannelData';
import { ChannelsDataType } from '@/type/api/youtube';
import { NextRequest, NextResponse } from 'next/server';
import errorHandler from '@/model/error/handler';
import { replaceSpecialCharacters } from '@inner/_lib/regexp';
import { SEARCH_ITEMS_SIZE } from '@/const';
import dayjs from '@/model/dayjs';

export interface SearchResponseType {
  contents: ContentsDataType[];
  channels: ChannelsDataType[];
}

export async function GET(req: NextRequest) {
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

    // Execute both database queries concurrently
    const regexforDBQuery = { $regex: replacedQuery, $options: "i" };
    const [channelResults, contentResults]: [DocumentList<ChannelDocument>, DocumentList<ContentDocument>] = await Promise.all([
      readDB('channel_id_names', 'ManagementDB', { filter: { "name_kor": regexforDBQuery } }),
      readDB('upcoming_streams', 'ScheduleDB', { filter: { "ChannelName": regexforDBQuery } })
    ]);

    const searchedContents: ContentsDataType[] = [];
    contentResults.forEach((doc: ContentDocumentRaw) => {
      const data = parseMongoDBDocument({ ...doc, ScheduledTime: dayjs(doc.ScheduledTime) });
      if (!data) return;
      searchedContents.push(data);
    });

    const searchData: ChannelSheetDataType = {};
    channelResults.forEach(
      ({ _id, channel_id, name_kor, channel_addr, handle_name, waiting }: ChannelDocument) => {
        if (Object.keys(searchData).length >= SEARCH_ITEMS_SIZE) return;
        if (searchData[channel_id]) return;
        searchData[channel_id] = { uid: channel_id, channelName: name_kor, url: channel_addr };
      },
    );
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
}

export const dynamic = 'force-dynamic';

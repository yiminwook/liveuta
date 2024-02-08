import { ContentDocument, ChannelDocument, DocumentList, ContentsDataType } from '@/types/inMongoDB';
import { parseMongoDBDocument } from '@/utils/parseMongoDBData';
import { readDB } from '@/models/mongoDBService/';
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

    // Execute both database queries concurrently
    // const regexforDBQuery = { $regex: replacedQuery, $options: "i" };
    const [channelResults, contentResults] = await Promise.all([
      readDB('channel_id_names', 'ManagementDB', { filter: { "name_kor": replacedQuery } }),
      readDB('upcoming_streams', 'ScheduleDB', { filter: { "ChannelName": replacedQuery } })
    ]);

    const searchedContents: ContentsDataType[] = [];
    contentResults['documents'].forEach((doc:ContentDocument) => {
      const data = parseMongoDBDocument(doc);
      if (!data) return;
      searchedContents.push(data);
    });
    
    const searchData: ChannelSheetDataType = {};
    channelResults['documents'].forEach(({ _id, channel_id, name_kor, channel_addr, handle_name, waiting }:ChannelDocument) => {
      if (Object.keys(searchData).length >= SEARCH_ITEMS_SIZE) return;
      if (searchData[channel_id]) return;
      searchData[channel_id] = { uid: channel_id, channelName: name_kor, url: channel_addr };
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

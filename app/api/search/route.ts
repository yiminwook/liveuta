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
  channels: any; // Set temporarily to accept any type
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

    const regex = new RegExp(replacedQuery);
    const channelResults = await readDB('ManagementDB', 'channel_id_names', { "name_kor": { $regex: regex, $options: "i" } });
    const contentResults = await readDB('ScheduleDB', 'upcoming_streams', { "ChannelName": { $regex: regex, $options: "i" } });

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
      searchData[channel_id] = { channel_id, name_kor, channel_addr };
    });
    const combinedSearchDataValues = await combineChannelData(searchData);

    
    return NextResponse.json<SearchResponseType>(
      {
        contents: searchedContents,
        channels: [],//combinedSearchDataValues,
      },
      { status: 200 },
    );
  } catch (error) {
    const { status, message } = errorHandler(error);
    return NextResponse.json({ error: message }, { status });
  }
};

export const dynamic = 'force-dynamic';

import { ChannelDocument, ContentsDataType, ContentDocumentRaw } from '@/types/api/mongoDB';
import { parseMongoDBDocument } from '@/utils/parseMongoDBData';
import { connectMongoDB, disconnectMongoDB } from '@/libraries/mongoDB';
import { ChannelSheetDataType, combineChannelData } from '@/utils/combineChannelData';
import { ChannelsDataType } from '@/types/api/youtube';
import { NextRequest, NextResponse } from 'next/server';
import errorHandler from '@/libraries/error/handler';
import { replaceSpecialCharacters } from '@/utils/regexp';
import {
  MONGODB_CHANNEL_COLLECTION,
  MONGODB_CHANNEL_DB,
  MONGODB_SCHEDULE_COLLECTION,
  MONGODB_SCHEDULE_DB,
  SEARCH_ITEMS_SIZE,
} from '@/constants';
import dayjs from '@/libraries/dayjs';

export interface SearchResponseType {
  contents: ContentsDataType[];
  channels: ChannelsDataType[];
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    if (!query) throw new Error('No query');
    const decodeQuery = decodeURIComponent(query).trim();

    if (decodeQuery === '') {
      return NextResponse.json<SearchResponseType>(
        {
          contents: [],
          channels: [],
        },
        { status: 200 },
      );
    }

    // Execute both database queries concurrently
    const regexforDBQuery = { $regex: decodeQuery, $options: 'i' };

    const [channelResults, contentResults] = await Promise.all([
      connectMongoDB(MONGODB_CHANNEL_DB, MONGODB_CHANNEL_COLLECTION).then((db) =>
        db.find<ChannelDocument>({ name_kor: regexforDBQuery }).sort({ name_kor: 1 }).toArray(),
      ),
      connectMongoDB(MONGODB_SCHEDULE_DB, MONGODB_SCHEDULE_COLLECTION).then((db) =>
        db
          .find<ContentDocumentRaw>({ ChannelName: regexforDBQuery })
          .sort({
            ScheduledTime: 1,
            ChannelName: 1,
          })
          .toArray(),
      ),
    ]);

    const searchedContents: ContentsDataType[] = [];
    contentResults.forEach((doc: ContentDocumentRaw) => {
      const data = parseMongoDBDocument({ ...doc, ScheduledTime: dayjs.tz(doc.ScheduledTime) });
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

    disconnectMongoDB();
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

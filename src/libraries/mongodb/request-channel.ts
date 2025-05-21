import { parse } from 'url';
import { MONGODB_CHANNEL_COLLECTION, MONGODB_MANAGEMENT_DB } from '@/constants';
import { Data, Effect } from 'effect';
import { Collection, Document, MongoClient } from 'mongodb';
import { mongoDB } from '.';
import { getYoutubeChannelByHandle, getYoutubeChannelsByUid } from '../youtube';
import { TChannelDocument, TChannelDocumentWithoutId } from './type';

class MongoDBError extends Data.TaggedError('MongoDBError')<{
  message?: string;
  cause?: unknown;
}> {}

class YoutubeError extends Data.TaggedError('YoutubeError')<{
  message?: string;
  cause?: unknown;
}> {}

export class LogicError extends Data.TaggedError('LogicError')<{
  message?: string;
  cause?: unknown;
}> {}

const connectDB = Effect.tryPromise({
  try: () => mongoDB.connect(),
  catch: (e) => new MongoDBError({ message: 'Cannot connect MongoDB', cause: e }),
});

const checkDuplicate = (channelId: string, handle: string, db: Collection<TChannelDocument>) =>
  Effect.tryPromise({
    try: () =>
      db
        .find(
          {
            $or: [{ handle_name: handle }, { channel_id: channelId }],
          },
          {
            projection: {
              _id: 1,
            },
          },
        )
        .toArray(),
    catch: (e) => new MongoDBError({ message: 'Cannot get data from MongoDB', cause: e }),
  });

const insertChannel = (data: TChannelDocumentWithoutId, db: Collection<TChannelDocument>) =>
  Effect.tryPromise({
    try: () => db.insertOne(data),
    catch: (e) => new MongoDBError({ message: 'Cannot insert channel into Database', cause: e }),
  });

const getChannelInfo = (q: string) =>
  Effect.tryPromise({
    try: () => {
      if (q.startsWith('UC')) {
        return getYoutubeChannelsByUid(q);
      } else {
        return getYoutubeChannelByHandle(q);
      }
    },
    catch: (e) =>
      new YoutubeError({ message: 'Cannot get information from youtube api', cause: e }),
  });

export const requestChannel = (channelName: string, url: string) =>
  Effect.gen(function* () {
    if (!url.includes('@') || !url.includes('/UC')) {
      yield* Effect.fail(new LogicError({ message: 'Invalid Youtube Channel URL' }));
    }

    const client = yield* connectDB;
    const db = client
      .db(MONGODB_MANAGEMENT_DB)
      .collection<TChannelDocument>(MONGODB_CHANNEL_COLLECTION);

    const q = url
      .split(/[/?]/)
      .find((part) => part.toLowerCase().includes('@') || part.toLowerCase().startsWith('uc'));

    if (q === undefined) {
      yield* Effect.fail(new LogicError({ message: 'Invalid URL' }));
    }

    const channelInfoResult = yield* getChannelInfo(q!);

    if (channelInfoResult === null) {
      yield* Effect.fail(new LogicError({ message: 'Invalid Channel' }));
    }

    const channelInfo = channelInfoResult!.items?.[0];
    const channelId = channelInfo?.id ?? '';
    const handle = channelInfo?.snippet?.customUrl ?? '';

    if (channelId === '') {
      yield* Effect.fail(new LogicError({ message: 'Invalid Channel' }));
    }

    const hasDuplicate = yield* checkDuplicate(channelId, handle, db);

    if (hasDuplicate.length > 0) {
      yield* Effect.fail(new LogicError({ message: 'Already Registered Channel' }));
    }

    const data: TChannelDocumentWithoutId = {
      alive: true,
      channel_addr: url,
      channel_id: channelId,
      createdAt: new Date().toISOString(),
      handle_name: handle,
      name_kor: channelName,
      names: [],
      profile_picture_url: '',
      waiting: true,
    };

    yield* insertChannel(data, db);

    return {
      channelId,
      handle,
    };
  });

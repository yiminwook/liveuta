import dayjs from '@/libraries/dayjs';
import { StreamCategory } from '@/types';
import {
  ContentDocumentWithDayjs,
  TContentsData,
  TParseAllDataReturn,
  TParseScheduledDataReturn,
} from '@/types/api/mongoDB';
import { getInterval, stringToTime } from '@/utils/getTime';
import { replaceParentheses } from '@/utils/regexp';

export const parseMongoDBDocument = (doc: ContentDocumentWithDayjs): TContentsData => {
  try {
    const { timestamp, korTime } = stringToTime(doc.ScheduledTime);
    const interval = getInterval(timestamp);

    const replacedTitle = replaceParentheses(doc.Title);

    const categoryMap = {
      '0': StreamCategory.default,
      '1': StreamCategory.live,
      '2': StreamCategory.anniversary,
      '3': StreamCategory.relay,
      '4': StreamCategory.endurance,
    };

    const category = doc.category as keyof typeof categoryMap;

    const data: TContentsData = {
      title: replacedTitle,
      channelName: doc.ChannelName,
      videoId: doc.VideoId,
      channelId: doc.ChannelId,
      timestamp: timestamp,
      korTime: korTime,
      isStream: doc.broadcastStatus,
      interval,
      isVideo: doc.isVideo === 'TRUE' ? true : false,
      viewer: doc.concurrentViewers,
      category: categoryMap[category] || StreamCategory.default,
      tag: doc.tag || '',
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const parseScheduledData = (
  documents: ContentDocumentWithDayjs[],
): TParseScheduledDataReturn => {
  const scheduled: TContentsData[] = [];
  const live: TContentsData[] = [];

  documents.forEach((doc) => {
    const isHide = doc.Hide;
    const isStream = doc.broadcastStatus;
    // Exclude hidden contents, but include those that are currently streaming
    if (isHide === 'TRUE' && isStream === 'NULL') return;
    if (isHide === 'TRUE' && isStream === 'FALSE') return;

    const data = parseMongoDBDocument(doc); // Assuming parseMongoDBData returns an array

    scheduled.push(data);

    if (data.isStream === 'TRUE') {
      // 현재 라이브중이면 라이브 리스트에도 추가
      live.push(data);
    }
  });

  return {
    scheduled: scheduled,
    live: live,
  };
};

export const parseAllData = (documents: ContentDocumentWithDayjs[]): TParseAllDataReturn => {
  if (!documents) throw new Error('No DataValue');

  const daily: TContentsData[] = [];
  const all: TContentsData[] = [];
  const yesterday = dayjs.tz().subtract(1, 'day').valueOf();

  documents.forEach((doc) => {
    const isHide = doc.Hide;
    const isStream = doc.broadcastStatus;
    // Hidden contents are treated as yesterday's content
    if (isHide === 'TRUE' && isStream === 'NULL') doc.broadcastStatus = 'FALSE';
    const data = parseMongoDBDocument(doc); // Assuming parseMongoDBData returns an array

    all.push(data);

    if (data.timestamp >= yesterday) {
      // If it's within 24 hours, add to daily list
      daily.push(data);
    }
  });

  return {
    daily: daily,
    all: all,
  };
};

export const parseFeatured = (documents: ContentDocumentWithDayjs[]) => {
  const featured: TContentsData[] = [];

  const l = [0, 1, 0, 2, 0, 3, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(
    (v) => `${v}`,
  );

  const categoryMap = {
    '0': StreamCategory.default,
    '1': StreamCategory.live,
    '2': StreamCategory.anniversary,
    '3': StreamCategory.relay,
    '4': StreamCategory.endurance,
  };

  const tags = ['', '', 'sad', '123', '', '', '', '', '123', '', 'qwer', '', '123'];

  documents.forEach((doc) => {
    const isHide = doc.Hide;
    const isStream = doc.broadcastStatus;

    // Hidden contents are treated as yesterday's content
    if (isHide === 'TRUE' && isStream === 'NULL') return;
    if (isHide === 'TRUE' && isStream === 'FALSE') return;

    const data = parseMongoDBDocument(doc); // Assuming parseMongoDBData returns an array
    if (!data) return;

    const r = l[Math.floor(Math.random() * l.length)];
    data.category = categoryMap[r as keyof typeof categoryMap] || StreamCategory.default;

    if (data.category !== StreamCategory.default) {
      data.tag = tags[Math.floor(Math.random() * tags.length)];
      featured.push(data);
    }
  });

  return {
    featured,
  };
};

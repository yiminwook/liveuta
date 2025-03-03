import dayjs from '@/libraries/dayjs';
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
    const { timestamp, utcTime } = stringToTime(doc.ScheduledTime);
    const interval = getInterval(timestamp);

    const replacedTitle = replaceParentheses(doc.Title);

    const data: TContentsData = {
      title: replacedTitle,
      channelName: doc.ChannelName,
      videoId: doc.VideoId,
      channelId: doc.ChannelId,
      timestamp,
      utcTime,
      isStream: doc.broadcastStatus,
      interval,
      isVideo: doc.isVideo === 'TRUE' ? true : false,
      viewer: doc.concurrentViewers,
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
  const yesterday = dayjs().subtract(1, 'day').valueOf();

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

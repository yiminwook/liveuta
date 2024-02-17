import {
  ContentDocument,
  ContentsLength,
  DataReturnType,
  ParseAllDataReturnType,
  ParseScheduledDataReturnType,
  ContentsDataType,
  isStream,
} from '@/type/api/mongoDB';
import { getInterval, stringToTime } from '@/app/api/_lib/getTime';
import dayjs from '@/model/dayjs';
import { replaceParentheses } from '@inner/_lib/regexp';

export const parseMongoDBDocument = (doc: ContentDocument): ContentsDataType => {
  try {
    const { timestamp, korTime } = stringToTime(doc.ScheduledTime);
    const interval = getInterval(timestamp);

    const replacedThumbnailURL = doc.ThumbnailURL.replace(
      /(hqdefault|maxresdefault|sddefault|mqdefault|default)/i,
      'mqdefault',
    );

    const videoId = doc.URL.replace('https://www.youtube.com/watch?v=', '');
    const replacedTitle = replaceParentheses(doc.Title);
    const replacedUrl = doc.isVideo === 'TRUE' ? `https://youtu.be/${videoId}` : doc.URL;

    const data: ContentsDataType = {
      title: replacedTitle,
      url: replacedUrl,
      channelName: doc.ChannelName,
      videoId: videoId,
      timestamp: timestamp,
      thumbnailURL: replacedThumbnailURL,
      korTime: korTime,
      isStream: doc.broadcastStatus as isStream,
      interval: interval,
      isVideo: doc.isVideo === 'TRUE' ? true : false,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const parseScheduledData = (documents: ContentDocument[]): ParseScheduledDataReturnType => {
  const scheduled: ContentsDataType[] = [];
  let scheduledVideo = 0;
  const live: ContentsDataType[] = [];
  let liveVideo = 0;

  documents.forEach((doc) => {
    const isHide = doc.Hide;
    const isStream = doc.broadcastStatus;

    // Exclude hidden contents, but include those that are currently streaming
    if (isHide === 'TRUE' && isStream === 'NULL') return;
    if (isHide === 'TRUE' && isStream === 'FALSE') return;
    const data = parseMongoDBDocument(doc); // Assuming parseMongoDBData returns an array
    //console.log(data);
    if (!data) return;
    if (data.isVideo === true) scheduledVideo++;
    scheduled.push(data);
    if (data.isStream === 'TRUE') {
      // 현재 라이브중이면 라이브 리스트에도 추가
      if (data.isVideo === true) liveVideo++;
      live.push(data);
    }
  });

  return {
    scheduled: {
      contents: scheduled,
      length: {
        total: scheduled.length,
        video: scheduledVideo,
        stream: scheduled.length - scheduledVideo,
      },
    },
    live: {
      contents: live,
      length: {
        total: live.length,
        video: liveVideo,
        stream: live.length - liveVideo,
      },
    },
  };
};

export const parseAllData = (documents: ContentDocument[]): ParseAllDataReturnType => {
  if (!documents) throw new Error('No DataValue');

  const daily: ContentsDataType[] = [];
  let dailyVideo = 0;
  const all: ContentsDataType[] = [];
  let allVideo = 0;
  const yesterday = dayjs().subtract(1, 'day').valueOf();

  documents.forEach((doc) => {
    const isHide = doc.Hide;
    const isStream = doc.broadcastStatus;
    // Hidden contents are treated as yesterday's content
    if (isHide === 'TRUE' && isStream === 'NULL') doc.broadcastStatus = 'FALSE';
    const data = parseMongoDBDocument(doc); // Assuming parseMongoDBData returns an array
    if (!data) return;
    if (data.isVideo === true) allVideo++;
    all.push(data);
    if (data.timestamp >= yesterday) {
      // If it's within 24 hours, add to daily list
      if (data.isVideo === true) dailyVideo++;
      daily.push(data);
    }
  });

  return {
    daily: {
      contents: daily,
      length: {
        total: daily.length,
        video: dailyVideo,
        stream: daily.length - dailyVideo,
      },
    },
    all: {
      contents: all,
      length: {
        total: all.length,
        video: allVideo,
        stream: all.length - allVideo,
      },
    },
  };
};

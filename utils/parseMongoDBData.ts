// Import necessary functions and types
import { ContentsDataType } from '@/types/inSheet';
import { getInterval, stringToTime } from '@/utils/getTime';
import dayjs from '@/models/dayjs';
import { replaceParentheses } from '@/utils/regexp';

export const parseMongoDBData = (documents: any[]): ContentsDataType[] => {
  const parsedData: ContentsDataType[] = [];

  documents.forEach(doc => {
    try {
      const { Title, URL, ChannelName, ScheduledTime, ThumbnailURL, Hide, broadcastStatus, isVideo } = doc;
      
      const scheduledTime = new Date(ScheduledTime).toISOString();
      const { timestamp, korTime } = stringToTime(scheduledTime);
      const interval = getInterval(timestamp);

      const replacedThumbnailURL = ThumbnailURL.replace(
        /(hqdefault|maxresdefault|sddefault|mqdefault|default)/i,
        'mqdefault'
      );

      const videoId = URL.replace('https://www.youtube.com/watch?v=', '');
      const replacedTitle = replaceParentheses(Title);
      const replacedUrl = isVideo === 'TRUE' ? `https://youtu.be/${videoId}` : URL;

      const data: ContentsDataType = {
        title: replacedTitle,
        url: replacedUrl,
        channelName: ChannelName,
        videoId: videoId,
        timestamp: timestamp,
        thumbnailURL: replacedThumbnailURL,
        korTime: korTime,
        isStream: broadcastStatus,
        interval: interval,
        isVideo: isVideo === 'TRUE'
      };

      parsedData.push(data);
    } catch (error) {
      console.log(error);
    }
  });

  return parsedData;
};


interface ParseScheduledDataReturnType {
    scheduled: ContentDocument[];
    live: ContentDocument[];
}

export const parseScheduledData = (documents: any[]): ParseScheduledDataReturnType => {
  if (!documents) throw new Error('No DataValue');

  const scheduled: ContentsDataType[] = [];
  let scheduledVideo = 0;
  const live: ContentsDataType[] = [];
  let liveVideo = 0;

  documents.forEach(doc => {
    const isHide = doc.Hide;
    const isStream = doc.broadcastStatus;
    // Exclude hidden contents, but include those that are currently streaming
    if (isHide === 'TRUE' && isStream === 'NULL') return;
    if (isHide === 'TRUE' && isStream === 'FALSE') return;
    const data = parseMongoDBData([doc])[0]; // Assuming parseMongoDBData returns an array
    if (!data) return;
    if (data.isVideo) scheduledVideo++;
    scheduled.push(data);
    if (data.isStream) {
      // If currently streaming, also add to the live list
      if (data.isVideo) liveVideo++;
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


interface ParseAllDataReturnType {
    daily: ContentDocument[];
    all: ContentDocument[];
}

export const parseAllData = (documents: any[]): ParseAllDataReturnType => {
  if (!documents) throw new Error('No DataValue');

  const daily: ContentsDataType[] = [];
  let dailyVideo = 0;
  const all: ContentsDataType[] = [];
  let allVideo = 0;
  const yesterday = dayjs().subtract(1, 'day').valueOf();

  documents.forEach(doc => {
    const isHide = doc.Hide;
    const isStream = doc.broadcastStatus;
    // Hidden contents are treated as yesterday's content
    if (isHide === 'TRUE' && isStream === 'NULL') doc.broadcastStatus = 'FALSE';
    const data = parseMongoDBData([doc])[0]; // Assuming parseMongoDBData returns an array
    if (!data) return;
    if (data.isVideo) allVideo++;
    all.push(data);
    if (data.timestamp >= yesterday) {
      // If it's within 24 hours, add to daily list
      if (data.isVideo) dailyVideo++;
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

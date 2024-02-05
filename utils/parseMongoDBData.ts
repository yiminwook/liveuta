import { ContentsDataType } from '@/types/inMongoDB';
import { getInterval, stringToTime } from '@/utils/getTime';
import dayjs from '@/models/dayjs';
import { replaceParentheses } from '@/utils/regexp';

interface ContentDocument {
    _id: string;
    Title: string;
    URL: string;
    ChannelName: string;
    ScheduledTime: string;
    ThumbnailURL: string;
    Hide: string;
    broadcastStatus: string;
    isVideo: string;
}

interface DocumentList {
    documents: ContentDocument[];
}

export const parseMongoDBDocument = (doc: ContentDocument): ContentsDataType | undefined => {
  try {
    const { _id, Title, URL, ChannelName, ScheduledTime, ThumbnailURL, broadcastStatus, isVideo } = doc;
    const parsedScheduledTime = ScheduledTime.slice(0, -5) + 'Z';
    const { timestamp, korTime } = stringToTime(parsedScheduledTime);
    console.log(parsedScheduledTime);
    console.log(timestamp);
    console.log(korTime);
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

    return data;
  } catch (error) {
    //console.log(error);
  }
};


interface ParseScheduledDataReturnType {
    scheduled: {
        contents: any[];
        length: {
            total: number;
            video: number;
            stream: number;
        };
    };
    live: {
        contents: any[];
        length: {
            total: number;
            video: number;
            stream: number;
        };
    };
}

export const parseScheduledData = (documents: DocumentList): ParseScheduledDataReturnType => {
  if (!documents) throw new Error('No DataValue');

  const scheduled: ContentsDataType[] = [];
  let scheduledVideo = 0;
  const live: ContentsDataType[] = [];
  let liveVideo = 0;

  documents['documents'].forEach(doc => {
    const isHide = doc.Hide;
    const isStream = doc.broadcastStatus;
  
    // Exclude hidden contents, but include those that are currently streaming
    if (isHide === 'TRUE' && isStream === 'NULL') return;
    if (isHide === 'TRUE' && isStream === 'FALSE') return;
    const data = parseMongoDBDocument(doc); // Assuming parseMongoDBData returns an array
    //console.log(data);
    if (!data) return;
    if (data.isVideo) scheduledVideo++;
    scheduled.push(data);
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


interface ParseAllDataReturnType {
    daily: {
        contents: any[];
        length: {
            total: number;
            video: number;
            stream: number;
        };
    };
    all: {
        contents: any[];
        length: {
            total: number;
            video: number;
            stream: number;
        };
    };
}


export const parseAllData = (documents: DocumentList): ParseAllDataReturnType => {
  if (!documents) throw new Error('No DataValue');

  const daily: ContentsDataType[] = [];
  let dailyVideo = 0;
  const all: ContentsDataType[] = [];
  let allVideo = 0;
  const yesterday = dayjs().subtract(1, 'day').valueOf();

  documents['documents'].forEach(doc => {
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

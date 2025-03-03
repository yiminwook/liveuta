import { ContentsRowType, TContentsData, SheetAPIReturntype } from '@/temps/sheet/sheet';
import { sheets_v4 } from 'googleapis';
import { getInterval, stringToTime } from '@/utils/getTime';
import dayjs from '@/libraries/dayjs';
import { replaceParentheses } from '@/utils/regexp';

export const parseSheetData = (value: ContentsRowType): TContentsData | undefined => {
  try {
    const [
      title,
      url,
      channelName,
      scheduledTime,
      thumbnailURL,
      _bool,
      isStream,
      isVideo,
    ]: ContentsRowType = value;
    if (scheduledTime.length >= 18) {
      const { timestamp, korTime } = stringToTime(dayjs(scheduledTime));
      const interval = getInterval(timestamp);
      const replacedThumbnailURL = thumbnailURL.replace(
        /(hqdefault|maxresdefault|sddefault|mqdefault|default)/i,
        'mqdefault',
      );
      const videoId = url.replace('https://www.youtube.com/watch?v=', '');
      const replacedTitle = replaceParentheses(title);
      // if (replacedTitle.length > 40) {
      //   replacedTitle = replacedTitle.substring(0, 40) + "...";
      // }
      const replacedUrl = isVideo === 'TRUE' ? `https://youtu.be/${videoId}` : url;

      const data: TContentsData = {
        title: replacedTitle,
        url: replacedUrl,
        channelName,
        videoId,
        timestamp,
        thumbnailURL: replacedThumbnailURL,
        korTime,
        isStream,
        interval,
        isVideo: isVideo === 'TRUE' ? true : false,
      };

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

interface ParseScheduledDataReturnType {
  scheduled: SheetAPIReturntype['scheduled'];
  live: SheetAPIReturntype['live'];
}
/** Parse Google spread sheet - Scheduled & Live */
export const parseScheduledData = (
  data: sheets_v4.Schema$ValueRange,
): ParseScheduledDataReturnType => {
  const dataValue = data.values as ContentsRowType[];
  if (!dataValue) throw new Error('No DataValue');

  const scheduled: SheetAPIReturntype['scheduled']['contents'] = [];
  let scheduledVideo = 0;
  const live: SheetAPIReturntype['live']['contents'] = [];
  let liveVideo = 0;

  dataValue.forEach((value) => {
    const isHide = value[5];
    const isStream = value[6];
    //숨김처리된 컨텐츠는 가져오지 않음, 단 isStream이 TRUE인 경우 제외
    if (isHide === 'TRUE' && isStream === 'NULL') return;
    if (isHide === 'TRUE' && isStream === 'FALSE') return;
    const data = parseSheetData(value);
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

interface ParseAllDataReturnType {
  daily: SheetAPIReturntype['daily'];
  all: SheetAPIReturntype['all'];
}
/** Parse Google spread sheet - Daily & All */
export const parseAllData = (data: sheets_v4.Schema$ValueRange): ParseAllDataReturnType => {
  const dataValue = data.values as ContentsRowType[];
  if (!dataValue) throw new Error('No DataValue');

  const daily: SheetAPIReturntype['daily']['contents'] = [];
  let dailyVideo = 0;
  const all: SheetAPIReturntype['all']['contents'] = [];
  let allVideo = 0;
  const yesterday = dayjs().subtract(1, 'day').valueOf();

  dataValue.forEach((value) => {
    const isHide = value[5];
    const isStream = value[6];
    //숨김처리된 컨텐츠는 지난 컨텐츠로 처리
    if (isHide === 'TRUE' && isStream === 'NULL') value[6] = 'FALSE';
    const data = parseSheetData(value);
    if (!data) return;
    if (data.isVideo === true) allVideo++;
    all.push(data);
    if (data.timestamp >= yesterday) {
      //하루가 지나지 않았으면 24시간 리스트에 추가
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

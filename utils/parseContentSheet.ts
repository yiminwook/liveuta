import { ContentsRowType, ContentsDataType, SheetAPIReturntype } from '@/types/inSheet';
import { sheets_v4 } from 'googleapis';
import { getInterval, stringToTime } from '@/utils/getTime';
import dayjs from '@/models/dayjs';

export const parseSheetData = (value: ContentsRowType): ContentsDataType | undefined => {
  try {
    const [title, url, channelName, scheduledTime, thumbnailURL, _bool, isStream]: ContentsRowType = value;
    if (scheduledTime.length >= 18) {
      const { timestamp, korTime } = stringToTime(scheduledTime);
      const interval = getInterval(timestamp);
      const replacedThumbnailURL = thumbnailURL.replace(
        /(hqdefault|maxresdefault|sddefault|mqdefault|default)/i,
        'mqdefault',
      );
      let replacedTitle = title.replace(/\【(.*?)\】|\〖(.*?)\〗|\[(.*?)\]|\((.*?)\)/gi, '');
      // if (replacedTitle.length > 40) {
      //   replacedTitle = replacedTitle.substring(0, 40) + "...";
      // }
      const videoId = url.replace('https://www.youtube.com/watch?v=', '');
      const data: ContentsDataType = {
        title: replacedTitle,
        url,
        channelName,
        videoId,
        timestamp,
        thumbnailURL: replacedThumbnailURL,
        korTime,
        isStream,
        interval,
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
export const parseScheduledData = (data: sheets_v4.Schema$ValueRange): ParseScheduledDataReturnType => {
  const dataValue = data.values as ContentsRowType[];
  if (!dataValue) throw new Error('No DataValue');

  const scheduled: SheetAPIReturntype['scheduled']['contents'] = [];
  const live: SheetAPIReturntype['live']['contents'] = [];

  dataValue.forEach((value) => {
    const isHide = value[5];
    const isStream = value[6];
    //숨김처리된 컨텐츠는 가져오지 않음, 단 isStream이 TRUE인 경우 제외
    if (isHide === 'TRUE' && isStream === 'NULL') return;
    if (isHide === 'TRUE' && isStream === 'FALSE') return;
    const data = parseSheetData(value);
    if (!data) return;
    scheduled.push(data);
    if (data.isStream === 'TRUE') live.push(data);
  });

  return {
    scheduled: {
      contents: scheduled,
      total: scheduled.length,
    },
    live: {
      contents: live,
      total: live.length,
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
  const all: SheetAPIReturntype['all']['contents'] = [];
  const yesterday = dayjs().subtract(1, 'day').valueOf();

  dataValue.forEach((value) => {
    const isHide = value[5];
    const isStream = value[6];
    //숨김처리된 컨텐츠는 지난 컨텐츠로 처리
    if (isHide === 'TRUE' && isStream === 'NULL') value[6] = 'FALSE';
    const data = parseSheetData(value);
    if (data) {
      all.push(data);
      if (data.timestamp >= yesterday) daily.push(data);
    }
  });

  return {
    daily: {
      contents: daily,
      total: daily.length,
    },
    all: {
      contents: all,
      total: all.length,
    },
  };
};

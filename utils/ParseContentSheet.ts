import { ContentsRowType, ContentsDataType, SheetAPIReturntype } from '@/models/sheet/InSheet';
import { sheets_v4 } from 'googleapis';
import { getInterval, stringToTime } from '@/utils/GetTime';
import getENV from './GetENV';
import { LOCAL_TIME } from '@/consts';

export const parseSheetData = (value: ContentsRowType): ContentsDataType | undefined => {
  const [title, url, channelName, scheduledTime, thumbnailURL, _bool, isStream]: ContentsRowType = value;
  const stringTime = scheduledTime.replace(' ', 'T').split(' JST')[0];
  if (stringTime.length === 19) {
    const { timestamp, korTime } = stringToTime(stringTime);
    const interval = getInterval(timestamp);
    const highThumbnailURL = thumbnailURL.replace(/(hqdefault|maxresdefault|sddefault|default)/i, 'hqdefault');
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
      thumbnailURL: highThumbnailURL,
      korTime,
      isStream,
      interval,
    };
    return data;
  }
};

interface parseScheduledDataType {
  scheduled: SheetAPIReturntype['scheduled'];
  live: SheetAPIReturntype['live'];
}
/** Parse Google spread sheet - Scheduled & Live */
export const parseScheduledData = (data: sheets_v4.Schema$ValueRange): parseScheduledDataType => {
  const dataValue = data.values as ContentsRowType[];
  if (!dataValue) throw new Error('No DataValue');

  const scheduled: SheetAPIReturntype['scheduled']['contents'] = [];
  const live: SheetAPIReturntype['live']['contents'] = [];

  dataValue.forEach((value) => {
    const bool = value[5];
    const isStream = value[6];
    if (bool === 'TRUE' && isStream === 'NULL') return;
    if (bool === 'TRUE' && isStream === 'FALSE') return;
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

interface parseAllDataType {
  daily: SheetAPIReturntype['daily'];
  all: SheetAPIReturntype['all'];
}
/** Parse Google spread sheet - Daily & All */
export const parseAllData = (data: sheets_v4.Schema$ValueRange): parseAllDataType => {
  const dataValue = data.values as ContentsRowType[];
  if (!dataValue) throw new Error('No DataValue');

  const daily: SheetAPIReturntype['daily']['contents'] = [];
  const all: SheetAPIReturntype['all']['contents'] = [];
  const yesterday = Date.now() - 24 * 60 * 60 * 1000 + +getENV(LOCAL_TIME);

  dataValue.forEach((value) => {
    const bool = value[5];
    const isStream = value[6];
    if (bool === 'TRUE' && isStream === 'NULL') value[6] = 'FALSE';
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

import { ContentsRowType, ContentsDataType } from '@/models/sheet/InSheet';
import { sheets_v4 } from 'googleapis';
import { getInterval, stringToTime } from '@/utils/GetTime';

const parseSheetData = (value: ContentsRowType): ContentsDataType | undefined => {
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

/** Parse Google spread sheet - Scheduled & Live */
export const parseScheduledUpcomming = (data: sheets_v4.Schema$ValueRange): ContentsDataType[] => {
  const upcoming: ContentsDataType[] = [];
  const dataValue = data.values as ContentsRowType[];
  if (!dataValue) return [];
  dataValue.forEach((value) => {
    const bool = value[5];
    const isStream = value[6];
    if (bool === 'TRUE' && isStream === 'NULL') return;
    if (bool === 'TRUE' && isStream === 'FALSE') return;
    const data = parseSheetData(value);
    if (data) {
      upcoming.push(data);
    }
  });

  return upcoming;
};

/** Parse Google spread sheet - Daily & All */
export const parseAllUpcomming = (data: sheets_v4.Schema$ValueRange): ContentsDataType[] => {
  const upcoming: ContentsDataType[] = [];
  const dataValue = data.values as ContentsRowType[];
  if (!dataValue) return [];
  dataValue.forEach((value) => {
    const bool = value[5];
    const isStream = value[6];
    if (bool === 'TRUE' && isStream === 'NULL') value[6] = 'FALSE';
    const data = parseSheetData(value);
    if (data) {
      upcoming.push(data);
    }
  });

  return upcoming;
};

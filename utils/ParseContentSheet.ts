import { ContentsRowType, ContentsDataType } from '@/models/sheet/InSheet';
import { sheets_v4 } from 'googleapis';
import { getinterval, stringToTime } from '@/utils/GetTime';

export interface ParseUpcommingSheetType {
  data: sheets_v4.Schema$ValueRange;
  nowTime: number;
  showAll?: boolean;
}

/** Parse Google spread sheet - Upcomming */
export const parseUpcommingSheet = ({ data, nowTime, showAll }: ParseUpcommingSheetType): ContentsDataType[] => {
  const upcoming: ContentsDataType[] = [];
  const dataValue = data.values as ContentsRowType[];
  if (!dataValue) return [];
  dataValue.forEach(([title, url, channelName, scheduledTime, thumbnailURL, _bool, isStream]: ContentsRowType) => {
    if (showAll || isStream !== 'FALSE') {
      const stringTime = scheduledTime.replace(' ', 'T').split(' JST')[0];
      if (stringTime.length === 19) {
        const { timestamp, korTime } = stringToTime(stringTime);
        const interval = getinterval(nowTime, timestamp);
        const highThumbnailURL = thumbnailURL.replace(/(hqdefault|maxresdefault|sddefault|default)/i, 'hqdefault');
        let replacedTitle = title.replace(/\【(.*?)\】|\〖(.*?)\〗|\[(.*?)\]|\((.*?)\)/gi, '');
        // if (replacedTitle.length > 40) {
        //   replacedTitle = replacedTitle.substring(0, 40) + "...";
        // }
        const videoId = url.replace('https://www.youtube.com/watch?v=', '');
        const isLive = isStream === 'TRUE';
        const upcomingData: ContentsDataType = {
          title: replacedTitle,
          url,
          channelName,
          videoId,
          timestamp,
          thumbnailURL: highThumbnailURL,
          korTime,
          isLive,
          interval,
        };
        upcoming.push(upcomingData);
      }
    }
  });
  return upcoming;
};

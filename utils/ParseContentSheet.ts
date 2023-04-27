import { ContentsRowType, ContentsDataType } from '@/models/sheet/InSheet';
import { sheets_v4 } from 'googleapis';
import { getInterval, stringToTime } from '@/utils/GetTime';

export interface ParseUpcommingSheetType {
  data: sheets_v4.Schema$ValueRange;
  showAll?: boolean;
}

/** Parse Google spread sheet - Upcomming */
export const parseUpcommingSheet = ({ data, showAll = false }: ParseUpcommingSheetType): ContentsDataType[] => {
  const upcoming: ContentsDataType[] = [];
  const dataValue = data.values as ContentsRowType[];
  if (!dataValue) return [];
  dataValue.forEach(([title, url, channelName, scheduledTime, thumbnailURL, _bool, isStream]: ContentsRowType) => {
    if (showAll || isStream !== 'FALSE') {
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
        const upcomingData: ContentsDataType = {
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
        upcoming.push(upcomingData);
      }
    }
  });
  return upcoming;
};

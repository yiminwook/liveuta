import { rowData, UpcomingData } from '@/models/sheet/in_sheet';
import { sheets_v4 } from 'googleapis';
import { getinterval } from './get_time';

interface ParseSheetDataType {
  data: sheets_v4.Schema$ValueRange;
  nowTime: number;
  delayTime: number;
}

const parseSheetData = ({ data, nowTime, delayTime }: ParseSheetDataType): UpcomingData[] => {
  const upcoming: UpcomingData[] = [];
  const dataValue = data.values as rowData[];
  if (!dataValue) return [];
  dataValue.forEach(([title, url, channelName, scheduledTime, thumbnailUrl, bool]: rowData) => {
    if (bool === 'FALSE') {
      const stringTime = scheduledTime.replace(' ', 'T').split(' JST')[0];
      if (stringTime.length === 19) {
        const time = new Date(stringTime);
        const timestamp = time.getTime();
        if (delayTime < timestamp) {
          const korTime = time.toLocaleString('ko-kr', {
            // year: "numeric",
            month: 'short',
            day: 'numeric',
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric',
          });
          const iterval = getinterval(nowTime, timestamp);
          const highThumbnailUrl = thumbnailUrl.replace(/(default|maxresdefault)/i, 'hqdefault');
          let replacedTitle = title.replace(/\【(.*?)\】|\〖(.*?)\〗|\[(.*?)\]|\((.*?)\)/gi, '');
          // if (replacedTitle.length > 40) {
          //   replacedTitle = replacedTitle.substring(0, 40) + "...";
          // }
          const videoId = url.replace('https://www.youtube.com/watch?v=', '');
          const upcomingData: UpcomingData = {
            title: replacedTitle,
            url,
            channelName,
            videoId,
            timestamp,
            thumbnailUrl: highThumbnailUrl,
            korTime,
            iterval,
          };
          upcoming.push(upcomingData);
        }
      }
    }
  });
  return upcoming;
};

export default parseSheetData;

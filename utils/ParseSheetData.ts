import { ContentsRowType, ContentsDataType } from '@/models/sheet/Insheet';
import { sheets_v4 } from 'googleapis';
import { getinterval } from '@/utils/GetTime';

interface ParseYoutubeContentDataType {
  data: sheets_v4.Schema$ValueRange;
  nowTime: number;
  showAll?: boolean;
}

const parseYoutubeContentData = ({ data, nowTime, showAll }: ParseYoutubeContentDataType): ContentsDataType[] => {
  const upcoming: ContentsDataType[] = [];
  const dataValue = data.values as ContentsRowType[];
  if (!dataValue) return [];
  dataValue.forEach(([title, url, channelName, scheduledTime, thumbnailURL, _bool, isStream]: ContentsRowType) => {
    if (showAll || isStream !== 'FALSE') {
      const stringTime = scheduledTime.replace(' ', 'T').split(' JST')[0];
      if (stringTime.length === 19 || stringTime.length === 18) {
        const time = new Date(stringTime);
        const timestamp = time.getTime();
        const korTime = time.toLocaleString('ko-kr', {
          // year: "numeric",
          month: 'short',
          day: 'numeric',
          weekday: 'short',
          hour: 'numeric',
          minute: 'numeric',
        });
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

export default parseYoutubeContentData;

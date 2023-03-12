import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import {
  SheetResponseData,
  rowData,
  UpcomingData,
} from "@/models/sheet/in_sheet";
import getNowDate from "@/utils/get_now_date";
import getinterval from "@/utils/get_interval";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const service = google.sheets({ version: "v4" });
  const result = await service.spreadsheets.values.get({
    spreadsheetId: process.env.spreadsheetId || "",
    key: process.env.sheet_apiKey || "",
    range: process.env.upcoming_sheet_range || "",
  });
  const data = result.data as SheetResponseData;
  const upcoming: UpcomingData[] = [];
  const now = getNowDate() + +(process.env.local_time ?? 0);
  /** 2시간 지연 */
  const delayTime = now - +(process.env.local_time ?? 7200000);

  data.values.forEach(
    ([
      title,
      url,
      channelName,
      scheduledTime,
      thumbnailUrl,
      _bool,
    ]: rowData) => {
      const time = new Date(scheduledTime.replace(" ", "T").split(" JST")[0]);
      const timestamp = time.getTime();
      if (delayTime < timestamp) {
        const korTime = time.toLocaleString("ko-kr", {
          // year: "numeric",
          month: "short",
          day: "2-digit",
          weekday: "short",
          hour: "numeric",
        });
        const iterval = getinterval(now, timestamp);
        const highThumbnailUrl = thumbnailUrl.replace(
          /(default|maxresdefault)/i,
          "hqdefault"
        );
        const videoId = url.replace("https://www.youtube.com/watch?v=", "");
        const upcomingData: UpcomingData = {
          title,
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
  );

  return res.status(200).json({ total: upcoming.length, upcoming });
}

// https://developers.google.com/sheets/api/guides/concepts?hl=ko#cell

export type rowData = [string, string, string, string, string, string];

export interface UpcomingData {
  title: string;
  url: string;
  channelName: string;
  videoId: string;
  timestamp: number;
  thumbnailURL?: string;
  korTime: string;
  iterval: string;
}

export type rowData = [string, string, string, string, string, string];

export interface SheetResponseData {
  range: string;
  majorDimension: string;
  values: rowData[];
}

export interface UpcomingData {
  title: string;
  url: string;
  channelName: string;
  videoId: string;
  timestamp: number;
  thumbnailUrl?: string;
  korTime: string;
  iterval: string;
}

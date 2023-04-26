export type isStream = 'TRUE' | 'NULL' | 'FALSE';

export type ContentsRowType = [string, string, string, string, string, string, isStream];

export interface ContentsDataType {
  title: string;
  url: string;
  channelName: string;
  videoId: string;
  timestamp: number;
  thumbnailURL?: string;
  isLive: boolean;
  korTime: string;
  interval: string;
}

export interface SheetAPIReturnType {
  total: number;
  contents: ContentsDataType[];
}

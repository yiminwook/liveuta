export type isStream = 'TRUE' | 'NULL' | 'FALSE';

export type ContentsRowType = [string, string, string, string, string, string, ContentsDataType['isStream']];

export interface ContentsDataType {
  title: string;
  url: string;
  channelName: string;
  videoId: string;
  timestamp: number;
  thumbnailURL?: string;
  isStream: 'FALSE' | 'TRUE' | 'NULL';
  korTime: string;
  interval: string;
}

export interface SheetAPIReturnType {
  total: number;
  contents: ContentsDataType[];
}

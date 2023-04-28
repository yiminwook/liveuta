export type isStream = 'TRUE' | 'NULL' | 'FALSE';

export type ContentsRowType = [string, string, string, string, string, 'TRUE' | 'FALSE', ContentsDataType['isStream']];

export interface ContentsDataType {
  title: string;
  url: string;
  channelName: string;
  videoId: string;
  timestamp: number;
  thumbnailURL?: string;
  isStream: isStream;
  korTime: string;
  interval: string;
}

export interface ContentsDataTypes {
  total: number;
  contents: ContentsDataType[];
}

export interface SheetAPIReturntype {
  scheduled: ContentsDataTypes;
  live: ContentsDataTypes;
  daily: ContentsDataTypes;
  all: ContentsDataTypes;
}

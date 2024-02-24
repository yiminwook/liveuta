export type isStream = 'TRUE' | 'NULL' | 'FALSE';

export type ContentsRowType = [
  string,
  string,
  string,
  string,
  string,
  'TRUE' | 'FALSE',
  ContentsDataType['isStream'],
  string,
];

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
  isVideo: boolean;
}

export interface contentLength {
  total: number;
  /** 스트리밍 영상 */
  stream: number;
  /** 커버, 오리지널 영상 */
  video: number;
}
export interface ContentsDataTypes {
  length: contentLength;
  contents: ContentsDataType[];
}

export interface SheetAPIReturntype {
  scheduled: ContentsDataTypes;
  live: ContentsDataTypes;
  daily: ContentsDataTypes;
  all: ContentsDataTypes;
}

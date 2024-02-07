export {
    ContentDocument,
    DocumentList,
    ContentsLength,
    DataReturnType,
    ParseAllDataReturnType,
    ParseScheduledDataReturnType,
    ContentsDataType
};

interface ContentDocument {
    _id: string;
    Title: string;
    URL: string;
    ChannelName: string;
    ScheduledTime: Date;
    ThumbnailURL: string;
    Hide: string;
    broadcastStatus: string;
    isVideo: string;
}

interface DocumentList {
    documents: ContentDocument[];
}

interface ContentsLength {
    total: number;
    video: number;
    stream: number;
}

interface DataReturnType {
    contents: any[];
    length: ContentsLength;
}

interface ParseAllDataReturnType {
    daily: DataReturnType;
    all: DataReturnType;
}

interface ParseScheduledDataReturnType {
    scheduled: DataReturnType;
    live: DataReturnType;
}

interface ContentsDataType {
    title: string;
    url: string;
    channelName: string;
    videoId: string;
    timestamp: number;
    thumbnailURL?: string;
    isStream: string;
    korTime: string;
    interval: string;
    isVideo: boolean;
}

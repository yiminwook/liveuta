## node v18.19.0

## Server API docs

1. GET /api/search?query={채널명}

```
  return {
   contents: ContentsDataType[];
   channels: ContentsDataType[];
  }
```

2. GET /api/sheet

```
  return {
    scheduled: ContentsDataTypes;
    live: ContentsDataTypes;
    daily: ContentsDataTypes;
    all: ContentsDataTypes;
  }
```

3. POST /api/push

```
  body PushData[]

  return {
    data: {
      response: { success: string; messageId: string; }[];
      successCount: number;
      failureCount: number;
    }
  }
```

## Types

```
interface ContentsDataType {
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

interface contentLength {
  total: number;
  /** 스트리밍 영상 */
  stream: number;
  /** 커버, 오리지널 영상 */
  video: number;
}

interface ContentsDataTypes {
  length: contentLength;
  contents: ContentsDataType[];
}

interface PushData {
    "token": string;
    "title": string;
    "body": string;
    "imageUrl": string;
    /**
     * webpush를 눌렀을때 이동할 링크
     * 이미 liveuta가 켜져있을때는 링크가 있어도 이동없고 내려간 창만 다시 올려줌
     */
    "link": string;
    "timestamp": string; //unix time
  }
```

## Environments

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
/** 미사용 */
HOLODEX_API_KEY=
/** Youtube Data v3 API */
GOOGLE_API_KEY=AIz...

CONTENTS_SHEET_ID=sheetId
CHANNELS_SHEET_ID=sheetId
PUSH_SHEET_ID=sheetId

CONTENTS_SHEET_RANGE=Upcoming
CHANNELS_SHEET_RANGE=reference
PUSH_SHEET_RANGE=시트1

NEXT_PUBLIC_REQUEST_URL=http://REQUEST_URL.com

/** Google Sheet v4 API, Firebase Cloud Messaging */
FIREBASE_CLIENT_EMAIL=firebase-adminsdk...
FIREBASE_PROJECT_ID=liveuta-...
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...
NEXT_PUBLIC_FIREBASE_VAPID_KEY=BAKlP...

MONGODB_SCHEDULE_COLLECTION=
MONGODB_NOTI_COLLECTION=
MONGODB_SCHEDULE_DB=
MONGODB_API_KEY=
```

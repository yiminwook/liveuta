## node v18.13.0

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
  input {
    "tokens": string[];
    "title": string;
    "body": string;
    /* imageUrl이 있을때만 push에서 사진을 보여줌 */
    "imageUrl"?: string;
    /**
     * webpush를 눌렀을때 이동할 링크
     * 이미 liveuta가 켜져있을때는 링크가 있어도 이동없고 내려간 창만 다시 올려줌
     */
    "link"?: string;
  }

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
ContentsDataType: {
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

ContentsDataTypes: {
  length: contentLength;
  contents: ContentsDataType[];
}
```

## Packages

```
  "axios": "^1.3.4",
  "dayjs": "^1.11.8",
  "firebase": "9.22.0",
  "firebase-admin": "^11.11.0",
  "googleapis": "^128.0.0",
  "jotai": "^2.5.1",
  "jotai-devtools": "^0.7.0",
  "next": "13.4.12",
  "pretendard": "^1.3.8",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-html-parser": "^2.0.2",
  "react-icons": "^4.8.0",
  "react-outside-click-handler": "^1.3.0",
  "react-toastify": "^9.1.2",
  "regexify-string": "^1.0.19",
  "sharp": "^0.31.3",
  "swr": "^2.1.3",
  "universal-cookie": "^4.0.4"
```

## Environments

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
HOLODEX_API_KEY=
GOOGLE_API_KEY=AIz...

CONTENTS_SHEET_ID=sheetId
CHANNELS_SHEET_ID=sheetId
CONTENTS_SHEET_RANGE=Upcoming
CHANNELS_SHEET_RANGE=reference

SHORT_URL=http://SHORT_URL.com
REQUEST_URL=http://REQUEST_URL.com

FIREBASE_CLIENT_EMAIL=firebase-adminsdk...
IREBASE_PROJECT_ID=liveuta-...
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...
NEXT_PUBLIC_FIREBASE_VAPID_KEY=BAKlPECfzNhcI_H8FH1...
```

```
임시

GOOGLE_CLIENT_ID=
GOOGLE_SECRET_KEY=
```

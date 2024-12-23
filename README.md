### 📢 Pull Request는 dev 브랜치에 부탁드립니다.

Main - https://liveuta.vercel.app

Dev - https://liveuta-dev.vercel.app

## node v20.14.0
## pnpm v9.15


## Server API docs

1. POST /api/push

```typescript
interface PushData {
  token: string;
  title: string;
  body: string;
  imageUrl: string;
  /**
   * webpush를 눌렀을때 이동할 링크
   * 이미 liveuta가 켜져있을때는 링크가 있어도 이동없고 내려간 창만 다시 올려줌
   */
  link: string;
  timestamp: string; //unix time
}
```

```
  @body PushData[]

  @return {
    data: {
      response: { success: string; messageId: string; }[];
      successCount: number;
      failureCount: number;
    }
  }
```

## Environments

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# 미사용
HOLODEX_API_KEY=
# Youtube Data v3 API
GOOGLE_API_KEY=AIz...

# Auth 
NEXTAUTH_SECRET=
ACCESS_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
KAKAO_CLIENT_ID=
KAKAO_CLIENT_SECRET=
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

# Google Sheet v4 API, Firebase Cloud Messaging
FIREBASE_CLIENT_EMAIL=firebase-adminsdk...
FIREBASE_PROJECT_ID=liveuta-...
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...
NEXT_PUBLIC_FIREBASE_VAPID_KEY=BAKlP...

MONGODB_URI=

ORACLEDB_CONNECTSTRING=
ORACLEDB_PASSWORD=

# optional
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=
```

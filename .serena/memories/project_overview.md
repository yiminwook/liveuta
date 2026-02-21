# Project Overview: Liveuta

## 목적
V-Singer(버추얼 유튜버) 스케줄 모아보기 서비스.
라이브/예정 방송 목록, 멀티뷰, 즐겨찾기/차단, 채널 목록, 세트리스트 기능 제공.

- Production: https://liveuta.vercel.app
- Dev: https://liveuta-dev.vercel.app

## 기술 스택
- **Framework**: Next.js 15 (App Router), React 19
- **Language**: TypeScript (strict)
- **Styling**: SCSS Modules, Mantine v8 (UI 컴포넌트)
- **State**: Zustand v5, TanStack Query v5
- **HTTP**: ky (서버/클라이언트 인스턴스 분리)
- **Validation**: Zod v4
- **i18n**: i18next (ko/en/ja, 기본값 ko)
- **DB**: MongoDB (스케줄/채널), OracleDB (인증/whitelist/blacklist)
- **Auth**: Google OAuth + JWT
- **Push**: Firebase Cloud Messaging
- **Error monitoring**: Sentry (optional)
- **Test**: Vitest (unit, jsdom), Playwright (e2e)
- **Lint/Format**: Biome + ESLint, lefthook (pre-commit)
- **Package manager**: pnpm 9.15, Node ≥ 22

## 환경변수 (필수)
```
NEXT_PUBLIC_SITE_URL=
GOOGLE_API_KEY=          # YouTube Data v3
ACCESS_SECRET=           # JWT secret
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
NEXT_PUBLIC_FIREBASE_VAPID_KEY=
MONGODB_URI=
ORACLEDB_CONNECTSTRING=
ORACLEDB_PASSWORD=
```

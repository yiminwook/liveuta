# Architecture

## 라우팅 구조 (App Router)

```
src/app/
├── [locale]/                    # 로케일 기반 라우팅 (ko/en/ja)
│   ├── layout.tsx               # 공통 레이아웃 (Header, BottomTab, AccountSidebar)
│   ├── (pip)/                   # 메인 페이지 그룹 (PiP 플레이어 포함)
│   │   ├── page.tsx             # 홈
│   │   ├── schedule/            # 스케줄
│   │   ├── channel/             # 채널
│   │   ├── setting/             # 설정
│   │   ├── my/                  # 즐겨찾기/차단 목록
│   │   ├── featured/            # 피처드
│   │   ├── setlist/             # 세트리스트 목록
│   │   └── request/             # 채널 요청
│   ├── (inner)/                 # 내부 페이지 (PiP 없는 레이아웃)
│   │   ├── multi/               # 멀티뷰
│   │   ├── setlist/[...id]/     # 세트리스트 상세
│   │   └── sign-in/             # 로그인
│   └── [...catchAll]/           # 404 처리
├── api/
│   ├── v1/
│   │   ├── schedule/            # 스케줄 조회 (MongoDB)
│   │   ├── channel/             # 채널 목록/대기/카운트 (MongoDB)
│   │   ├── whitelist/           # 즐겨찾기 (OracleDB)
│   │   ├── blacklist/           # 차단 (OracleDB)
│   │   ├── setlist/             # 세트리스트 (OracleDB)
│   │   ├── member/              # 회원 정보
│   │   ├── sign-in/             # 로그인
│   │   ├── reserve/push/        # FCM 푸시 알림
│   │   ├── featured/            # 피처드 채널
│   │   ├── youtube-channel/     # YouTube API 채널 정보
│   │   ├── metadata/            # 앱 메타데이터
│   │   └── revalidate/          # ISR 재검증
│   └── auth/
│       └── callback/google/     # Google OAuth 콜백
└── admin/                       # 관리자 전용
```

## 데이터 흐름

### 서버 사이드 (RSC)
- `getQueryClient()` (React `cache` 래핑) → `prefetchQuery` → `HydrationBoundary`
- `serverApi` (ky) 사용: `server-only` import 보장

### 클라이언트 사이드
- TanStack Query v5 + `clientApi` (ky)
- `clientApi`는 Zustand `useSession`에서 JWT `accessToken` 자동 첨부

## API 클라이언트 (src/apis/fetcher.ts)
| 인스턴스 | 용도 |
|---|---|
| `serverApi` | RSC에서 내부 API 호출, Next fetch 사용 |
| `clientApi` | 브라우저에서 인증 필요 API, Bearer 토큰 자동 첨부 |
| `proxyApi` | 외부 서비스 프록시 (`/proxy/*`) |
| `revalidateApi` | ISR 캐시 재검증 트리거 |

## 상태 관리 (src/stores/)
| 파일 | 내용 |
|---|---|
| `session.ts` | 인증 세션, localStorage 영속화 (`LIVEUTA_SESSION`) |
| `app.ts` | UI 상태 (사이드바), React Context 패턴으로 제공 |
| `player.ts` | PiP 플레이어 상태 |
| `modal.ts` | 모달 상태 |

## 데이터베이스
- **MongoDB**: schedule, channel, featured (읽기 중심)
  - `MONGODB_SCHEDULE_DB / upcoming_streams` — 스케줄
  - `MONGODB_MANAGEMENT_DB / channel_id_names` — 채널
- **OracleDB**: auth, whitelist, blacklist, setlist (사용자 데이터)
  - `withOracleConnection()` HOF로 연결 자동 관리

## 에러 처리 패턴
```ts
try {
  // ...
} catch (error) {
  const { status, message } = errorHandler(error); // CustomServerError → { status, message }
  return NextResponse.json({ message, data: null }, { status });
}
```

## 경로 별칭 (tsconfig paths)
| 별칭 | 경로 |
|---|---|
| `@/*` | `src/*` |
| `@web/*` | `src/app/[locale]/*` |
| `@api/*` | `src/app/api/*` |
| `@icons/*` | `src/components/icons/*` |
| `@variable` | `src/styles/variable.module.scss` |
| `/*` | 프로젝트 루트 |

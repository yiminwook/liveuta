# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Serena MCP 활용

### 프로젝트 구조 파악
코드베이스를 탐색할 때는 **Serena MCP 도구를 적극 활용**한다. Glob/Grep 대신 아래 도구를 우선 사용:

- `mcp__serena__get_symbols_overview` — 파일의 심볼(클래스/함수/타입) 구조 파악
- `mcp__serena__find_symbol` — 특정 심볼 위치와 본문 조회
- `mcp__serena__find_referencing_symbols` — 심볼 참조 관계 파악
- `mcp__serena__list_dir` / `mcp__serena__find_file` — 디렉토리/파일 탐색
- `mcp__serena__search_for_pattern` — 코드 패턴 검색

세션 시작 시 `mcp__serena__activate_project`로 프로젝트를 활성화하고, `mcp__serena__list_memories`로 기존 메모리를 확인한다.

### 구조 변경 시 메모리 업데이트
라우팅, 디렉토리 구조, 주요 아키텍처가 크게 변경되면 작업 완료 후 반드시 Serena MCP 메모리를 업데이트한다:

```
mcp__serena__write_memory 또는 mcp__serena__edit_memory
대상 파일: architecture.md, project_overview.md, MEMORY.md
```

## Project Overview

**Liveuta** — V-Singer(버추얼 유튜버) 스케줄 모아보기 서비스. 라이브/예정 방송 목록, 멀티뷰, 즐겨찾기/차단, 채널 목록, 세트리스트 기능 제공.

- Node ≥ 22, pnpm 9.15

## Commands

```bash
pnpm dev        # 개발 서버
pnpm build      # 프로덕션 빌드
pnpm lint       # ESLint (Next.js)
pnpm format     # Biome 포맷 (write)
pnpm check      # Biome 전체 검사
pnpm test       # Vitest (unit, jsdom)
pnpm e2e        # Playwright (e2e)
```

단일 테스트 파일 실행:
```bash
pnpm test src/libraries/youtube/url.test.ts
```

pre-commit hook(lefthook)이 자동으로 Biome format + ESLint fix를 staged 파일에 실행한다.

## Next.js 규칙

- **App Router만 사용** (Page Router 사용 금지)
- **Route Handler 우선** — Server Action은 별도 지시 없으면 사용하지 않음
- **Middleware 사용 금지** — 인증은 그룹 라우팅/레이아웃/페이지 내에서 처리
- **`next/image`** 사용 시 `unoptimized` 옵션 유지 (이미 `next.config.ts`에서 전역 설정됨)

## Architecture

### 라우팅 구조

```
src/app/
├── [locale]/               # 로케일 라우팅 (ko / en / ja, 기본값 ko)
│   ├── (pip)/              # 메인 페이지 그룹 (PiP 플레이어 포함)
│   │   ├── page.tsx        # 홈
│   │   ├── schedule/       # 스케줄
│   │   ├── channel/        # 채널 목록
│   │   ├── my/             # 즐겨찾기/차단 목록 (로그인 필요)
│   │   ├── setting/        # 앱 설정
│   │   ├── featured/       # 피처드 채널
│   │   ├── setlist/        # 세트리스트 목록
│   │   └── request/        # 채널 등록 요청
│   └── (inner)/            # PiP 없는 레이아웃
│       ├── multi/          # 멀티뷰 (데스크톱 전용)
│       └── setlist/[id]/   # 세트리스트 상세
├── api/v1/                 # 내부 REST API Route Handlers
│   ├── schedule/           # 스케줄 조회 (MongoDB)
│   ├── channel/            # 채널 목록/대기/카운트 (MongoDB)
│   ├── whitelist/          # 즐겨찾기 (OracleDB)
│   ├── blacklist/          # 차단 (OracleDB)
│   ├── setlist/            # 세트리스트 (OracleDB)
│   ├── reserve/push/       # FCM 푸시 알림
│   ├── youtube-channel/    # YouTube Data API v3
│   └── revalidate/         # ISR 캐시 재검증
└── api/auth/callback/google/  # Google OAuth 콜백
```

`src/temps/` — 폐기 예정 파일 임시 보관 폴더. 수정 대상 제외.

### 데이터 페칭 패턴

**서버 컴포넌트**: `getQueryClient()` (React `cache` 래핑) → `prefetchQuery` → `HydrationBoundary`로 클라이언트에 전달.

**클라이언트**: TanStack Query v5 + `clientApi` (ky). `clientApi`는 Zustand `useSession`에서 JWT `accessToken`을 자동으로 `Authorization: Bearer` 헤더에 첨부.

### API 클라이언트 (`src/apis/fetcher.ts`)

| 인스턴스 | 용도 |
|---|---|
| `serverApi` | RSC에서 내부 API 호출, Next.js fetch 사용 |
| `clientApi` | 브라우저에서 인증 API 호출, Bearer 토큰 자동 첨부 |
| `proxyApi` | 외부 서비스 프록시 (`/proxy/*` rewrites) |
| `revalidateApi` | ISR 재검증 트리거 |

### 상태 관리 (`src/stores/`)

| 파일 | 내용 |
|---|---|
| `session.ts` | 인증 세션, localStorage 영속화 (`LIVEUTA_SESSION`) |
| `app.ts` | UI 상태 (사이드바), React Context 패턴으로 제공 |
| `player.ts` | PiP 플레이어 상태 |
| `modal.ts` | 모달 상태 |

### 데이터베이스

- **MongoDB** (`src/libraries/mongodb/`) — 스케줄(`upcoming_streams`), 채널(`channel_id_names`), 피처드
- **OracleDB** (`src/libraries/oracledb/`) — 인증, whitelist, blacklist, setlist. `withOracleConnection()` HOF로 연결을 자동 관리

### API Route 에러 처리 패턴

```ts
try {
  const dto = schema.safeParse(input);
  if (dto.error) throw new BadReqError(z.prettifyError(dto.error));
  const data = await service(dto.data);
  return NextResponse.json({ message: '...', data });
} catch (error) {
  const { status, message } = errorHandler(error); // CustomServerError → { status, message }
  return NextResponse.json({ message, data: null }, { status });
}
```

Route Handler 파일에서 response 타입을 `export`하여 클라이언트에서 import한다.
예: `export type TGetChannelRes = { message: string; data: TChannel[] }`

## Path Aliases (tsconfig)

| 별칭 | 경로 |
|---|---|
| `@/*` | `src/*` |
| `@web/*` | `src/app/[locale]/*` |
| `@api/*` | `src/app/api/*` |
| `@icons/*` | `src/components/icons/*` |
| `@variable` | `src/styles/variable.module.scss` |
| `/*` | 프로젝트 루트 |

## SCSS 사용 규칙

`_var.scss`, `_util.scss`, `_placeholder.scss`는 모든 SCSS 파일에 **자동 prepend**되므로 별도 import가 필요 없다.

```scss
/* 사용 가능한 패턴 (import 없이 바로 사용) */
background-color: map.get(var.$colors, body);
border: 1px solid map.get(var.$third-colors, default);

@include util.hover { ... }
@include util.min-width(sm) { ... }
```

단, `sass:map`을 직접 사용할 경우 파일 상단에 `@use "sass:map"` 명시 필요.

## 코드 스타일

- TypeScript 타입 이름 prefix: `T` (예: `TTheme`, `TSession`)
- 훅 파일명: `use-kebab-case.ts`
- 컴포넌트 파일명: `PascalCase.tsx`
- SVG import: 컴포넌트로 `import Icon from './icon.svg'`, URL로 `import url from './icon.svg?url'`
- 아이콘: `lucide-react` 사용

## i18n

- 지원 언어: `ko`(기본), `en`, `ja`
- 번역 파일 위치: `messages/{locale}.json`
- 클라이언트: `useTranslations()` 훅, 서버: `getTranslations()` 함수

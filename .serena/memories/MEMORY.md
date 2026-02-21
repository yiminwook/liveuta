# Liveuta Project Memory

## 핵심 파일
- `architecture.md` — 라우팅 구조, 데이터 흐름, DB, 경로 별칭
- `code_style_and_conventions.md` — 코드 스타일, 네이밍, SCSS 패턴
- `suggested_commands.md` — 개발/빌드/테스트/lint 명령어

## 요약
- **V-Singer 스케줄 모아보기** 서비스 (Next.js 15 App Router, React 19, TypeScript)
- pnpm 9.15 / Node ≥ 22
- 로케일 라우팅: `/[locale]/(pip)/`, `/[locale]/(inner)/` 두 레이아웃 그룹
- DB: MongoDB(스케줄/채널) + OracleDB(사용자 데이터)
- 인증: Google OAuth + JWT, Zustand session store → clientApi Bearer 자동 첨부
- SCSS: `var`, `util`, `placeholder` 자동 prepend — 별도 import 불필요
- 타입 prefix: `T` (예: `TTheme`, `TSession`)
- pre-commit: lefthook이 Biome format + ESLint 자동 실행

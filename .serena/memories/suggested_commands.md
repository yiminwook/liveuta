# Suggested Commands

## Development
```bash
pnpm dev          # 개발 서버 시작
pnpm build        # 프로덕션 빌드
pnpm start        # 프로덕션 서버 시작
```

## Code Quality
```bash
pnpm lint         # Next.js ESLint 실행
pnpm format       # Biome 포매터 (write)
pnpm check        # Biome 전체 검사 (lint + format)
```

## Testing
```bash
pnpm test                                     # Vitest 전체 실행 (jsdom)
pnpm test src/libraries/youtube/url.test.ts   # 단일 테스트 파일 실행
pnpm e2e                                      # Playwright e2e 실행
```

## Pre-commit Hooks (lefthook 자동 실행)
- `pnpm biome format --write` - JS/TS/JSON staged 파일
- `pnpm next lint --fix` - JS/TS staged 파일

## 기타
```bash
pnpm exec playwright test   # e2e 직접 실행
```

# Code Style & Conventions

## Formatter (Biome)
- indent: space 2칸
- 따옴표: single quote (`'`)
- JSX 따옴표: double quote (`"`)
- trailing commas: `all`
- semicolons: 항상
- line width: 100자

## TypeScript
- strict mode 활성화
- 타입 이름 prefix: `T` (예: `TTheme`, `TSession`, `TChannelDocument`)
- API response 타입은 route 파일에서 `export` (예: `export type TGetChannelRes = ...`)
- enum 사용 허용 (예: `StreamFilter`)

## 파일/폴더 네이밍
- 컴포넌트 파일: `PascalCase.tsx` (예: `ChannelCard.tsx`)
- 훅 파일: `use-kebab-case.ts` (예: `use-schedule.ts`)
- SCSS 모듈: `component-name.module.scss`
- 페이지: `page.tsx`, 레이아웃: `layout.tsx` (Next.js 규칙)

## SCSS
- `src/styles/_var.scss`, `_util.scss`, `_placeholder.scss`는 **모든 SCSS 파일에 자동 prepend** (별도 import 불필요)
- 사용: `var.$colors`, `util.hover {}`, `util.min-width(sm) {}` 등
- `sass:map`이 필요한 경우 파일 상단에 `@use "sass:map"` 명시 필요
- `map.get(var.$colors, body)`, `map.get(var.$third-colors, default)` 등의 패턴 사용

## 컴포넌트 패턴
- 서버 컴포넌트 기본, 클라이언트는 `'use client'` 명시
- 페이지는 server component → `.client.tsx`로 분리하는 패턴
- API route에서 response type을 export하여 클라이언트에서 import

## 주요 라이브러리 사용 패턴
- **Mantine**: `@mantine/core` 컴포넌트 + SCSS 모듈 조합
- **Zod**: API route에서 dto 검증 (`dto.safeParse()`)
- **i18n**: `useTranslations()` 훅, 번역 키는 `namespace.key` 형식
- **SVG import**: 컴포넌트로 `import Icon from './icon.svg'`, URL로 `import url from './icon.svg?url'`
- **lucide-react**: 아이콘 라이브러리

## 완료 후 체크리스트
1. `pnpm lint` — ESLint 통과 확인
2. `pnpm check` — Biome 포매팅/lint 확인
3. 새 기능은 `pnpm test` 로 관련 테스트 확인
4. pre-commit hook이 자동으로 format + lint 수행

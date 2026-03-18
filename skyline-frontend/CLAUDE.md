# Skyline Planner — Claude Code 프로젝트 지침

## 프로젝트 개요
AI 기반 여행 일정 최적화 앱. 사용자가 여행 계획을 생성·관리하고, Plan A/B 비교, 장소 검색, 소셜 공유, 사진 및 후기 로그 기능을 제공한다.

## 기술 스택
- **Frontend**: React 18 + TypeScript + Vite
- **패키지 매니저**: npm
- **스타일링**: Tailwind CSS
- **상태 관리**: Zustand
- **인증**: Google OAuth
- **API 통신**: axios
- **폼관리** : React Hook Form

## 폴더 구조
```
src/
├── api/          # API 호출 함수 (도메인별 분리)
├── components/   # 재사용 가능한 공통 컴포넌트
├── pages/        # 라우트 단위 페이지 컴포넌트
├── hooks/        # 커스텀 훅
├── stores/       # 전역 상태 (Zustand 등)
├── types/        # TypeScript 타입/인터페이스 정의
├── utils/        # 유틸 함수
└── assets/       # 정적 파일
```

## 코딩 규칙

### 컴포넌트
- 함수형 컴포넌트만 사용 (클래스 컴포넌트 금지)
- Props 타입은 반드시 interface로 정의, `ComponentNameProps` 네이밍
- default export 사용

### TypeScript
- `any` 사용 금지 — unknown 또는 명시적 타입 사용
- API 응답 타입은 `src/types/api.ts`에 중앙 관리
- 옵셔널 체이닝(`?.`)과 nullish 병합(`??`) 적극 활용

### API 호출
- 모든 API 함수는 `src/api/` 아래 도메인별 파일로 분리
- 응답 형태: `{ data, error, status }` 통일
- 에러 처리는 호출부가 아닌 API 레이어에서 처리

### 네이밍
- 컴포넌트 파일: PascalCase (`TripCard.tsx`)
- 훅 파일: camelCase, `use` 접두사 (`useTrips.ts`)
- 유틸 파일: camelCase (`formatDate.ts`)
- 상수: UPPER_SNAKE_CASE

### 스타일
- 인라인 스타일 금지
- 매직 넘버 금지 — 상수로 추출

## 작업 방식
1. 복잡한 기능은 구현 전 `docs/specs/` 에 마크다운 스펙 먼저 작성
2. 커밋 메시지 prefix: `feat` / `fix` / `refactor` / `docs` / `chore`
3. 새 컴포넌트 만들 때는 관련 타입도 함께 정의
4. API 엔드포인트 추가 시 `src/types/api.ts` 타입도 함께 업데이트

## 하지 말아야 할 것
- `console.log` 를 커밋에 포함하지 말 것 (디버깅 후 반드시 제거)
- `.env` 파일 내용을 코드에 하드코딩하지 말 것
- `node_modules`, `dist`, `.env*` 파일을 읽거나 수정하지 말 것
- 기존 동작 중인 컴포넌트를 무단으로 리팩토링하지 말 것

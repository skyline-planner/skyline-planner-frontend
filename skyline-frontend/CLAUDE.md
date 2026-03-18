# Skyline Planner — Claude Code 프로젝트 지침

## 프로젝트 개요
AI 기반 여행 일정 최적화 앱. 사용자가 여행 계획을 생성·관리하고,
Plan A/B 비교, 장소 검색, 소셜 공유, 사진 및 후기 로그 기능을 제공한다.

## 기술 스택
- **Frontend**: React 18 + TypeScript + Vite
- **패키지 매니저**: npm
- **스타일링**: Tailwind CSS
- **상태 관리**: Zustand (전역 클라이언트 상태)
- **서버 상태**: TanStack Query (React Query)
- **인증**: Google OAuth
- **API 통신**: axios (`src/shared/api/client.ts` 기반)
- **폼 관리**: React Hook Form

## 폴더 구조
src/
├── app/                  # 앱 진입점 설정
│   ├── App.tsx
│   ├── providers/        # 전역 Provider (QueryClient, Auth 등)
│   └── router/           # 라우팅 설정 (routes.tsx, index.tsx)
│
├── features/             # 도메인별 기능 단위
│   ├── auth/             # 로그인/회원가입 (SCR-02, SCR-03)
│   │   ├── pages/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── api/
│   ├── trips/            # 여행 생성·편집·목록 (SCR-05~08)
│   │   ├── pages/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── api/
│   ├── profile/          # 프로필 (SCR-10~12)
│   │   ├── pages/
│   │   ├── components/
│   │   └── api/
│   └── report/           # 최적화 리포트 (SCR-09)
│       ├── pages/
│       └── components/
│
└── shared/               # 도메인 무관 공통 코드
├── api/              # axios 클라이언트, 공통 인터셉터
├── components/       # 범용 UI 컴포넌트 (Button, Modal 등)
├── hooks/            # 범용 커스텀 훅
├── stores/           # Zustand 전역 스토어
├── types/            # 공통 타입 (api.ts, domain.ts 등)
└── utils/            # 순수 유틸 함수

## 코딩 규칙

### 컴포넌트
- 함수형 컴포넌트만 사용 (클래스 컴포넌트 금지)
- Props 타입은 반드시 `interface`로 정의, `ComponentNameProps` 네이밍
- `default export` 사용

### TypeScript
- `any` 사용 금지 — `unknown` 또는 명시적 타입 사용
- API 응답 타입은 `src/shared/types/api.ts`에 중앙 관리
- 옵셔널 체이닝(`?.`)과 nullish 병합(`??`) 적극 활용

### 데이터 페칭 (React Query)
- 서버 데이터는 반드시 `useQuery` / `useMutation` 사용 (직접 useState+useEffect 금지)
- 쿼리 키는 `src/shared/api/queryKeys.ts`에서 상수로 관리
- 훅은 각 feature의 `hooks/` 디렉토리에 위치 (`useTrips.ts`, `useProfile.ts` 등)

### API 호출
- axios 인스턴스는 `src/shared/api/client.ts` 하나만 사용
- 도메인별 API 함수는 각 `features/*/api/` 에 위치
- 응답 형태: `{ data, error, status }` 통일
- 에러 처리는 API 레이어에서 처리 (호출부에서 try/catch 금지)
- API 연결 전까지 MSW(Mock Service Worker)로 모든 네트워크 요청을 가로챔
- 모든 API 스펙은 /src/mocks/handlers.ts에 미리 선언해두고, 백엔드 연결 시 URL만 교체


### 백엔드 미완성 대응
- 백엔드 API가 아직 없는 기능은 `src/shared/api/mocks/` 에 mock 함수 작성
- mock 함수와 실제 API 함수는 동일한 시그니처 유지 (교체만 하면 되도록)
- mock 여부는 환경변수 `VITE_USE_MOCK=true` 로 제어

### 네이밍
- 컴포넌트 파일: PascalCase (`TripCard.tsx`)
- 훅 파일: camelCase, `use` 접두사 (`useTrips.ts`)
- 유틸 파일: camelCase (`formatDate.ts`)
- 상수: UPPER_SNAKE_CASE

### 스타일
- 인라인 스타일 금지
- 매직 넘버 금지 — 상수로 추출

## 화면 디자인 참조

화면 디자인 시안은 `docs/designs/` 폴더에 있다.
특정 화면을 구현할 때는 아래 파일을 Read 도구로 읽어 레이아웃과 UI 요소를 참고할 것.

| 화면 | 파일명 |
|------|--------|
| 홈(랜딩) | `docs/designs/홈.png` |
| 메인 피드 | `docs/designs/메인페이지.png` |
| 로그인 | `docs/designs/로그인` *(폴더)* |
| 회원가입 | `docs/designs/회원가입 페이지.png` |
| 닉네임 설정 | `docs/designs/닉네임 받기.png` |
| 내 여행 목록 | `docs/designs/내 여행 관리.png` |
| 여행 생성 | `docs/designs/여행 생성하기.png` |
| 여행 일자 추가 | `docs/designs/여행 일자 추가하기.png` |
| 일정 추가 (첫번째) | `docs/designs/일정 추가하기 - 첫번째.png` |
| 장소 추가 | `docs/designs/장소 추가하기.png` |
| 여행 지역 검색 | `docs/designs/여행 지역 검색창.png` |
| 지역 변경 | `docs/designs/지역 변경하기.png` |
| AI 일정 추가 | `docs/designs/AI 일정 추가하기.png` |
| AI 분석 결과 | `docs/designs/AI 분석하기 누른 후.png` |
| 여행 상세 기록 | `docs/designs/여행 상세 기록 페이지.png` |
| 여행 상세 기록 (탭2) | `docs/designs/여행 상세 기록 페이지-1.png` |
| 최적화 리포트 | `docs/designs/최적화 리포트.png` |
| 최적화 리포트 (잠금) | `docs/designs/최적화 리포트 보기 불가능.png` |
| 프로필 | `docs/designs/프로필.png` |
| 프로필 수정 | `docs/designs/프로필 수정.png` |
| 탈퇴 안내 | `docs/designs/탈퇴 안내문.png` |
| 탈퇴 완료 | `docs/designs/탈퇴가 완료 된 후.png` |
| 404 에러 | `docs/designs/404 - ERROR 페이지.png` |

> 구현 요청 시 "디자인 참고해서 만들어줘" 라고 하면 해당 화면 파일을 먼저 읽고 구현한다.

## 브랜치 전략

```
main
└── develop          ← 통합 브랜치 (PR 머지 대상)
    ├── feature/xxx  ← 신규 기능
    ├── fix/xxx      ← 버그 수정
    ├── refactor/xxx ← 리팩토링
    └── chore/xxx    ← 설정·빌드·의존성
```

### 브랜치 네이밍 규칙
- `feature/trip-create` — 새 기능 (도메인-행위 형태, kebab-case)
- `fix/login-redirect` — 버그 수정
- `refactor/trip-card` — 코드 개선 (기능 변경 없음)
- `chore/msw-setup`    — 설정·의존성·문서

### 작업 흐름
1. `develop` 에서 분기 → 작업 → PR → `develop` 머지
2. 기능 완성 후 `develop` → `main` 머지 (배포)
3. 새 작업 시작 전 반드시 `/branch` 커맨드로 브랜치 생성
4. **`main`과 `develop`에 직접 커밋 금지** — 항상 feature 브랜치에서 작업

### 브랜치 명령 예시
```bash
git checkout develop
git checkout -b feature/trip-create
# 작업 후
git push -u origin feature/trip-create
```

## 커스텀 커맨드 (`.claude/commands/`)
- `/branch` : 작업할 내용을 기반으로 브랜치 생성 및 체크아웃
- `/commit` : 스테이징된 변경사항 기준으로 컨벤션에 맞는 커밋 메시지 생성
- `/review` : 현재 변경사항 코드 리뷰
- `/spec`   : 새 기능 구현 전 `docs/specs/`에 마크다운 스펙 초안 작성

> 커맨드가 목록에 보이지 않으면 Claude Code를 `skyline-frontend/` 디렉토리 안에서 실행했는지 확인할 것.

## 작업 방식
1. 새 기능 시작 → `/branch` 로 브랜치 생성
2. 복잡한 기능은 구현 전 `/spec` 커맨드로 스펙 먼저 작성
3. 커밋 메시지 prefix: `feat` / `fix` / `refactor` / `docs` / `chore`
4. 새 컴포넌트 만들 때는 관련 타입도 함께 정의
5. API 엔드포인트 추가 시 `src/shared/types/api.ts` 타입도 함께 업데이트

## 하지 말아야 할 것
- `console.log` 를 커밋에 포함하지 말 것 (디버깅 후 반드시 제거)
- `.env` 파일 내용을 코드에 하드코딩하지 말 것
- `node_modules`, `dist`, `.env*` 파일을 읽거나 수정하지 말 것
- 기존 동작 중인 컴포넌트를 무단으로 리팩토링하지 말 것
- `features/` 간 직접 import 금지 — 공유가 필요하면 `shared/`로 이동


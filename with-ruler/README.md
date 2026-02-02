# With Ruler

Ruler.toml 기반 코딩 규칙을 준수하는 React + TypeScript 프로젝트입니다.

## 📋 목차

- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [시작하기](#시작하기)
- [코딩 규칙](#코딩-규칙)
- [아키텍처](#아키텍처)

## 🛠 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Vite** - 빌드 도구
- **React Router DOM** - 라우팅
- **Styled Components** - CSS-in-JS
- **SWR** - 서버 상태 관리

## 📁 프로젝트 구조

이 프로젝트는 **Feature-Sliced Design (FSD)** 아키텍처를 따릅니다.

```
src/
├── app/              # 애플리케이션 초기화
├── pages/            # 라우트 단위 페이지
│   └── login/
├── widgets/          # 큰 UI 블록 (여러 feature 조합)
├── features/         # 사용자 행동 단위
│   └── login/
│       ├── api/
│       ├── hooks/
│       ├── ui/
│       └── container/
├── entities/         # 도메인 모델
│   └── user/
└── shared/           # 재사용 가능한 코드
    ├── ui/           # 공통 UI 컴포넌트
    └── lib/          # 유틸리티 함수
```

### 의존성 규칙

레이어 간 의존성은 아래 방향으로만 허용됩니다:

```
app → pages → widgets → features → entities → shared
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버는 `http://localhost:3000`에서 실행됩니다.

### 빌드

```bash
npm run build
```

### 타입 체크

```bash
npm run type-check
```

### 린트

```bash
npm run lint
```

## 📝 코딩 규칙

이 프로젝트는 `ruler.toml` 파일에 정의된 규칙을 **무조건적으로 준수**합니다.

### TypeScript 규칙

- ✅ `strict: true` 환경 전제
- ❌ `any` 타입 사용 **절대 금지**
- ✅ `unknown` 사용 시 런타임 가드 필수
- ❌ `as` 캐스팅 남발 금지
- ✅ `enum` 대신 `as const + union` 우선 고려

### 네이밍 규칙

- **변수/함수**: `camelCase`
- **컴포넌트/타입/인터페이스**: `PascalCase`
- **상수**: `SCREAMING_SNAKE_CASE` (진짜 상수만)
- **boolean 값**: `is/has/can/should` 접두어 사용
  - 예: `isLoading`, `hasPermission`, `canSubmit`

### 함수 규칙

- 함수는 **동사로 시작**
- 가능한 한 **순수 함수**로 작성
- 중첩 조건문 대신 **Early Return** 사용

### Null/Undefined

- `null`과 `undefined` 혼용 금지
- "값 없음"은 기본적으로 `undefined` 사용

### React 컴포넌트 규칙

#### 컴포넌트 원칙

- ✅ 함수 컴포넌트만 사용
- ❌ 클래스형 컴포넌트 **금지**
- 한 컴포넌트가 200줄을 넘으면 분리 검토

#### 역할 분리 (강제)

**Presentational Component** (`{Name}.ui.tsx`)
- UI 렌더링만 담당
- 비즈니스 로직 포함 금지
- Storybook 작성 대상

**Container Component** (`{Name}.container.tsx`)
- 비즈니스 로직 및 Hook 사용
- SRP(단일 책임 원칙) 준수

**Page Component**
- 페이지 단위 책임
- path parameter / query validation / redirect 처리
- page 파일만 default export 허용

### Hooks 규칙

- 커스텀 훅은 반드시 `useXxx` 형태
- 훅은 **UI 로직을 포함하지 않음**
- 데이터 / 상태 / 액션만 담당

### 상태 관리

- UI 상태와 서버 상태 분리
- 서버 상태는 **SWR** 사용
- 전역 상태로 모든 것을 올리는 행위 금지

### 스타일 규칙

- 스타일은 **styled-components 하나로 통일**
- 디자인 토큰(색상/간격/폰트)은 상수화
- 접근성 기본 준수:
  - button / link 역할 구분
  - image alt
  - input label

### 테스트 규칙

- 순수 함수: jest 기반 unit test 필수
- 주요 UI 컴포넌트: Storybook 필수
- Custom Hook: jest 통합 테스트 권장
- 테스트 없는 리팩토링 금지
- 테스트 네이밍:
  - `should ...`
  - `given / when / then`

## 🏗 아키텍처

### Feature-Sliced Design (FSD)

모든 코드는 FSD 레이어 중 하나에 속해야 하며, 레이어를 건너뛰는 의존성은 금지됩니다.

#### 레이어 설명

**app**
- 애플리케이션 초기화 코드
- 전역 Provider (Theme, QueryClient 등)
- 전역 에러 처리, 라우팅 설정

**pages**
- 라우트 단위의 페이지
- URL / path param / query 검증
- 페이지 조립 책임만 가짐

**widgets**
- 페이지를 구성하는 큰 UI 블록
- 여러 feature / entity를 조합

**features**
- 사용자 행동 단위
- 하나의 "동사"를 표현
- 예: `login`, `signup`, `submitComment`

**entities**
- 도메인 모델 중심
- 데이터 구조와 그에 대한 최소한의 로직
- 예: `user`, `post`

**shared**
- 특정 도메인에 종속되지 않는 코드
- 가장 재사용성이 높은 영역
- 공통 UI 컴포넌트, hooks, utils, constants

### 파일 위치 결정 규칙

코드를 작성하기 전에 다음을 판단합니다:

1. 이 코드는 **라우트 책임인가?** → `pages`
2. 사용자 행동 단위인가? → `features`
3. 도메인 모델인가? → `entities`
4. 재사용 UI / 유틸인가? → `shared`
5. 여러 개를 조합한 큰 블록인가? → `widgets`

판단이 불가능한 경우: **작성을 멈추고 질문합니다**

## 🔍 코드 리뷰 기준

- 타입 안전성이 유지되는가?
- 비즈니스 로직이 JSX에 섞이지 않았는가?
- 네이밍이 의미 기반인가?
- 테스트가 존재하는가?

### 절대 허용되지 않는 항목

- ❌ `any` 사용
- ❌ 하드코딩된 값
- ❌ console.log 커밋

## 🛣 기능 개발 프로세스

1. 관련 가이드 문서 확인
2. 기존 코드 패턴 파악
3. 타입 정의 먼저 작성
4. 테스트 전략 수립 후 구현

### 핵심 원칙

- 한 번에 하나의 책임만 구현
- 작은 단위의 함수로 나눔
- 읽기 쉬운 코드가 최우선

## 📚 환경 변수

프로젝트 루트에 `.env` 파일을 생성하여 환경 변수를 설정할 수 있습니다:

```env
VITE_API_URL=https://api.example.com
```

## 📄 라이선스

이 프로젝트는 private 프로젝트입니다.



## ⚠️ 규칙 준수 누락 사항

ruler.toml 규칙 검사 결과, 다음 항목들이 누락되었습니다:

### 1. 디자인 토큰 상수화 (강제 규칙 위반)

**규칙**: `.ruler/frontend.md` - "디자인 토큰(색상/간격/폰트)은 상수화한다"

**현재 상태**:
- `Input.ui.tsx`, `Button.ui.tsx`, `LoginForm.ui.tsx`에서 색상 값이 하드코딩됨
- 예: `#e74c3c`, `#3498db`, `#ddd`, `#333`, `#f5f5f5` 등

**빠진 것**: `src/shared/constants/designTokens.ts` 같은 디자인 토큰 파일

**이유**: 
- 규칙을 인지했지만 구현 단계에서 적용하지 않음
- 빠른 구현을 우선시함

---

### 2. Storybook 파일 (필수)

**규칙**: 
- `.ruler/frontend.md` - "주요 UI 컴포넌트: Storybook 필수"
- `.ruler/testing.md` - "주요 UI 컴포넌트: Storybook 필수"

**현재 상태**:
- `Input.ui.tsx`, `Button.ui.tsx`, `LoginForm.ui.tsx`에 Storybook 파일 없음

**빠진 것**:
- `Input.ui.stories.tsx`
- `Button.ui.stories.tsx`
- `LoginForm.ui.stories.tsx`

**이유**:
- Storybook 설정과 의존성 추가가 필요해 보류
- "주요 UI 컴포넌트" 범위를 명확히 판단하지 않음

---

### 3. Jest 테스트 파일 (필수/권장)

**규칙**: `.ruler/testing.md`
- "순수 함수: jest 기반 unit test 필수"
- "Custom Hook: jest 통합 테스트 권장"

**현재 상태**:
- `validation.ts`의 순수 함수들에 테스트 없음
- `useLogin.ts` 훅에 테스트 없음

**빠진 것**:
- `validation.test.ts` 또는 `validation.spec.ts`
- `useLogin.test.ts` 또는 `useLogin.spec.ts`

**이유**:
- 테스트 설정(jest, testing-library)이 필요해 보류
- 기능 구현을 우선시함

---

### 4. SWR 사용 (규칙 위반)

**규칙**: `.ruler/frontend.md` - "서버 상태는 SWR을 사용한다"

**현재 상태**:
- `useLogin.ts`에서 직접 `fetch` 사용
- SWR 미사용

**빠진 것**: SWR을 사용한 서버 상태 관리

**이유**:
- 로그인은 일회성 액션이라 SWR 적용이 덜 명확해 보였음
- 규칙을 엄격히 적용하지 않음

---

### 5. FSD app 레이어 구조

**규칙**: `.ruler/fsd.md`
- "app - 애플리케이션 초기화 코드, 전역 Provider, 라우팅 설정"

**현재 상태**:
- `App.tsx`가 `src/` 루트에 있음
- FSD 구조상 `src/app/`에 있어야 함

**빠진 것**: `src/app/` 디렉토리 구조

**이유**:
- 기존 구조를 그대로 사용
- FSD 레이어 구조를 완전히 적용하지 않음

---

### 6. 하드코딩된 값 (금지 항목)

**규칙**: `.ruler/prompts/code-review.md` - "하드코딩된 값" 절대 허용 안 됨

**현재 상태**:
- 색상 값 하드코딩
- 간격 값 하드코딩 (`8px`, `12px`, `20px` 등)
- 폰트 크기 하드코딩 (`14px`, `16px`, `24px` 등)

**빠진 것**: 상수화된 디자인 토큰

**이유**: 디자인 토큰 상수화와 동일한 이유

---

### 요약

| 항목 | 규칙 중요도 | 현재 상태 | 이유 |
|------|------------|----------|------|
| 디자인 토큰 상수화 | 강제 | 미구현 | 빠른 구현 우선 |
| Storybook | 필수 | 없음 | 설정 필요성으로 보류 |
| Jest 테스트 | 필수/권장 | 없음 | 설정 필요성으로 보류 |
| SWR 사용 | 규칙 | 미사용 | 일회성 액션으로 판단 |
| app 레이어 구조 | FSD 원칙 | 구조 미준수 | 기존 구조 유지 |
| 하드코딩 값 제거 | 금지 | 존재 | 디자인 토큰 미적용 |

**가장 중요한 누락 사항**: 디자인 토큰 상수화, Storybook, 테스트 파일

## 🛡️ 규칙 준수 누락 방지 방법

규칙 준수 누락을 방지하기 위한 체계적인 접근 방법:

### 1. 개발 전 필수 체크리스트

코드 작성 전에 다음을 확인:

#### 기능 개발 시작 전
- [ ] 관련 `.ruler/*.md` 규칙 파일 모두 읽기
- [ ] FSD 레이어 구조 판단 (어디에 위치할지)
- [ ] 타입 정의 먼저 작성 (`entities/` 또는 `shared/`)
- [ ] 테스트 전략 수립 (어떤 테스트가 필요한지)

#### UI 컴포넌트 작성 전
- [ ] 디자인 토큰 파일 확인 (`shared/constants/designTokens.ts`)
- [ ] 하드코딩 값 사용 금지 확인
- [ ] Storybook 작성 필요 여부 확인 (`.ui.tsx` 파일은 필수)
- [ ] 접근성 속성 확인 (label, aria-label, role 등)

#### API/상태 관리 작성 전
- [ ] SWR 사용 여부 확인 (서버 상태는 SWR 필수)
- [ ] UI 상태 vs 서버 상태 분리 확인
- [ ] Custom Hook 테스트 필요 여부 확인

### 2. 자동화 도구 활용

#### Pre-commit Hook 설정
```bash
# .husky/pre-commit 예시
npm run type-check
npm run lint
npm run test
```

#### ESLint 규칙 강화
- 하드코딩된 색상 값 감지 규칙
- `any` 타입 사용 금지 (이미 설정됨)
- console.log 사용 금지 규칙

#### TypeScript 설정
- `strict: true` (이미 설정됨)
- `noUncheckedIndexedAccess: true` (이미 설정됨)

### 3. 규칙 우선순위 명시

규칙을 중요도별로 분류하여 우선 적용:

**P0 (절대 필수)**
- TypeScript `any` 금지
- 하드코딩된 값 금지
- 디자인 토큰 상수화

**P1 (필수)**
- Storybook (주요 UI 컴포넌트)
- Jest 테스트 (순수 함수, Custom Hook)
- SWR 사용 (서버 상태)

**P2 (권장)**
- FSD 레이어 구조 완벽 준수
- 테스트 커버리지 목표 설정

### 4. 템플릿/보일러플레이트 사용

#### 컴포넌트 생성 템플릿
```typescript
// shared/ui/Component/Component.ui.tsx 템플릿
import styled from 'styled-components';
import { COLORS, SPACING, FONT_SIZES } from '../../constants/designTokens';

// 디자인 토큰 사용 필수
```

#### Storybook 템플릿
```typescript
// Component.ui.stories.tsx (자동 생성)
// 모든 .ui.tsx 파일에 필수
```

### 5. 코드 리뷰 체크리스트

PR 생성 시 자동 체크:

#### 필수 체크 항목
- [ ] `any` 타입 사용 여부
- [ ] 하드코딩된 값 존재 여부
- [ ] 디자인 토큰 사용 여부
- [ ] Storybook 파일 존재 여부 (`.ui.tsx` 파일)
- [ ] 테스트 파일 존재 여부 (순수 함수, Hook)
- [ ] SWR 사용 여부 (서버 상태)
- [ ] FSD 레이어 구조 준수 여부
- [ ] console.log 제거 여부

### 6. AI 프롬프트 개선

코드 생성 시 AI에게 명시적으로 요청:

```
다음 규칙을 반드시 준수하여 구현:
1. 디자인 토큰은 shared/constants/designTokens.ts에서 import
2. .ui.tsx 파일은 반드시 .stories.tsx 파일 생성
3. 순수 함수는 validation.test.ts 테스트 파일 생성
4. 서버 상태는 SWR 사용
5. 하드코딩된 값 절대 금지
```

### 7. 단계별 검증 프로세스

#### Step 1: 계획 단계
- FSD 레이어 위치 결정
- 필요한 파일 목록 작성
- 테스트 전략 수립

#### Step 2: 구현 단계
- 타입 정의 먼저 작성
- 디자인 토큰 확인 후 스타일 작성
- 컴포넌트와 테스트 동시 작성

#### Step 3: 검증 단계
- 규칙 체크리스트 확인
- 자동화 도구 실행 (lint, type-check)
- Storybook 확인

#### Step 4: 커밋 전
- console.log 제거 확인
- 하드코딩 값 확인
- 테스트 통과 확인

### 8. 규칙 문서화 강화

각 규칙 파일에 예시 추가:
- `.ruler/frontend.md`에 디자인 토큰 사용 예시
- `.ruler/testing.md`에 테스트 작성 예시
- `.ruler/fsd.md`에 레이어 구조 예시

### 9. 정기적인 규칙 검토

- 주간 규칙 준수 현황 점검
- 누락 사항 패턴 분석
- 규칙 개선 사항 반영

### 10. 개발자 온보딩

신규 개발자에게:
- ruler.toml 규칙 전체 읽기 필수
- 체크리스트 제공
- 예시 코드 리뷰

---

## 📋 빠른 참조 체크리스트

### 컴포넌트 작성 시
```
[ ] 디자인 토큰 사용 (하드코딩 금지)
[ ] .ui.tsx → .stories.tsx 필수
[ ] 접근성 속성 포함
[ ] 타입 안전성 확인 (any 금지)
```

### 함수 작성 시
```
[ ] 순수 함수 → .test.ts 필수
[ ] Custom Hook → .test.ts 권장
[ ] Early Return 사용
[ ] 동사로 시작하는 함수명
```

### API/상태 관리 시
```
[ ] 서버 상태 → SWR 사용
[ ] UI 상태와 분리
[ ] 에러 처리 포함
```

### 커밋 전
```
[ ] console.log 제거
[ ] 하드코딩 값 확인
[ ] 타입 체크 통과
[ ] 린트 통과
[ ] 테스트 통과
```

## 사용된 prompt
```
React + TypeScript로 로그인 페이지를 구현해줘.

요구사항:
- 이메일, 비밀번호 입력 필드
- 간단한 유효성 검사
- 로그인 버튼 클릭 시 API 호출
- 전체 코드는 React 함수 컴포넌트 기준
```
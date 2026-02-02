# Pre-Flight Checklist (개발 전 필수 확인)

코드 작성 **전에** 반드시 다음을 확인하고 체크하세요.

## 🎯 기능 개발 시작 전

### 1. 규칙 파일 확인
- [ ] 관련 `.ruler/*.md` 규칙 파일 모두 읽기
- [ ] `base.md` - 기본 코딩 규칙
- [ ] `frontend.md` - 프론트엔드 규칙
- [ ] `fsd.md` - FSD 아키텍처 규칙
- [ ] `testing.md` - 테스트 규칙
- [ ] `prompts/feature-dev.md` - 기능 개발 프로세스

### 2. FSD 레이어 구조 판단
- [ ] 이 코드는 어느 레이어에 속하는가?
  - `app` - 애플리케이션 초기화?
  - `pages` - 라우트 단위 페이지?
  - `widgets` - 큰 UI 블록?
  - `features` - 사용자 행동 단위?
  - `entities` - 도메인 모델?
  - `shared` - 재사용 코드?
- [ ] 레이어 간 의존성 방향 확인 (아래 방향만 허용)

### 3. 타입 정의 우선
- [ ] 타입/인터페이스 먼저 작성 (`entities/` 또는 `shared/`)
- [ ] `any` 타입 사용 절대 금지
- [ ] `unknown` 사용 시 런타임 가드 포함

### 4. 테스트 전략 수립
- [ ] 순수 함수인가? → jest unit test 필수
- [ ] UI 컴포넌트인가? → Storybook 필수
- [ ] Custom Hook인가? → jest 통합 테스트 권장

---

## 🎨 UI 컴포넌트 작성 전

### 1. 디자인 토큰 확인
- [ ] `shared/constants/designTokens.ts` 파일 확인
- [ ] 색상 값 하드코딩 **절대 금지**
- [ ] 간격 값 하드코딩 **절대 금지**
- [ ] 폰트 크기 하드코딩 **절대 금지**
- [ ] 모든 스타일 값은 디자인 토큰에서 import

### 2. 컴포넌트 역할 분리
- [ ] Presentational Component (`{Name}.ui.tsx`)
  - UI 렌더링만 담당
  - 비즈니스 로직 포함 금지
  - Storybook 작성 **필수**
- [ ] Container Component (`{Name}.container.tsx`)
  - 비즈니스 로직 및 Hook 사용
  - SRP 준수

### 3. Storybook 필수
- [ ] `.ui.tsx` 파일은 반드시 `.stories.tsx` 파일 생성
- [ ] Storybook 설정 확인

### 4. 접근성 확인
- [ ] `label` 속성 포함 (input)
- [ ] `aria-label` 속성 포함
- [ ] `role` 속성 적절히 사용
- [ ] `alt` 속성 (image)
- [ ] button / link 역할 구분

---

## 🔌 API/상태 관리 작성 전

### 1. 서버 상태 관리
- [ ] 서버 상태인가? → **SWR 사용 필수**
- [ ] UI 상태와 서버 상태 분리 확인
- [ ] `fetch` 직접 사용 금지 (SWR 사용)

### 2. Custom Hook
- [ ] `useXxx` 형태로 네이밍
- [ ] UI 로직 포함하지 않음
- [ ] 데이터 / 상태 / 액션만 담당
- [ ] jest 통합 테스트 권장

---

## ✅ 구현 중 체크

### 1. 네이밍 규칙
- [ ] 변수/함수: `camelCase`
- [ ] 컴포넌트/타입: `PascalCase`
- [ ] 상수: `SCREAMING_SNAKE_CASE`
- [ ] boolean: `is/has/can/should` 접두어

### 2. 함수 규칙
- [ ] 함수는 동사로 시작
- [ ] 순수 함수 우선
- [ ] Early Return 사용

### 3. TypeScript 규칙
- [ ] `any` 타입 절대 금지
- [ ] `as` 캐스팅 남발 금지
- [ ] `enum` 대신 `as const + union` 우선

---

## 🚫 절대 금지 항목

- [ ] `any` 타입 사용
- [ ] 하드코딩된 값 (색상, 간격, 폰트)
- [ ] `console.log` 커밋
- [ ] 레이어를 건너뛰는 의존성
- [ ] 클래스형 컴포넌트
- [ ] 서버 상태에서 `fetch` 직접 사용 (SWR 필수)

---

## 📝 커밋 전 최종 체크

- [ ] 타입 체크 통과 (`npm run type-check`)
- [ ] 린트 통과 (`npm run lint`)
- [ ] 테스트 통과 (`npm run test`)
- [ ] `console.log` 제거 확인
- [ ] 하드코딩 값 확인
- [ ] Storybook 파일 존재 확인 (`.ui.tsx` 파일)
- [ ] 테스트 파일 존재 확인 (순수 함수, Hook)

---

## 💡 빠른 참조

### 컴포넌트 작성 시
```
디자인 토큰 사용 → .ui.tsx → .stories.tsx 필수
접근성 속성 → 타입 안전성 (any 금지)
```

### 함수 작성 시
```
순수 함수 → .test.ts 필수
Early Return → 동사로 시작
```

### API/상태 관리 시
```
서버 상태 → SWR 사용
UI 상태와 분리
```

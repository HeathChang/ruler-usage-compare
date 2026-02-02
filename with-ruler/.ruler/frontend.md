# Frontend Rules (React / Next.js)

## 컴포넌트 원칙
- 함수 컴포넌트만 사용한다.
- 클래스형 컴포넌트는 **금지**.
- 한 컴포넌트가 200줄을 넘으면 분리를 검토한다.

---

## 컴포넌트 역할 분리 (강제)

### Presentational Component
- UI 렌더링만 담당한다.
- 비즈니스 로직을 포함하지 않는다.
- Storybook 작성 대상이다.
- 파일명: `{Name}.ui.tsx`

### Container Component
- 비즈니스 로직 및 Hook 사용 담당
- SRP(단일 책임 원칙)를 따른다.
- 파일명: `{Name}.container.tsx`

### Page Component
- 페이지 단위 책임
- path parameter / query validation / redirect 처리
- page 파일만 default export 허용

---

## Hooks 규칙
- 커스텀 훅은 반드시 `useXxx` 형태로 작성한다.
- 훅은 **UI 로직을 포함하지 않는다**.
- 데이터 / 상태 / 액션만 담당한다.

---

## 상태 관리
- UI 상태와 서버 상태를 분리한다.
- 서버 상태는 SWR을 사용한다.
- 전역 상태로 모든 것을 올리는 행위는 금지한다.

---

## 스타일 규칙 (강제)
- 스타일은 **styled-components 하나로 통일**한다.
- 디자인 토큰(색상/간격/폰트)은 상수화한다.
- 접근성 기본을 반드시 지킨다:
  - button / link 역할 구분
  - image alt
  - input label

# Base Coding Rules (Company Standard)

## 언어 / 기본 태도
- 모든 응답과 코드 설명은 **한국어**로 작성한다.
- 추측하지 말고, 불확실한 경우 반드시 질문한다.
- 가정이 필요한 경우: "다음과 같이 가정하고 진행한다"를 명시한다.

---

## TypeScript 절대 규칙
- `strict: true` 환경을 전제로 작성한다.
- `any` 타입 사용은 **절대 금지**.
- 필요한 경우 `unknown`을 사용하고 **런타임 가드로 타입을 좁힌다**.
- `as` 캐스팅 남발 금지 (`as unknown as` 금지).
- enum 대신 `as const + union`을 **우선 고려**한다.

---

## 네이밍 규칙 (강제)
- 변수 / 함수: `camelCase`
- 컴포넌트 / 타입 / 인터페이스: `PascalCase`
- 상수: **SCREAMING_SNAKE_CASE** (진짜 상수만)
- boolean 값은 `is / has / can / should` 접두어 사용

예:
- `isLoading`, `hasPermission`, `canSubmit`

---

## 함수 규칙
- 함수는 **동사로 시작**한다.
- 가능한 한 **순수 함수**로 작성한다.
- 중첩 조건문 대신 **Early Return**을 사용한다.

---

## Null / Undefined
- `null`과 `undefined`를 혼용하지 않는다.
- “값 없음”은 기본적으로 `undefined`를 사용한다.

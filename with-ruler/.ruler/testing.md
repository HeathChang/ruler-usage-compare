# Testing Rules

## 필수 테스트
- 순수 함수: jest 기반 unit test 필수
- 주요 UI 컴포넌트: Storybook 필수
- Custom Hook: jest 통합 테스트 권장

---

## 테스트 원칙
- 테스트 없는 리팩토링 금지
- 테스트 네이밍은 다음 중 하나로 통일:
  - `should ...`
  - `given / when / then`

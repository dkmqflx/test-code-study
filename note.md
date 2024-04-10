## Arrange-Act-Assert 테스트 작성 패턴

### 1. Arrange

- 컴포넌드를 렌더링하는 코드와 같이 테스트를 위한 코드

### 2. Act

- 테스트할 동작을 재현하는 코드

- 컴포넌트를 클릭하거나 키를 입력하는 등

### 3. Assert

- 우리가 원하는 대로 결과가 나왔는지 검증하는 코드

<br/>

## 2.3 setup과 teardown

- 테스트가 시작 전 후에 다른 테스트에 영향을 미치지 않도록 초기화나 데이터 세팅을 다시하도록 한다

- [공식문서 - Setup and Teardown](https://vitest.dev/api/#setup-and-teardown)

  - setup: before-\*

  - teardown: after-\*

- setup과 teardown 함수를 전역적으로 선언할 수도 있지만, describe 안에 작성해서 해당 describe 안에서만 작동하도록 할 수 있다.

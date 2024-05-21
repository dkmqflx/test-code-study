## 4.2. Cypress로 E2E 테스트 시작하기

- scripts에 있는 아래 명령어의 'start-server-and-test' 라이브러리는, 로컬 서버를 기준으로 웹앱을 구동하여 사비프레스로 E2E 테스트를 실행할 때 많은 개발자들이 사용하는 라이브러리

- 또한 공식 홈페이지에도 소개된 라이브러리

```json

"scripts":{
    "cypress:open": "cypress open", // 헤드 모드로 브라우저를 구동하고 테스트를 실행하며
    "cypress:run": "cypress run", // 브라우저 UI를 구동하지 않고 헤드리스 모드로 실행
    "e2e": "start-server-and-test dev http://localhost:5173 cypress:open",
    "e2e:ci": "start-server-and-test dev http://localhost:5173 cypress:run"

}

```

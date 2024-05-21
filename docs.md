## 3.3. 크로마틱(Chromatic)을 통한 UI 테스트 자동화

### 픽셀 단위 차이가 이만큼 존재합니다

- 가운데 이미지의 빨간점으로 표시된 부분이 두 이미지의 픽셀에서 서로 다른 부분

- 이렇게 알고리즘으로 픽셀까지 비교해보면 렌더링된 이미지가 분면 다른 것을 알 수 있다.

- 더 나아가 운영체제나 브라우저마다 각자 렌더링하는 방식이 다를 수 있는데

- 그렇다면 각 환경에서 렌더링된 이미지가 육안으로는 동일한 이미지로 보이지만 픽셀 단위로 비교해보면 다른 이미지로 판명될 수 있다

- 이런식으로 픽셀 단위를 기준으로 결과를 검증한다면 사실상 의미 있는 테스트라고 할 수 없고

- 운영체제나 브라우저 버전이 조금만 달라져도 모두 다른 이미지라고 판명될 가능성이 있고

- 스냅샷도 엄청나게 늘어나 사실상 관리하기가 불가능해질 것

<br/>

- 크로마틱 홈페이지에서 프로젝트를 등록하고

- 토큰을 통해 실행할 수 있도록 한다

- Get the Chromatic package

  ```shell

  npm install --save-dev chromatic

  ```

- Publish your Storybook

- On the command line, publish to Chromatic’s secure CDN for the first time with the following command:

  ```shell

  npx chromatic --project-token=chpt_4157ea395dcda12

  ```

- 위 명령어를 실행해서 배포 후, UI상 변경한 다음 다시 커밋을 한 다음 다시 배포 하면 변경사항이 생겼다고 경고 메세지를 보여준다

- 이 변경사항이 의도된 것이라면 Accept, 아니라면 Deny 버튼을 클릭하도록 한다

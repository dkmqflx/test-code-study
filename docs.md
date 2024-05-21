## 5.7. 테스트 더블

### Dummy

- 예를들어 구매 페이지에 배송 정보를 입력하는 Shipping Information

  - ShippingInformationForm.spec.jsx

### Stub

- setupTest.js

- handlers.js

### Spy

- vi.fn으로 생성한 함수는 스텁이자 스파이

  - NavigationBar.spec.jsx

  - Forms.spec.jsx

- 스텁이나 스파이는 실제 모듈의 구현이 완성되지 않았거나 일부 케이스만 구현하여 검증할 때 유용하게 사용할 수 있는데

- 하지만 스텁은 일부 제한된 케이스에 대해서만 검증하기 위한 방식이며 스파이는 스텁이나 실제 구현의 호출 정보만 추가적으로 기록하여 알려주는 것이기 때문에 스텁과 스파이를 사용하여 검증에 성공했다고 앱 전체가 완전히 동작한다고 맹신해서는 안된다

### Mock

- NavigationBar.spec.jsx

### Fake

- NavigationBar.spec.jsx

- common.spec.jsx

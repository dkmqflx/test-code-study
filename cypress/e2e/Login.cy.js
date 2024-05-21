beforeEach(() => {
  // baseURL을 기준으로 웹 페이지로 접속할 수 있도록 도와주는 함수
  cy.visit('/login');
  // get API -> Cypress에서 지정한 별칭(alias)로 선언한 요소에 접근 가능
  cy.findByLabelText('로그인').as('loginBtn');
});

it('이메일을 입력하지 않고 로그인 버튼을 클릭할 경우 "이메일을 입력하세요" 경고 메세지가 노출된다', () => {
  // Cypress testing library -> 사용자가 앱을 사용하는 방식과 유사하게 요소 탐색 -> 신뢰성 있는 테스트 코드
  cy.findByLabelText('로그인').click();
  // cy.get('button.MuiButton-containerPrimary).click();
  // get API 사용할 수 있지만 돔 구조에 지나치게 의존하는 방식으로 요소를 조회하고 있다
  // 이런식으로 테스트를 작성하면 돔 구조가 조금만 바뀌어도 깨지기 쉬우며 어떤 요소를 조회하는지 명확하게 알기도 어렵다.

  // get API -> Cypress에서 지정한 별칭(alias)로 선언한 요소에 접근 가능
  // cy.get('@loginBtn').click()

  cy.findByText('이메일을 입력하세요').should('exist'); // should로 단언
});

it('비밀번호를 입력하지 않고 로그인 버튼을 클릭할 경우 "비밀번호를 입력하세요" 경고 메세지가 노출된다', () => {
  cy.findByLabelText('로그인').click();

  cy.findByText('비밀번호를 입력하세요').should('exist');
});

it('잘못된 양식의 이메일을 입력한 뒤 로그인 버튼을 클릭할 경우 "이메일 양식이 올바르지 않습니다" 경고 메세지가 노출된다', () => {
  // 1. 이메일 요소 조회 커맨드 실행 -> 완료되어야 type 커맨드로 subject넘어가 실행됨
  // 2. type 커맨드로 텍스트 입력
  cy.findByLabelText('이메일').type('wrongemail#mail.com');
  cy.findByLabelText('로그인').click();

  // 사이프레스의 API는 내부적으로 만든 체이닝 구조에 의해 비동기로 동작한다
  // 따라서 아래처럼 변수에 담는 코드는 제대로 동작하지 않는다

  // const email = cy.findByLabelText('이메일')
  // email.type('wrongemail#mail.com');

  // 커멘드가 실행될 때 각 subject는 내부적으로 비동기 대기열에서 대기하다가 실행
  // get API나 테스팅 라이브러리의 쿼리 실행이 완료되는 타이밍
  // -> subject 체이닝 형태로 연속해서 커맨드를 실행 or then() API를 사용

  // then() API -> 이전 커맨드의 subject 실행 결과를 전달받아 사용
  // 체이닝 형태로만 subject 결과를 전달받아 사용 가능 -> 실행 결과 전달을 yield라고 표현

  // then 내부에서 반환하는 값은 새로운 subject가 되어 다음 커맨드에서 사용
  // 아무것도 반환하지 않을 경우 다음 커맨드에서는 이전 subject를 그대로 사용
  /**
   * cy.findByLabelText('이메일')
   * .then($email => {
   *  const cls = $email.attr('class')
   *
   *  ...
   * })
   * .click();
   */

  cy.findByText('이메일 양식이 올바르지 않습니다').should('exist');

  // 사이프레스는 체이닝 형태로 테스트 코드 작성 -> 테스트의 과정을 이해하기 휘움, 코드를 간결하게 작성할 수 있음.
  // 사이프레스는 이 각각의 체이닝 단계를 subject라는 객체로 관리한다
});

it('회원 가입 클릭 시 회원 가입 페이지로 이동한다', () => {
  // E2E에서는 단위, 통합 테스트처럼 라우터 라이브러리를 모킹하는 작업이 없음
  // -> 실제로 페이지가 이동하는지 확인할 수 있기 때문에 실제 앱의 동작과 완전히 동일하게 검증
  cy.findByText('회원가입').click();

  cy.url().should('eq', `${Cypress.env('baseUrl')}/register`);
});

it('성공적으로 로그인 되었을 경우 메인 홈 페이지로 이동하며, 사용자 이름 "Maria"와 장바구니 아이콘이 노출된다', () => {
  // 실제 로그인 API를 호출하여 백엔드까지 연동했을 때 로그인의 성공 여부를 확인
  // 메인 페이지로 이동하여 사용자 계정 정보가 나타나는지 확인 가능

  // 이런 계졍 정보는 백엔드 팀과 미리 상의해서 정해놓도록 하는게 좋다
  const username = 'maria@mail.com';
  const password = '12345';

  cy.findByLabelText('이메일').type(username);
  cy.findByLabelText('비밀번호').type(password);
  cy.findByLabelText('로그인').click();

  cy.url().should('eq', `${Cypress.env('baseUrl')}/`);
  cy.findByText('Maria').should('exist');
  cy.findByTestId('cart-icon').should('exist');
});

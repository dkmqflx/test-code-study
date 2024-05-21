beforeEach(() => {
  cy.visit('/register'); // 회원가입 페이지로 이동
});

it('이름을 입력하지 않고 가입 버튼을 누를 경우 "이름을 입력하세요" 경고 메세지가 노출된다', () => {
  cy.findByText('가입').click();

  cy.findByText('이름을 입력하세요').should('exist');
});

it('이메일을 입력하지 않고 가입 버튼을 누를 경우 "이메일을 입력하세요" 경고 메세지가 노출된다', () => {
  cy.findByText('가입').click();

  cy.findByText('이메일을 입력하세요').should('exist');
});

it('잘못된 양식의 이메일을 입력한 후 가입 버튼을 클릭하면 "이메일 양식이 올바르지 않습니다" 경고 메세지가 노출된다', () => {
  cy.findByLabelText('이메일').type('email.com');
  cy.findByText('가입').click();

  cy.findByText('이메일 양식이 올바르지 않습니다').should('exist');
});

it('비밀번호를 입력하지 않고 가입 버튼을 클릭할 경우 "비밀번호를 입력하세요" 경고 메세지가 노출된다', () => {
  cy.findByText('가입').click();

  cy.findByText('비밀번호를 입력하세요').should('exist');
});

it('성공적으로 회원 가입이 완료되었을 경우 "가입 성공!"문구가 노출되며 로그인 페이지로 이동한다', () => {
  // 회원 삭제 불가한 상황
  // -> 회원 데이터가 계속 쌓이고, E2E 테스트에서도 중복되지 않는 계정 정보를 업데이트 할 필요가 있다
  // -> 이슈 해결을 위해 등록 API를 스터빙 하여 테스트 진행

  // stubbing: 특정 네트워크 요청에 대해 미리 정해진 응답을 반환하는 것
  // intercept API는 요청과 응답에 대한 호출도 기록 -> stubbing과 spying을 모두 실행할 수 있음
  cy.intercept('POST', 'http://localhost:3000/users', { statusCode: 200 }); // intercept 라는 함수를 사용해서 인터셉트 한다

  // 이름, 이메일, 비밀번호 필드 입력
  // 가입 버튼 클릭
  // 가입 성공 문구가 노출되는지 단언
  // 로그인 페이지로 이동하는지 단언
  cy.findByLabelText('이름').type('hanjung');
  cy.findByLabelText('이메일').type('han@email.com');
  cy.findByLabelText('비밀번호').type('password123');

  cy.findByText('가입').click();

  cy.findByText('가입 성공!').should('exist');
  cy.assertUrl('/login');
});

it('회원 가입이 실패했을 경우 "잠시 문제가 발생했습니다! 다시 시도해 주세요." 문구가 노출된다', () => {
  cy.intercept('POST', 'http://localhost:3000/users', { statusCode: 401 });

  // 이름, 이메일, 비밀번호 필드 입력
  // 가입 버튼 클릭
  // 잠시 문제가 발생했습니다! 다시 시도해주세요. 란 문구가 노출되는 것을 단언
  cy.findByLabelText('이름').type('hanjung');
  cy.findByLabelText('이메일').type('han@email.com');
  cy.findByLabelText('비밀번호').type('password123');

  cy.findByText('가입').click();

  cy.findByText('잠시 문제가 발생했습니다! 다시 시도해 주세요.').should(
    'exist',
  );
});

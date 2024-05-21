import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', () => {
  const username = 'maria@mail.com';
  const password = '12345';

  // 아래 코드가 추가되었다
  // 사이프레스는 여러 테스트에서 공유할 수 있는 쿠키, 로컬스토리지, 세션스토리지에 있는
  // 정보들을 캐싱하고 복원하기 위해 cy.session이라는 API를 제공한다
  // 쿠키, local storage, session storage에 있는 정보들을 캐싱

  // cy.session api 호출할 때
  // 첫번째는 인자로 세션을 캐싱하고 보관하는데 사용할 고유의 id를 지정
  // 두번째는 id에 해당하는 세션이 없거나 더 이상 유효하지 않을 때 호출될 콜백 함수를 설정한다

  // 콜백함수 실행전 -> 모든 도메인의 쿠키, 로컬 스토리지, 세션스토리지 초기화
  // 초기화 진행 후 로그인 완료 -> 세션 정보 설정
  // 메인 홈페이지로 이동
  cy.session(username, () => {
    cy.visit('/login');

    cy.findByLabelText('이메일').type(username);
    cy.findByLabelText('비밀번호').type(password);
    cy.findByLabelText('로그인').click();

    // 캐싱하기 전에 로그인 프로세스가 완료되도록 보장하기 위해 추가
    cy.location('pathname').should('eq', '/');
  });

  // 로그인 이후 메인 홈페이지로 이동
  cy.visit('/');

  // 이런 session api가 없으면 사이프레스 실행할 때 마다 로그인을 각각 진행하고 이후 테스트를 진행한다
  // 하지만 session api 사용하면 반복적인 로그인 과정이 더 이상 진행하지 않는다
});

Cypress.Commands.add('logout', () => {
  cy.findByRole('button', { name: 'Maria' }).click();
  cy.findByRole('button', { name: '확인' }).click();
});

Cypress.Commands.add('assertUrl', url => {
  cy.url().should('eq', `${Cypress.env('baseUrl')}${url}`);
});

// 특정 인덱스의 상품 카드를 조회하는 커맨드
Cypress.Commands.add('getProductCardByIndex', index => {
  return cy.findAllByTestId('product-card').eq(index);
});

Cypress.Commands.addQuery('getCartButton', () => {
  const getFn = cy.now('get', `[data-testid="cart-button"]`);

  return subject => {
    const btn = getFn(subject);

    return btn;
  };
});

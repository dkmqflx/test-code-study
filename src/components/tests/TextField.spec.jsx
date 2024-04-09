import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

it('className prop으로 설정한 css class가 적용된다.', async () => {
  /**
   * 모든 테스트 코드는 디스크립션을 작성해야 한다
   * 테스트의 가독성도 굉장히 중요하기 때문에 디스크립션을 명확하게 적어야 한다
   *
   * Arrange - 테스트를 위한 환경 만들기
   * -> className을 지닌 컴포넌트 렌더링
   *
   * Act - 테스트할 동작 발생
   * -> 렌더링에 대한 검증이기 때문에 현재 이 단계는 생략
   * -> 클릭이나 메서드 호출, prop 변경 등등에 대한 작업이 여기에 해당
   *
   * Assert - 올바른 동작이 실행되었는지 검증
   * -> 렌더링 후 DOM에 해당 class가 존재하는지 검증
   */

  // render API 호출 -> 테스트 환경의 jsDOM에 리액트 컴포넌트가 렌더링된 DOM 구조가 반영
  // jsDOM: Node.js에서 사용하기 위한 많은 웹 표준을 순수 자바스크립트로 구현
  await render(<TextField className="my-class" />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  // vitest의 expect 함수를 사용하여 기대 결과를 검증
  // className이란 내부 prop이나 state 값을 검증 (X)
  // 렌더링되는 DOM 구조가 올바르게 변경되었는지 확인 (O) -> 최종적으로 사용자가 보는 결과는 DOM
  expect(textInput).toHaveClass('my-class');
  // 단언(assertion) -> 테스트가 통과하기 위한 조건 -> 검증실행
});

// describe 함수는 테스트를 그룹화해서 독립된 컨텍스트를 만드는 역할
// 아래는 placeholder 단위로 그룹을 묶은 것
describe('placeholder', () => {
  // it 함수내에서는 내가 원하는 기대결과를 정의한다
  // 기대결과 === 실제결과 -> 성공
  // it 함수는 test 함수의 alias
  // it을 사용하면 it('should~~~') 처럼 should로 시작해서 작성 경우가 많고
  // test를 사용하면 test('if~~~~')처러 if로 시작해서 작성하는 경우가 많다
  it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다.', async () => {
    await render(<TextField />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    expect(textInput).toBeInTheDocument();
    // 이러한 기대결과를 검증하기 위한 api를 matcher라고 한다
  });

  it('placeholder prop에 따라 placeholder가 변경된다.', async () => {
    await render(<TextField placeholder="상품명을 입력해 주세요." />);

    const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

    expect(textInput).toBeInTheDocument();
  });
});

it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn();

  const { user } = await render(<TextField onChange={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.type(textInput, 'test');

  expect(spy).toHaveBeenCalledWith('test');
});

it('엔터키를 입력하면 onEnter prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn();

  const { user } = await render(<TextField onEnter={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.type(textInput, 'test{Enter}');

  expect(spy).toHaveBeenCalledWith('test');
});

it('포커스가 활성화되면 onFocus prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn();
  const { user } = await render(<TextField onFocus={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.click(textInput);

  expect(spy).toHaveBeenCalled();
});

it('포커스가 활성화되면 border 스타일이 추가된다.', async () => {
  const { user } = await render(<TextField />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.click(textInput);

  expect(textInput).toHaveStyle({
    borderWidth: '2px',
    borderColor: 'rgb(25, 118, 210)',
  });
});

import { screen } from '@testing-library/react';
import React from 'react';

import EmptyNotice from '@/pages/cart/components/EmptyNotice';
import render from '@/utils/test/render';

const navigateFn = vi.fn();

// 특정 모듈을 원하는 형태로 모킹 가능하다.
// 실제 모듈을 모킹한 모듈로 대체하여 테스트를 실행할 수 있다.
// useNavigate 훅으로 반환받은 navigate 함수가 올바르게 호출되었는가 -> 스파이 함수
vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');

  // useNavigate에 대해서만 모킹한다.
  return {
    ...original,
    useNavigate: () => navigateFn, // spy 함수로 모킹한다
  };
});

it('"홈으로 가기" 링크를 클릭할경우 "/"경로로 navigate함수가 호출된다', async () => {
  const { user } = await render(<EmptyNotice />);

  await user.click(screen.getByText('홈으로 가기'));

  expect(navigateFn).toHaveBeenNthCalledWith(1, '/');
  // 우리가 원하는 인자와 함께 호출되었는지 확인한다.
});

// react-router-dom으 의//존성을 갖고 있다.

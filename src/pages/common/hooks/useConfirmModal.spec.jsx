import { renderHook, act } from '@testing-library/react';

// 리액트 훅은 반드시 리액트 컴포넌트 내에서만 호출되어야 정상적으로 실행된다
// 하지만 RenderHook이란 API를 통해서 Hook의 기분 기능을 쉽게 검증할 수 있다.
import useConfirmModal from './useConfirmModal';

it('호출 시 initialValue 인자를 지정하지 않는 경우 isModalOpened 상태가 false로 설정된다.', () => {
  // result: 훅을 호출하여 얻은 결과 값을 반환 -> result.current 값의 참조를 통해 최신 상태를 추적할 수 있다.
  // rerender: 훅을 원하는 인자와 함께 새로 호출하여 상태를 갱신한다.
  const { result } = renderHook(useConfirmModal);

  expect(result.current.isModalOpened).toBe(false);
});

it('호출 시 initialValue 인자를 boolean 값으로 지정하는 경우 해당 값으로 isModalOpened 상태가 설정된다.', () => {
  const { result } = renderHook(() => useConfirmModal(true));

  expect(result.current.isModalOpened).toBe(true);
});

it('훅의 toggleIsModalOpened()를 호출하면 isModalOpened 상태가 toggle된다.', () => {
  const { result } = renderHook(useConfirmModal);

  // act 함수를 사용해야 테스트 환경의 js dom의 컴포넌트 렌더링 결과와
  // 상태변경에 따른 컴포넌트 변경이 제대로 반영되어 테스트를 진행할 수 있다.
  // 공식문서에서도 컴포넌트를 렌더링하고 업데이트하는 코드의 결과를 검증하고 싶을 때 act 함수를 사용하라고 가이드하고 있다

  // 즉, @testing-library/react의 render 함수나 useEvent 없는 경우에는 act 함수로 감싸서 호출해주어야 한다.
  act(() => {
    result.current.toggleIsModalOpened();
  });

  expect(result.current.isModalOpened).toBe(true);
});

import { within, userEvent } from '@storybook/testing-library';

import PriceRange from '@/pages/home/components/PriceRange';

export default {
  title: '홈/상품 필터/가격 검색',
  component: PriceRange,
};

export const Default = { name: '기본' };

// 가격 필드 입력을 시뮬레이션하기 위해 play 함수를 사용하고 있다.
// play 함수를 사용하면 원하는 값이 입력되는 과정을 시뮬레이션 하며 스토리를 확인할 수 있다.
export const WithValue = {
  name: '가격이 입력된 상태',
  play: async ({ canvasElement }) => {
    // canvasEleement: 스토리가 렌더링되는 루트 요소
    const canvas = within(canvasElement);

    const [min, max] = canvas.getAllByRole('textbox');
    await userEvent.type(min, '300');
    await userEvent.type(max, '40000');
  },
};

/**
 * 스토리 작성대상
 *
 * 예를들어 말줄임이나 필드에 값이 입력된 상태  또는 다국어가 변경된 상태 반응형 레이아웃에
 * 따른 UI 변경을 별도 설정 없이 스토리에서 모두 확인할 수 있다
 */

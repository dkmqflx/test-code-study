import product from '@/__mocks__/response/product.json';
import ProductCard from '@/pages/home/components/ProductCard';

// 메타데이터를 export default로 작성했다면
// 아래의 각각의 스토리는 named export로 작성한다
export default {
  title: '홈/상품 카드',
  // title은 스토리 이름이 아닌 스토리북 네비게이션 UI에 어떻게 노출될지 계층을 나타낸다. 값이 필수는 아니지만 고유해야한다
  component: ProductCard,
  argTypes: {
    product: {
      control: 'object',
      description: '상품의 정보',
    },
  },
};

export const Default = {
  name: '기본',
  args: {
    product,
  }, // 스토리의 값을 동적으로 변경하고 싶을 때 사용한다
};

export const LongTitle = {
  args: {
    product: {
      ...product,
      title:
        'Long title Example Long title Example Long title Example Long title Example Long title Example Long title Example Long title Example Long title Example Long title Example Long title Example',
    },
  },
  name: '타이틀이 긴 경우',
};

export const LongCategoryName = {
  args: {
    product: {
      ...product,
      category: {
        name: 'Long Category Long Category Long Category Long Category',
      },
    },
  },
  name: '카테고리가 긴 경우',
};

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions', // play 함수 기능을 사용하려면 해당 라이브러리를 설치 후 추가해주어야 한다
    // Form 요소에 값 입력 시뮬레이션
    // 버튼을 클릭 -> 대화 샂아를 열거나 닫음
    // 목록 항목을 드래그하여 순서를 바꾸는 동작을 자동화하여 만들어둘 수 있다
    'storybook-addon-react-router-v6',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;

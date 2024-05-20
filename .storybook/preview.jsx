/** @type { import('@storybook/react').Preview } */
import { withRouter } from 'storybook-addon-react-router-v6';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initialize, mswDecorator } from 'msw-storybook-addon';

import { handlers } from '../src/__mocks__/handlers';
import withRHF from './withRHF';

import 'swiper/css';
import 'swiper/css/navigation';

// 전역으로 적용되는 설정을 정의한다

const queryClient = new QueryClient();
initialize({
  onUnhandledRequest: 'bypass',
});

const preview = {
  // parameter 필드는 메타 데이터를 정의해서 스토리에 다양한 기능을 추가할 때 사용한다
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' }, // 이벤트 핸들러 실행시 받은 데이터를 스토리에 표시하는 역할
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    }, // 개발자가 코드를 따로 변경하지 않고도 스토리북의 인자를 동적으로 바꿔가면 인터랙션할 수 있도록 도와주는 기능
    msw: {
      handlers,
    },
  },

  // 데코레이터는 주로 스토리를 렌더링할 때 특정 컴포넌트로 감싸거나 sibling 컴포넌트를 추가할 때 사용한다
  // 특정 리액트 컨텍스트나 루트 컴포넌트로 항상 감싸서 스토리를 렌더링할 때 유용하다
  decorators: [
    withRouter,
    mswDecorator, // 각 컴포넌트 스토리에서 네트워크 요청을 보낼 때 MSW가 API를 가로채 작성한 응답을 기반으로 렌더링한다
    withRHF(false),
    Story => (
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default preview;

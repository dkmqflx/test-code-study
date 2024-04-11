import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

import { handlers } from '@/__mocks__/handlers';

/* msw */
export const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();

  // 각 테스트가 끝날 때 호출하는 함수
  // 모킹된 모의 객체 호출에 대한 히스토리를 초기화 한다.
  // 이 때 clearAllMocks 함수를 호출해도 모킹된 모듈의 구현을 초기화하지는 않는다
  // -> 즉, 기존 모듈이 모킹된 상태로 유지됨
  // -> 이렇게 테스트를 위해 사전에 작성한 모킹 구현이 유지되어야 모킹 모듈 기반으로 작성한 테스트가 올바르게 실행
  // 반면, 모킹 히스토리가 계속 쌓이면(호출 횟수나 인자가 계속 변경) -> 다른 테스트에 영향을 줄 수 있음.
  // 그렇기 때문에 테스트 실행이 끝날 때 마다 clearAllMocks 함수를 호출하여 히스토리를 초기화하고 있다
  vi.clearAllMocks();
});

afterAll(() => {
  // 모든 테스트가 종료된 후 모킹 모듈에 대한 모든 구현을 초기화
  vi.resetAllMocks();

  server.close();
});

vi.mock('zustand');

// https://github.com/vitest-dev/vitest/issues/821
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

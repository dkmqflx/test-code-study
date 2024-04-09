import '@testing-library/jest-dom';
// import 한 이유는 vitest에는 돔에 관련된 검증을 할 수 있는 api가 없다
// https://vitest.dev/api/

// toBeInTheDocument과 같은 매처를 찾아볼 수 없는데
// 그래서 돔에 관련된 단언을 편하게 실행할 수 있도록 '@testing-library/jest-dom'을 추가하여 매처를 확장한 것

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.resetAllMocks();
});

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

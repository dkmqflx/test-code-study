import path from 'path';

import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint({ exclude: ['/virtual:/**', 'node_modules/**'] })],
  test: {
    globals: true, // vitest에서 제공하는 함수들을 별도의 import 없이 사용할 수. 있다.
    environment: 'jsdom',
    setupFiles: './src/utils/test/setupTests.js',
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});

/**
 * 브라우저와 다르게 Node.js 환경은 DOM이 존재하지 않는다
 * 그렇기 때문에 노드에서도 프론트엔드 컴포넌트의 결과물인 DOM이 제대로
 * 렌더링 되는지 확인하기 위한 환경이 필요한데 이게 바로 jsdom
 * https://github.com/jsdom/jsdom
 *
 * 다만 jsdom은 표준 스펙을 준수하여 구현했지만 브라우저 구현과는 분명이 다른점이 있으며
 * 실제 UI를 렌더링하여 눈으로 볼 수 있는 것이 아니다
 *
 * 테스트 코드 중간중간 필요한 곳에 screen.debug() 함수를 호출하면 js dom에 어떤식으로 렌더링 되는지 확인할 수 있다
 */

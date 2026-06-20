import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// baseUrl:"src" 베어 임포트(routes, middlewares, config…)를 tsconfig 기준으로 해석.
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts', 'src/**/*.test.ts'],
    // 통합 테스트의 첫 /api 요청은 firebase-admin Firestore 콜드스타트(rateLimit)를 부담 → 기본 5s는 병렬 부하에서 빠듯.
    testTimeout: 15000,
    // app/config 로드 시 config/env Zod 검증이 돌므로 emulator용 로컬값 주입(.env.development와 동일, 비밀 아님).
    env: {
      NODE_ENV: 'test',
      FIREBASE_PROJECT_ID: 'jae0-blog-v2',
      FIREBASE_SERVICE_ACCOUNT_JSON: '{}',
      ALLOWED_ORIGINS: 'http://localhost:3000',
      FIRESTORE_EMULATOR_HOST: 'localhost:8080',
      FIREBASE_AUTH_EMULATOR_HOST: 'localhost:9099',
      FIREBASE_STORAGE_EMULATOR_HOST: 'localhost:9199',
    },
  },
});

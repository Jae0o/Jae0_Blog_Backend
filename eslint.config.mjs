import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // 무시 경로
  { ignores: ['dist', 'node_modules', 'coverage', '.claude', 'api/_bundle.cjs', 'public'] },

  // 베이스
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 프로젝트 공통
  {
    languageOptions: {
      globals: { ...globals.node },
      parserOptions: { sourceType: 'module' },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // Express 타입 증강(declare global { namespace Express })을 허용 — ambient namespace.
      '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
    },
  },

  // 테스트 파일은 규칙 완화
  {
    files: ['tests/**/*.ts', '**/*.test.ts'],
    rules: { '@typescript-eslint/no-explicit-any': 'off' },
  },

  // prettier 와 충돌하는 포맷 규칙 비활성 (반드시 마지막)
  eslintConfigPrettier,
);

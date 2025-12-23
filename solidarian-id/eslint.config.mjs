import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginCypress from 'eslint-plugin-cypress/flat';
import eslintPluginJest from 'eslint-plugin-jest';
import eslintPluginJestDom from 'eslint-plugin-jest-dom';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  { ignores: ['eslint.config.mjs', 'node_modules/**', 'dist/**'] },

  eslint.configs.recommended,
  eslintPluginPrettierRecommended,
  eslintPluginCypress.configs.recommended,

  {
    languageOptions: {
      globals: { ...globals.node, ...globals.jest, ...globals.browser },
      sourceType: 'module',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },

  {
    files: ['**/*.spec.ts', '**/*.test.ts', '**/test/**/*.ts'],
    plugins: { jest: eslintPluginJest, 'jest-dom': eslintPluginJestDom },
    languageOptions: { globals: { ...globals.jest } },
    rules: {
      ...eslintPluginJest.configs['flat/recommended'].rules,
      ...eslintPluginJestDom.configs['flat/recommended'].rules,
      'jest/expect-expect': 'warn',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/valid-expect': 'error',
      'jest/no-conditional-expect': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
  {
    files: ['**/*e2e-spec.ts', '**/*.e2e-spec.ts'],
    rules: {
      'jest/expect-expect': 'off',
    },
  },
]);

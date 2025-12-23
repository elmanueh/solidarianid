// @ts-check
import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * https://typescript-eslint.io/packages/typescript-eslint/#migrating-to-defineconfig migrating to defineConfig
 * Migrating to defineConfig instead of config(...) because it is deprecated.
 */
export default defineConfig([
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
eslintPluginPrettierRecommended,
{
  files: ['**/*.js', '**/*.ts'],
  extends: [
    'plugin:cypress/recommended',
    'plugin:jest/recommended',
    'plugin:jest-dom/recommended',
  ],
},
{
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.browser,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['apps/admin/public/js/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      // These files are plain browser scripts
      sourceType: 'script',
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
]);

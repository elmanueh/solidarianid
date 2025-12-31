/** @jest-config-loader ts-node */
import baseJestConfig from '../../jest.config';
import type { Config } from 'jest';

const config: Config = {
  ...baseJestConfig,

  testPathIgnorePatterns: baseJestConfig.testPathIgnorePatterns?.filter(
    (pattern) => !pattern.includes('e2e-spec'),
  ),

  rootDir: '../../',

  testMatch: ['<rootDir>/apps/users/test/**/*.e2e-spec.ts'],

  maxWorkers: 1,

  globalSetup: '<rootDir>/libs/test/src/jest.global-setup.ts',
  globalTeardown: '<rootDir>/libs/test/src/jest.global-teardown.ts',
};

export default config;

/** @jest-config-loader ts-node */
import baseJestConfig from '../../jest.config';
import type { Config } from 'jest';

const config: Config = {
  ...baseJestConfig,

  testPathIgnorePatterns: baseJestConfig.testPathIgnorePatterns?.filter(pattern => !pattern.includes('e2e-spec')),

  rootDir: '../../',

  testMatch: [
    '<rootDir>/apps/admin/test/**/*.e2e-spec.ts',
    '<rootDir>/apps/users/test/**/*.e2e-spec.ts',
    '<rootDir>/apps/communities/test/**/*.e2e-spec.ts',
    '<rootDir>/test/integration/**/*.e2e-spec.ts',
  ],

  globalSetup: '<rootDir>/test/e2e/global-setup.ts',
  globalTeardown: '<rootDir>/test/e2e/global-teardown.ts',

  coverageDirectory: './coverage-e2e/all',

  reporters: ['default'],

  maxWorkers: 1,

  testTimeout: 60000,
};

export default config;

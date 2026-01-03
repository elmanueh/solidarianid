/** @jest-config-loader ts-node */
import baseJestConfig from '../../jest.config';
import type { Config } from 'jest';

const config: Config = {
  ...baseJestConfig,

  testPathIgnorePatterns: baseJestConfig.testPathIgnorePatterns?.filter(pattern => !pattern.includes('e2e-spec')),

  rootDir: '../../',

  testMatch: ['<rootDir>/test/integration/**/*.e2e-spec.ts'],

  coverageDirectory: './coverage-e2e/integration',

  reporters: ['default'],

  maxWorkers: 1,
};

export default config;

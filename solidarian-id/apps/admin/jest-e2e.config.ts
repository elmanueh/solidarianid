/** @jest-config-loader ts-node */
import baseJestConfig from '../../jest.config';
import type { Config } from 'jest';

const config: Config = {
  ...baseJestConfig,

  testPathIgnorePatterns: baseJestConfig.testPathIgnorePatterns?.filter(pattern => !pattern.includes('e2e-spec')),

  rootDir: '../../',

  testMatch: ['<rootDir>/apps/admin/test/**/*.e2e-spec.ts'],

  reporters: ['default'],

  maxWorkers: 1,
};

export default config;

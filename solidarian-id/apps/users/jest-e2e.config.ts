/** @jest-config-loader ts-node */
import baseJestConfig from '../../jest.config';
import type { Config } from 'jest';

const config: Config = {
  ...baseJestConfig,

  testPathIgnorePatterns: baseJestConfig.testPathIgnorePatterns?.filter(pattern => !pattern.includes('e2e-spec')),

  rootDir: '../../',

  testMatch: ['<rootDir>/apps/users/test/**/*.e2e-spec.ts'],

  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './test-results/e2e',
        outputName: 'junit-users.xml',
        suiteName: 'Users E2E Tests',
      },
    ],
  ],

  maxWorkers: 1,
};

export default config;

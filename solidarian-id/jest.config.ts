import type { Config } from 'jest';

const baseJestConfig: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  roots: ['<rootDir>/apps', '<rootDir>/libs'],

  testPathIgnorePatterns: ['/node_modules/', '/dist/', String.raw`\.e2e-spec\.ts$`, String.raw`\.cy\.ts$`],

  moduleNameMapper: {
    '^@solidarianid/testing(.*)$': '<rootDir>/libs/test/src$1',
    '^@solidarianid/kafka(.*)$': '<rootDir>/libs/kafka/src/$1',
    '^@app/admin/(.*)$': '<rootDir>/apps/admin/src/$1',
    '^@app/users/(.*)$': '<rootDir>/apps/users/src/$1',
    '^@app/communities/(.*)$': '<rootDir>/apps/communities/src/$1',
    '^@app/ddd/(.*)$': '<rootDir>/libs/ddd/src/$1',
    '^@app/value-objects/(.*)$': '<rootDir>/libs/value-objects/src/$1',
    '^@app/utils/(.*)$': '<rootDir>/libs/utils/src/$1',
    '^@charts/(.*)$': '<rootDir>/libs/charts/src/$1',
    '^@charts$': '<rootDir>/libs/charts/src',
  },

  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },

  transformIgnorePatterns: ['node_modules/(?!(uuid)/)'],

  collectCoverageFrom: [
    'apps/**/*.ts',
    '!**/*.spec.ts',
    '!**/*.test.ts',
    '!**/*.e2e-spec.ts',
    '!**/*.module.ts',
    '!**/main.ts',
  ],

  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageReporters: ['text', 'lcov', 'json'],

  testTimeout: 60000,
};

export default baseJestConfig;

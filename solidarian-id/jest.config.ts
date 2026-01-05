import type { Config } from 'jest';

const baseJestConfig: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  roots: ['<rootDir>/apps', '<rootDir>/libs', '<rootDir>/test'],

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
    '^@frontend/design-tokens/(.*)$': '<rootDir>/libs/design-tokens/src/$1',
  },

  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },

  transformIgnorePatterns: ['node_modules/(?!uuid)'],

  collectCoverageFrom: [
    'apps/**/*.ts',
    '!libs/**',
    '!**/*.spec.ts',
    '!**/*.test.ts',
    '!**/*.e2e-spec.ts',
    '!**/*.module.ts',
    '!**/main.ts',
    '!**/*.entity.ts',
    '!**/*.dto.ts',
    '!**/*.d.ts',
    '!**/jest*.config.ts',
    '!**/*.config.ts',
    '!**/index.ts',
    '!**/*.filter.ts',
    '!**/*.guard.ts',
    '!**/*.mapper.ts',
    '!**/*.port.ts',
    '!**/fake*.ts',
    '!**/enums/**',
    '!**/model/**',
    '!**/models/**',
  ],

  reporters: ['default'],
  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageReporters: ['lcov', 'text', 'json'],

  testTimeout: 60000,
};

export default baseJestConfig;

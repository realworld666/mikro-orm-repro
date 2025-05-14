/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    // <--- this one
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@/(.*)\\.js$': '<rootDir>/src/$1',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.(t|j)s$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: false,
            decorators: true,
          },
          target: 'es2022',
        },
        module: {
          type: 'es6',
          noInterop: false,
        },
      },
    ],
  },
  moduleDirectories: ['node_modules', 'src'],
  transformIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'reports',
        outputName: 'jest-junit.xml',
        uniqueOutputName: 'false',
        suiteNameTemplate: '{filepath}',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
      },
    ],
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
  silent: process.env.CI === 'true',
};

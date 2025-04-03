module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)'
    ],
    moduleNameMapper: {
      '\\.(css|less|scss)$': 'identity-obj-proxy',
      'next/image': '<rootDir>/__mocks__/next/image.js'
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
  };
module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.js',
    'app.js',
    '!src/__tests__/**',
    '!**/node_modules/**',
    '!**/dist/**'
  ],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  testMatch: [
    '**/src/__tests__/**/*.test.js'
  ],
  setupFilesAfterEnv: [],
  testTimeout: 10000,
  verbose: true
};

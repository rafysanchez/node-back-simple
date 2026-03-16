const commonGlobals = {
  console: 'readonly',
  process: 'readonly',
  module: 'readonly',
  require: 'readonly',
  exports: 'readonly',
  __dirname: 'readonly',
  __filename: 'readonly',
  Buffer: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  setInterval: 'readonly',
  clearInterval: 'readonly'
};

const jestGlobals = {
  describe: 'readonly',
  test: 'readonly',
  expect: 'readonly',
  beforeAll: 'readonly',
  afterAll: 'readonly',
  beforeEach: 'readonly',
  afterEach: 'readonly',
  jest: 'readonly'
};

module.exports = [
  {
    ignores: ['node_modules/**', 'coverage/**']
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: commonGlobals
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'comma-dangle': ['error', 'never'],
      'no-trailing-spaces': 'error',
      indent: ['error', 2],
      'space-before-function-paren': ['error', { anonymous: 'always', named: 'never' }]
    }
  },
  {
    files: ['src/__tests__/**/*.js', '**/*.test.js', 'jest.config.js'],
    languageOptions: {
      globals: jestGlobals
    }
  }
];

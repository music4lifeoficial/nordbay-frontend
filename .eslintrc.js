module.exports = {
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'out/',
    '.next/',
    'build/',
    'coverage/'
  ],
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:prettier/recommended'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'prettier/prettier': 'error'
  }
};

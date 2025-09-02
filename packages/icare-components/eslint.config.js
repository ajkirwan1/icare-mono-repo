// eslint.config.js
const tsParser = require('@typescript-eslint/parser');
const typescript = require('@typescript-eslint/eslint-plugin');
const jsxA11y = require('eslint-plugin-jsx-a11y');

module.exports = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      'jsx-a11y': jsxA11y
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',

      // Accessibility rules
      'jsx-a11y/no-autofocus': 'off',
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/label-has-associated-control': 'warn',
      'jsx-a11y/no-noninteractive-element-interactions': 'warn',

      // General JS/TS style
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'curly': 'error'
    }
  }
];

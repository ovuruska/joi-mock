module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:sonarjs/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import', 'sonarjs', 'folders'],
  root: true,
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'always'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always-and-inside-groups',
      },
    ],
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-else-return': 'error',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'ForOfStatement',
        message:
          'for..of loops iterate over the values of an iterable, which is often what you want. If you only need the keys, consider using Object.{keys,values,entries}, or use destructuring `[key, value]` pairs as parameters.',
      },
    ],
    'no-return-await': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],
    'no-useless-constructor': 'error',
    'no-var': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': 'error',
    'prefer-template': 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'sonarjs/cognitive-complexity': ['error', 20],
    'sonarjs/no-duplicate-string': 'error',
    'sonarjs/no-small-switch': 'error',
    'sonarjs/no-useless-catch': 'error',
    'sonarjs/prefer-immediate-return': 'error',
    'sonarjs/prefer-object-literal': 'error',
    'sonarjs/prefer-single-boolean-return': 'error',
    'sonarjs/prefer-while': 'error',
    'template-curly-spacing': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};

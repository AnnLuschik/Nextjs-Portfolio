module.exports = {
  env: {
    browser: true,
    es2021: true,
    amd: true,
    node: true,
    'jest/globals': true
  },
  parserOptions: {
    ecmaVersion: 2020
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:testing-library/react',
    'plugin:jest/all'
  ],
  settings: {
    'import/extensions': ['.js', '.jsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx']
      }
    }
  },
  plugins: ['react', 'prettier', 'testing-library', 'jest'],
  rules: {
    // common
    quotes: [2, 'single'],
    'no-console': 'warn',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-underscore-dangle': 'off',
    'no-debugger': 'off',
    'no-useless-escape': 'off',
    'func-names': 'off',
    'consistent-return': 'off',
    'class-methods-use-this': 'off',
    'comma-dangle': 'off',
    'dot-notation': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',

    // jsx-a11y
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id']
        }
      }
    ],
    'jsx-a11y/anchor-is-valid': 'off',

    // react
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',

    // import
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        mjs: 'never'
      }
    ],

    // jest
    'jest/no-hooks': 'off',
    'jest/prefer-expect-assertions': [
      'warn',
      { onlyFunctionsWithAsyncKeyword: true }
    ],

    // prettier
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: true,
        trailingComma: 'none'
      }
    ]
  }
};

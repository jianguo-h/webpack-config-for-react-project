module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    // 'prettier/react'
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019,
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    es6: true
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  plugins: [
    'react',
    // 'react-hooks'
  ],
  'rules': {
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/explicit-function-return-type': ['error', {
      allowExpressions: true
    }],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-inferrable-types': ['error', {
      ignoreParameters: true
    }]
  }
}
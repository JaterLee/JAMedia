module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],

      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': [1],
        'react-hooks/exhaustive-deps': [1],
        eqeqeq: [0],
        'react-native/no-inline-styles': [0],
      },
    },
  ],
  env: {
    node: true,
    browser: true,
    commonjs: true,
    // es6: true,
    es2020: true,
  },
};

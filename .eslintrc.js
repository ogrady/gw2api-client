module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    //'eslint:recommended',
    //'plugin:@typescript-eslint/eslint-recommended',
    //'plugin:@typescript-eslint/recommended',
    '@devoxa'
  ],
  rules: {
    semi: [2, 'never'],
    '@typescript-eslint/array-type': [2, 'generic'],
    '@typescript-eslint/no-require-imports': [2]
  }
};

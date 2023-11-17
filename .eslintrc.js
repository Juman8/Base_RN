module.exports = {
  root: true,
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // 'no-unused-vars': 1,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/no-empty-function': 1,
    '@typescript-eslint/no-non-null-assertion': 0,
  },
};

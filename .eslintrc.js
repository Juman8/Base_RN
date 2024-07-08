module.exports = {
  root: true,
  "plugins": ["complexity"],
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'no-nested-ternary': 1,
    'no-unused-vars': 1,
    'react/jsx-no-useless-fragment': ['error'],
    complexity: ['error', { max: 15 }],
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/no-empty-function': 1,
    '@typescript-eslint/no-non-null-assertion': 0,
  },
};

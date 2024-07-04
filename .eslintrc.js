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
    // 'no-unused-vars': 1,
    "complexity/complexity": ["error", { "max": 15 }],
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/no-empty-function': 1,
    '@typescript-eslint/no-non-null-assertion': 0,
  },
};
